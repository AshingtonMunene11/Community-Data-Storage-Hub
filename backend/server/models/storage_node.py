from server.extensions import db

class StorageNode(db.Model):
    _tablename_ = 'storage_nodes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=True)
    capacity = db.Column(db.Integer, nullable=False)
    used = db.Column(db.Integer, default=0)
    status = db.Column(db.String(50), default='active')

    def _repr_(self):
        return f"<StorageNode {self.name}>"