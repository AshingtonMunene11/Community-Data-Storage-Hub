from marshmallow import fields, validate
from server.extensions import ma
from server.models.user import User


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field(dump_only=True)
    username = ma.auto_field(required=True)
    email = ma.auto_field(required=True)
    password = fields.Str(load_only=True, required=True, validate=validate.Length(min=6))
    role = ma.auto_field(dump_only=True)
    created_at = ma.auto_field(dump_only=True)
