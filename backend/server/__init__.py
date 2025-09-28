from flask import Flask
from flask_cors import CORS
from extensions import db, ma, migrate
from .config import Config

from server.routes.users import users_bp
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp
from server.routes.storage_nodes_bp import storage_nodes_bp
from server.routes.dashboard_routes import dashboard_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(upload_bp, url_prefix="/api/uploads")
    app.register_blueprint(allocation_bp, url_prefix="/api/allocations")
    app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    @app.route("/")
    def health_check():
        return {
            "status": "healthy",
            "message": "Community Data Storage Hub API is running!",
            "version": "1.0.0",
            "endpoints": {
                "users": "/api/users/",
                "storage_nodes": "/api/storage-nodes/",
                "uploads": "/api/uploads/",
                "allocations": "/api/allocations/",
                "dashboard": "/api/dashboard/",
            },
        }

    return app

__all__ = ["create_app", "db"]
