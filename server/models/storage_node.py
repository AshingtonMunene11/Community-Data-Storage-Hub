from server.extensions import db

class StorageNode(db.Model):
    __tablename__ = 'storage_nodes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Float, nullable=False)  # in GB
    location = db.Column(db.String(100))
    status = db.Column(db.String(50), default='active')  # active, offline, etc.

    def __repr__(self):
        return f"<StorageNode {self.name} ({self.capacity} GB)>"
