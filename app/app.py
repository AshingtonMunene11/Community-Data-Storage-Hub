from flask import Flask
from flask_cors import CORS
from server.extensions import db, ma, migrate
from server.routes.users import users_bp
from server.routes.storage_nodes_bp import storage_nodes_bp
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp
from .config import Config
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    """
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")
    app.register_blueprint(upload_bp, url_prefix="/api/uploads")
    app.register_blueprint(allocation_bp, url_prefix="/api/allocations")
    """

    app.register_blueprint(users_bp, url_prefix="/api/users")
    #app.register_blueprint(upload_bp, url_prefix="/api/uploads")
    app.register_blueprint(upload_bp, url_prefix="/api")
    app.register_blueprint(allocation_bp, url_prefix="/api/allocations")
    app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")

    # Health check endpoint
    @app.route("/")
    def health_check():
        return {
            "status": "healthy",
            "message": "Community Data Storage Hub API is running!",
            "version": "1.0.0",
            "endpoints": {
                "users": "/api/users/",
                "storage_nodes": "/api/storage-nodes/",
                "uploads": "/api/uploads",
                "allocations": "/api/allocations/"
            }
        }
    
    # Debug endpoint to check database
    @app.route("/debug")
    def debug():
        from server.models import User, StorageNode, Upload, Allocation
        return {
            "database_uri": app.config.get('SQLALCHEMY_DATABASE_URI'),
            "database_counts": {
                "users": User.query.count(),
                "storage_nodes": StorageNode.query.count(),
                "uploads": Upload.query.count(),
                "allocations": Allocation.query.count()
            },
            "sample_users": [{"id": u.id, "username": u.username} for u in User.query.limit(3).all()]
        }

    return app


#test whether the app is runing using the following code, uncomment it when needed
"""
@app.route("/hello")
def hello():
    return "Hello World!"""
