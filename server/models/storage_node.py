from extensions import db


class StorageNode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    used = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f"<StorageNode {self.name}>"












