from flask import Blueprint, request, jsonify
from extensions import db
from server.models.allocation import Allocation
from server.models.schemas.allocation_schema import AllocationSchema

allocation_bp = Blueprint('allocation_bp', __name__)
allocation_schema = AllocationSchema()
allocations_schema = AllocationSchema(many=True)

@allocation_bp.route('/allocations', methods=['POST'])
def create_allocation():
    data = request.get_json()
    validated = allocation_schema.load(data)
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
