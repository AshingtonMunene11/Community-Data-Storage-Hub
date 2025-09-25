from flask import Flask
from flask_cors import CORS
from .extensions import db, ma, migrate
from .routes.users import users_bp
from .routes.storage_nodes_bp import storage_nodes_bp
from .routes.upload_routes import upload_bp
from .routes.allocation_routes import allocation_bp
from . import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)
    
    # Enable CORS
    CORS(app)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        # Register blueprints
        app.register_blueprint(users_bp, url_prefix="/api/users")
        app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")
        app.register_blueprint(upload_bp, url_prefix="/api")
        app.register_blueprint(allocation_bp, url_prefix="/api")

    return app

app = create_app()

