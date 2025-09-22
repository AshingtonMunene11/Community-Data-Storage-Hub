from flask import Flask 
from extensions import db, ma, migrate
from routes.users import users_bp
from routes.storage_nodes import storage_nodes_bp
import config


def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db) # Enable Flask-Migrate
    
    # Register blueprints with prefixes
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(storage_nodes_bp, url_prefix="/storage-nodes")

    @app.route("/")
    def home():
        return "Hello, Flask is working!"
    
    print(app.url_map)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

