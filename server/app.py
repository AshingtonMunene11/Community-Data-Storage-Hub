from flask import Flask
from server.extensions import db, ma
from server.routes import register_routes
import config

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.create_all()

    # Register Dev 2 routes (uploads, allocations)
    register_routes(app)

    @app.route("/")
    def home():
        return "Hello, Flask is working!"

    return app

app = create_app()
