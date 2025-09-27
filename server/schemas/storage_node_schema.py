from models.storage_node import StorageNode
from extensions import ma
from marshmallow import fields

class StorageNodeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = StorageNode
        load_instance = True

    id = ma.auto_field(dump_only=True)
    name = ma.auto_field(required=True)
    capacity = ma.auto_field(required=True)
    used = ma.auto_field()
    location = ma.auto_field()
    status = ma.auto_field()

    allocations = fields.List(fields.Nested('AllocationSchema', exclude=('storage_node',)), dump_only=True)

