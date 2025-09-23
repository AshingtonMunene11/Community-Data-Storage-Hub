from marshmallow import Schema, fields
from server.schemas.upload_schema import UploadSchema
from server.schemas.storage_node_schema import StorageNodeSchema

class AllocationSchema(Schema):
    id = fields.Int(dump_only=True)
    upload_id = fields.Int(required=True)
    storage_node_id = fields.Int(required=True)
    allocated_size = fields.Float(required=True)

    upload = fields.Nested(UploadSchema, dump_only=True)
    storage_node = fields.Nested(StorageNodeSchema, dump_only=True)


"""
from marshmallow import Schema, fields
from server.models.schemas.user_schema import UserSchema 

class AllocationSchema(Schema):
    id = fields.Int(dump_only=True)
    upload_id = fields.Int(required=True)
    storage_node_id = fields.Int(required=True)
    allocated_space = fields.Float(required=True)

    
    upload = fields.Nested(UploadSchema, dump_only=True) # Optional: nested upload and node info
    """
   
