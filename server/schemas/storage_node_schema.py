from server.models.storage_node import StorageNode
from server.extensions import ma

class StorageNodeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = StorageNode
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    capacity = ma.auto_field()
    location = ma.auto_field()
    status = ma.auto_field()
