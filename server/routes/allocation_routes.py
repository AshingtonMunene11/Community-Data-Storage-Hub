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

@allocation_bp.route('/', methods=['POST'])
def create_allocation():
    data = request.get_json()
    try:
        allocation = allocation_schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400

    node = StorageNode.query.get_or_404(allocation.storage_node_id)
    used = sum(a.allocated_size for a in node.allocations)

    if used + allocation.allocated_size > node.capacity:
        return jsonify({"error": "Node capacity exceeded"}), 400

    
    db.session.add(allocation)
    db.session.commit()
    return allocation_schema.dump(allocation), 201


@allocation_bp.route('/', methods=['GET'])
def get_allocations():
    allocations = Allocation.query.all()
    return allocations_schema.dump(allocations), 200

@allocation_bp.route('/<int:id>', methods=['GET'])
def get_allocation(id):
    allocation = Allocation.query.get_or_404(id)
    return allocation_schema.dump(allocation), 200

@allocation_bp.route('/<int:id>', methods=['PUT'])
def update_allocations(id):
    allocation = Allocation.query.get_or_404(id)
    data = request.get_json()

    try:
        updated_allocation = allocation_schema.load(data, instance=allocation, partial=True)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    # Checks if storage_node_id or allocated_size are being updated
    node_id = updated_allocation.storage_node_id
    size = updated_allocation.allocated_size

    node = StorageNode.query.get_or_404(node_id)
    used = sum(a.allocated_size for a in node.allocations if a.id != allocation.id)

    if used + size > node.capacity:
        return jsonify({"error": "Node capacity exceeded"}), 400

    db.session.commit()
    return allocation_schema.dump(updated_allocation), 200

@allocation_bp.route('/<int:id>', methods=['DELETE'])
def delete_allocation(id):
    allocation = Allocation.query.get_or_404(id)
    db.session.delete(allocation)
    db.session.commit()
    return jsonify({"message": "Allocation deleted"}), 200

