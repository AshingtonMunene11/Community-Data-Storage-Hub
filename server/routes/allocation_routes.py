from flask import Blueprint, request, jsonify
from server.extensions import db
from server.models.allocation import Allocation
from marshmallow import ValidationError
from server.models.storage_node import StorageNode
from server.schemas.allocation_schema import AllocationSchema
#from server.models.schemas.allocation_schema import AllocationSchema

allocation_bp = Blueprint('allocation_bp', __name__)
allocation_schema = AllocationSchema()
allocations_schema = AllocationSchema(many=True)

@allocation_bp.route('/allocations', methods=['POST'])
def create_allocation():
    data = request.get_json()
    try:
        validated = allocation_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    node_id = validated.get('storage_node_id')
    size = validated.get('allocated_size')

    # Fetch node and check capacity
    node = StorageNode.query.get_or_404(node_id)
    used = sum(a.allocated_size for a in node.allocations)

    if used + size > node.capacity:
        return jsonify({"error": "Node capacity exceeded"}), 400

    # Proceed with allocation
    new_allocation = Allocation(**validated)
    db.session.add(new_allocation)
    db.session.commit()
    return allocation_schema.dump(new_allocation), 201


@allocation_bp.route('/allocations', methods=['GET'])
def get_allocations():
    allocations = Allocation.query.all()
    return allocations_schema.dump(allocations), 200

@allocation_bp.route('/allocations/<int:id>', methods=['DELETE'])
def delete_allocation(id):
    allocation = Allocation.query.get_or_404(id)
    db.session.delete(allocation)
    db.session.commit()
    return jsonify({"message": "Allocation deleted"}), 200

