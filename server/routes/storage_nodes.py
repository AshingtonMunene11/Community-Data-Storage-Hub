from flask import Blueprint, request, jsonify
from extensions import db
from models.storage_node import StorageNode
from schemas.storage_node_schema import StorageNodeSchema
from utils.auth import token_required

storage_nodes_bp = Blueprint("storage_nodes", __name__, url_prefix="/storage-nodes")
storage_node_schema = StorageNodeSchema()
storage_nodes_schema = StorageNodeSchema(many=True)

@storage_nodes_bp.route("", methods=["GET"])
@token_required
def get_nodes(current_user):
    nodes = StorageNode.query.all()
    return jsonify(storage_nodes_schema.dump(nodes))

@storage_nodes_bp.route("", methods=["POST"])
@token_required
def add_node(current_user):
    # only admins can add storage nodes
    if current_user.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    new_node = StorageNode(
        name=data["name"],
        capacity=data["capacity"],
        used=data.get("used", 0)
    )
    db.session.add(new_node)
    db.session.commit()
    return jsonify(storage_node_schema.dump(new_node)), 201