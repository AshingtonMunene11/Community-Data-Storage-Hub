from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User
from schemas.user_schema import UserSchema


users_bp = Blueprint("users", __name__, url_prefix="/users")
user_schema = UserSchema()
users_schema = UserSchema(many=True)

@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return users_schema.jsonify(users)

@users_bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()
    new_user = User(username=data["username"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user), 201




