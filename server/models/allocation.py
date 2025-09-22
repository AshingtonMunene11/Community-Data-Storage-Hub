from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from extensions import db

class Allocation(db.Model):
    __tablename__ = 'allocations'

    id = Column(Integer, primary_key=True)
    upload_id = Column(Integer, ForeignKey('uploads.id'), nullable=False)
    storage_node_id = Column(Integer, ForeignKey('storage_nodes.id'), nullable=False)
    allocated_space = Column(Float, nullable=False)  # Space in MB or GB

    storage_node = relationship('StorageNode', backref='allocations')
