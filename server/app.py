from flask import Flask
from server.extensions import db, ma
from server.routes.users import users_bp
from server.routes.storage_nodes import storage_nodes_bp
from server.routes import register_routes  # PLEASE DO NOT REMOVE THIS LINE
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    # we are initialize extensions
    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.create_all()

   
    app.register_blueprint(users_bp)
    app.register_blueprint(storage_nodes_bp)

    # Register modular blueprints (uploads, allocations) PLEASE DO NOT REMOVE THIS LINE
    register_routes(app)

    @app.route("/")
    def home():
        return "Hello, Flask is working!"

    print(app.url_map)

    return app
