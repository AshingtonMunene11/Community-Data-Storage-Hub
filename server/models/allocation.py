from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from extensions import db

class Allocation(db.Model):
    __tablename__ = 'allocations'

    id = db.Column(db.Integer, primary_key=True)
    upload_id = db.Column(db.Integer, db.ForeignKey('uploads.id'), nullable=False)
    storage_node_id = db.Column(db.Integer, db.ForeignKey('storage_nodes.id'), nullable=False)
    allocated_size = db.Column(db.Float, nullable=False)


    """
    id = Column(Integer, primary_key=True)
    upload_id = Column(Integer, ForeignKey('uploads.id'), nullable=False)
    storage_node_id = Column(Integer, ForeignKey('storage_nodes.id'), nullable=False)
    allocated_space = Column(Float, nullable=False)  # Space in MB or GB

    storage_node = relationship('StorageNode', backref='allocations')
    """

    upload = db.relationship('Upload', backref='allocations')
    storage_node = db.relationship('StorageNode', backref='allocations')

