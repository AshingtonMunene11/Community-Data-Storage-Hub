from flask import Blueprint
from .upload_routes import upload_bp
from .allocation_routes import allocation_bp
from .storage_nodes_bp import storage_nodes_bp

def register_routes(app):
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(allocation_bp, url_prefix='/api')
    

