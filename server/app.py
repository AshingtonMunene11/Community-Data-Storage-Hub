from flask import Flask
from server.extensions import db, ma, migrate
from server.routes.users import users_bp
from server.routes.storage_nodes import storage_nodes_bp
from server.routes import register_routes
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)  # Enable Flask-Migrate

    with app.app_context():
        # Option 1: Manual blueprint registration
        app.register_blueprint(users_bp, url_prefix="/users")
        app.register_blueprint(storage_nodes_bp, url_prefix="/storage-nodes")

        # Option 2: Centralized route registration
        # register_routes(app)

    return app

