from flask import Flask
from flask_cors import CORS
from server.extensions import db, ma, migrate
from server.routes.users import users_bp
from server.routes.storage_nodes_bp import storage_nodes_bp
from server.routes.upload_routes import upload_bp
from server.routes.allocation_routes import allocation_bp
from .config import Config


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
    app.register_blueprint(upload_bp, url_prefix="/api/uploads")
    app.register_blueprint(allocation_bp, url_prefix="/api/allocations")
    app.register_blueprint(storage_nodes_bp, url_prefix="/api/storage-nodes")


    return app


#test whether the app is runing using the following code, uncomment it when needed
"""
@app.route("/hello")
def hello():
    return "Hello World!"""
