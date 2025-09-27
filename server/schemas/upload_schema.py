from marshmallow import fields
from server.extensions import ma
from server.models.upload import Upload
# from server.schemas.allocation_schema import AllocationSchema
from server.schemas.user_schema import UserSchema


class UploadSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Upload
        load_instance = True

    id = ma.auto_field(dump_only=True)
    filename = ma.auto_field(required=True)
    size = ma.auto_field(required=True)
    timestamp = ma.auto_field(dump_only=True)
    user_id = ma.auto_field(required=True)

    user = fields.Nested(UserSchema, dump_only=True)
    allocations = fields.List(fields.Nested('AllocationSchema', exclude=('upload',)), dump_only=True)    
