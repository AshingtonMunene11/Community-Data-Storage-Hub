from flask import Blueprint
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp

def register_routes(app):
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(allocation_bp, url_prefix='/api')
