from flask import Flask, jsonify
from flask_cors import CORS
from server.extensions import db, ma, migrate
from server.routes.users import users_bp
from server.routes.storage_nodes_bp import storage_nodes_bp
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp
from server import config
from server.models import user, upload, allocation, storage_node  

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)
    
    # Enable CORS For all /api/* routes with credentials
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:3000"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"], # explicitly allow headers
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"] # allow preflight
        )

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        # Import models so that they are registered with SQLAlchemy for migrations
        from models import user, upload, allocation, storage_node  # noqa: F401
        # Register blueprints
        app.register_blueprint(users_bp, url_prefix="/api/users")
        app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")
        app.register_blueprint(upload_bp, url_prefix="/api")
        app.register_blueprint(allocation_bp, url_prefix="/api/allocations")

    # Root health/info endpoint
    @app.route("/")
    def root():
        return jsonify({
            "status": "ok",
            "name": "Community Data Storage Hub API",
            "endpoints": [
                "/api/users/",
                "/api/storage-nodes/",
                "/api/uploads",
                "/api/allocations"
            ]
        }), 200

    return app

app = create_app()

