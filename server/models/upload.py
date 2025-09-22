from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from server.extensions import db


class Upload(db.Model):
    __tablename__ = 'uploads'

    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    size = Column(Float, nullable=False)  # Size in MB or KB
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    
    user = relationship('User', backref='uploads')
    allocations = relationship('Allocation', backref='upload', cascade='all, delete-orphan')
