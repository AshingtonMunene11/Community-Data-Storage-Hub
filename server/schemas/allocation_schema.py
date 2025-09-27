from server.models.allocation import Allocation
from server.extensions import ma
from marshmallow import fields
# from ..schemas.upload_schema import UploadSchema
# from ..schemas.storage_node_schema import StorageNodeSchema

class AllocationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Allocation
        load_instance = True

    id = ma.auto_field()
    upload_id = ma.auto_field()
    storage_node_id = ma.auto_field()
    allocated_size = ma.auto_field()

    upload = fields.Nested('UploadSchema', exclude=('allocations',), dump_only=True)
    storage_node = fields.Nested('StorageNodeSchema', dump_only=True)
