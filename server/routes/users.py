from flask import Blueprint, request, jsonify, current_app
from server.extensions import db
from server.models.user import User
from server.schemas.user_schema import UserSchema
import jwt
from datetime import datetime, timedelta


users_bp = Blueprint("users", __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# GET all users
@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users))

# Signup (Register a User)
@users_bp.route("", methods=["POST"])
def add_user():
    data = request.get_json()

    # Validate required fields
    if not data.get("email") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Username, email and password required"}), 400

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

    # Ensures PyJWT returns string instead of bytes
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return jsonify({
        "token": token, 
        "user": {
            "id": user.id,
            "username": user.username, 
            "email": user.email,
            "role": user.role
        }
    })


# GET: get a single user by ID
@users_bp.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user_schema.dump(user))


# PUT: update a user by ID
@users_bp.route("/<int:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    if data.get("username"):
        user.username = data["username"]
    if data.get("email"):
        # Checks if the new email already exists
        if User.query.filter(User.email == data["email"], User.id != user.id).first():
            return jsonify({"error": "Email already exists"}), 400
        user.email = data["email"]
    if data.get("role"):
        user.role = data["role"]
    if data.get("password"):
        user.set_password(data["password"])

    db.session.commit()
    return jsonify(user_schema.dump(user))


@users_bp.route("/<int:user_id>", methods=["PATCH"])
def patch_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json() or {}
    if "email" in data and data.get("email"):
        # Checks if the new email already exists
        if User.query.filter(User.email == data["email"], User.id != user.id).first():
            return jsonify({"error": "Email already exists"}), 400
        user.email = data["email"]
    if "username" in data and data.get("username"):
        user.username = data["username"]
    if "role" in data and data.get("role"):
        user.role = data["role"]
    if "password" in data and data.get("password"):
        user.set_password(data["password"]) 

    db.session.commit()
    return jsonify(user_schema.dump(user)), 200

# DELETE: delete a user by ID
@users_bp.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User {user.username} deleted successfully."})
