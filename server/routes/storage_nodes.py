from flask import Blueprint, request, jsonify
from extensions import db
from models.storage_node import StorageNode
from schemas.storage_node_schema import StorageNodeSchema

storage_nodes_bp = Blueprint("storage_nodes", __name__, url_prefix="/storage-nodes")
storage_node_schema = StorageNodeSchema()
storage_nodes_schema = StorageNodeSchema(many=True)

@storage_nodes_bp.route("", methods=["GET"])
def get_nodes():
    nodes = StorageNode.query.all()
    return jsonify(storage_nodes_schema.dump(nodes))

@storage_nodes_bp.route("", methods=["POST"])
def add_node():
    data = request.get_json()
    new_node = StorageNode(
        name=data["name"],
        capacity=data["capacity"],
        used=data.get("used", 0)
    )
    db.session.add(new_node)
    db.session.commit()
    return jsonify(storage_node_schema.dump(new_node)), 201