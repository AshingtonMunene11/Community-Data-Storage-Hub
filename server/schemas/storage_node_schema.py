from marshmallow import Schema, fields


class StorageNodeSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    capacity = fields.Int(required=True)
    used = fields.Int()

