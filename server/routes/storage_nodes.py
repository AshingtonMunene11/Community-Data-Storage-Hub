from flask import Blueprint, request, jsonify
from server.models.storage_node import StorageNode
from server.schemas.storage_node_schema import StorageNodeSchema
from server.extensions import db

storage_nodes_bp = Blueprint('storage_nodes_bp', __name__, url_prefix='/api/nodes')
node_schema = StorageNodeSchema()
nodes_schema = StorageNodeSchema(many=True)

# GET all nodes
@storage_nodes_bp.route('/', methods=['GET'])
def get_nodes():
    nodes = StorageNode.query.all()
    return jsonify(nodes_schema.dump(nodes)), 200

# POST create node
@storage_nodes_bp.route('/', methods=['POST'])
def create_node():
    data = request.get_json()
    new_node = node_schema.load(data)
    db.session.add(new_node)
    db.session.commit()
    return jsonify(node_schema.dump(new_node)), 201

# DELETE node by ID
@storage_nodes_bp.route('/<int:id>', methods=['DELETE'])
def delete_node(id):
    node = StorageNode.query.get_or_404(id)
    db.session.delete(node)
    db.session.commit()
    return jsonify({"message": f"Node {id} deleted"}), 200

# GET node summary dashboard
@storage_nodes_bp.route('/summary', methods=['GET'])
def node_summary():
    nodes = StorageNode.query.all()
    summary = []

    for node in nodes:
        used = sum(a.allocated_size for a in node.allocations)
        remaining = node.capacity - used
        summary.append({
            "id": node.id,
            "name": node.name,
            "location": node.location,
            "status": node.status,
            "capacity": node.capacity,
            "used": used,
            "remaining": remaining,
            "allocations": len(node.allocations)
        })

    return jsonify(summary), 200
