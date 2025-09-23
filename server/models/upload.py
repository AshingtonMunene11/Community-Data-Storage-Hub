from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from server.extensions import db
from server.models.user import User



class Upload(db.Model):
    __tablename__ = 'uploads'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    size = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Foreign key from Mike`s User model`


    """
    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    size = Column(Float, nullable=False)  # Size in MB or KB
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    """

    
    user = relationship('User', backref='uploads')
    allocations = relationship('Allocation', backref='upload', cascade='all, delete-orphan')
