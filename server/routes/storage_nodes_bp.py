from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.storage_node import StorageNode
from ..schemas.storage_node_schema import StorageNodeSchema
from marshmallow import ValidationError

storage_nodes_bp = Blueprint("storage_nodes", __name__)
storage_node_schema = StorageNodeSchema()
storage_nodes_schema = StorageNodeSchema(many=True)

@storage_nodes_bp.route("/", methods=["GET"])
def get_storage_nodes():
    nodes = StorageNode.query.all()
    return jsonify(storage_nodes_schema.dump(nodes))

@storage_nodes_bp.route("/", methods=["POST"])
def create_storage_node():
    data = request.get_json()
    try:
        new_node = storage_node_schema.load(data)
        db.session.add(new_node)
        db.session.commit()
        return storage_node_schema.dump(new_node), 201
    except ValidationError as err:
        return jsonify(err.messages), 400
    except Exception as e:
        db.session.rollback()
        print("Error creating storage node:", e)
        return jsonify({"error": str(e)}), 500

@storage_nodes_bp.route("/<int:id>", methods=["GET"])
def get_storage_node(id):
    node = StorageNode.query.get(id)
    if not node:
        return jsonify({"error": "StorageNode not found"}), 404
    return storage_node_schema.dump(node), 200

@storage_nodes_bp.route("/<int:id>", methods=["PUT"])
def update_storage_node(id):
    node = StorageNode.query.get(id)
    data = request.get_json()
    
    try:
        updated_node = storage_node_schema.load(data, instance=node, partial=True)
        db.session.commit()
        return storage_node_schema.dump(updated_node)
    except ValidationError as err:
        return jsonify(err.messages), 400
    except Exception as e:
        db.session.rollback()
        print("Error updating storage node:", e)
        return jsonify({"error": str(e)}), 500


@storage_nodes_bp.route("/<int:id>", methods=["DELETE"])
def delete_storage_node(id):
    node = StorageNode.query.get_or_404(id)
    db.session.delete(node)
    db.session.commit()
    return jsonify({"message": f"Node {id} deleted"}), 200

@storage_nodes_bp.route("/summary", methods=["GET"])
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
