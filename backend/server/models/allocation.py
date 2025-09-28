from server.extensions import db

class Allocation(db.Model):
    __tablename__ = 'allocations'

    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('uploads.id'), nullable=False)
    storage_node_id = db.Column(db.Integer, db.ForeignKey('storage_nodes.id'), nullable=False)
    allocated_size = db.Column(db.Float, nullable=False)

    chunk_index = db.Column(db.Integer, nullable=True)

    upload = db.relationship('Upload', backref='allocations')
    storage_node = db.relationship('StorageNode', backref='allocations')
    
    def __repr__(self):
        return f"<Allocation upload_id={self.upload_id} node_id={self.storage_node_id}>"