from flask import Flask
from flask_cors import CORS
from .extensions import db, ma, migrate
from flask_migrate import Migrate
from . import config
# other imports...

def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # register blueprints...
    return app

app = create_app()

# 👇 Add this to expose db for CLI
from .extensions import db
