from flask import jsonify
from server.extensions import db
from server.models.storage_node import StorageNode
from server.routes.storage_nodes_bp import storage_nodes_bp  # adjust if needed

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

