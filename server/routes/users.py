from flask import Blueprint, request, jsonify, current_app
from extensions import db
from models.user import User
from schemas.user_schema import UserSchema
import jwt
from datetime import datetime, timedelta


users_bp = Blueprint("users", __name__, url_prefix="/users")
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users))

@users_bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()

    # Validate required fields
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400

    # Check if email already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create new user
    new_user = User(
        username=data.get("username"),
        email=data.get("email"),
        role=data.get("role", "user")
    )
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify(user_schema.dump(new_user)), 201


@users_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.utcnow() + timedelta(hours=1)},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token, "username": user.username, "role": user.role})

