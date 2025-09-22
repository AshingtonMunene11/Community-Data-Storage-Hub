from marshmallow import Schema, fields
from server.models.schemas.user_schema import UserSchema 

class AllocationSchema(Schema):
    id = fields.Int(dump_only=True)
    upload_id = fields.Int(required=True)
    storage_node_id = fields.Int(required=True)
    allocated_space = fields.Float(required=True)

    
    upload = fields.Nested(UploadSchema, dump_only=True) # Optional: nested upload and node info
   
