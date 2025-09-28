from datetime import datetime

from flask import Blueprint, request, jsonify, session, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

from server.extensions import db
from server.models import User

users_bp = Blueprint("users_bp", __name__)

# ----------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------
def _user_to_dict(u: User) -> dict:
    """Serialize a User object without exposing the password hash."""
    return {
        "id": u.id,
        "username": u.username,
        "email": u.email,
        "role": u.role,
        "created_at": u.created_at.isoformat() if u.created_at else None,
    }

# ----------------------------------------------------------------------
# Routes
# ----------------------------------------------------------------------

@users_bp.route("/", methods=["GET"])
def list_users():
    """Return all users (admin endpoints may restrict this in production)."""
    users = User.query.all()
    return jsonify([_user_to_dict(u) for u in users]), 200


@users_bp.route("/", methods=["POST"])
def create_user():
    """Register a new user and log them in."""
    data = request.get_json(silent=True) or {}

    username = data.get("username", "").strip()
    email    = data.get("email", "").strip()
    password = data.get("password")
    role     = data.get("role", "user")

    if not username or not email or not password:
        return jsonify({"error": "username, email and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    new_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        role=role,
        created_at=datetime.utcnow(),
    )
    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token
    token = jwt.encode(
        {"user_id": new_user.id, "username": new_user.username, "role": new_user.role},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    # store session info
    session.update({
        "user_id": new_user.id,
        "username": new_user.username,
        "role": new_user.role,
    })

    resp = make_response(
        jsonify({
            "message": "User created and logged in", 
            "token": token,
            "username": new_user.username,
            "role": new_user.role,
            "user": _user_to_dict(new_user)
        }),
        201,
    )
    resp.set_cookie("username", new_user.username, httponly=True, samesite="Lax")
    return resp


@users_bp.route("/login", methods=["POST"])
def login_user():
    """Authenticate an existing user."""
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Generate JWT token
    token = jwt.encode(
        {"user_id": user.id, "username": user.username, "role": user.role},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    session.update({
        "user_id": user.id,
        "username": user.username,
        "role": user.role,
    })

    resp = make_response(
        jsonify({
            "message": "Login successful", 
            "token": token,
            "username": user.username,
            "role": user.role,
            "user": _user_to_dict(user)
        }),
        200,
    )
    resp.set_cookie("username", user.username, httponly=True, samesite="Lax")
    return resp


@users_bp.route("/logout", methods=["POST"])
def logout_user():
    """Clear the current session."""
    session.clear()
    resp = make_response(jsonify({"message": "Logged out"}), 200)
    resp.delete_cookie("username")
    return resp


@users_bp.route("/me", methods=["GET"])
def get_current_user():
    """Return the currently logged-in user’s info."""
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Not logged in"}), 401

    user = User.query.get_or_404(user_id)
    return jsonify(_user_to_dict(user)), 200
