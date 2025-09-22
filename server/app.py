from flask import Flask 
from extensions import db, ma 
from routes.users import users_bp
from routes.storage_nodes import storage_nodes_bp
import config


def create_app():
    app = Flask(__name__)
    app.config.from_object(config.Config)

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.create_all()

    
    # register routes
    app.register_blueprint(users_bp)
    app.register_blueprint(storage_nodes_bp)

    @app.route("/")
    def home():
        return "Hello, Flask is working!"
    
    print(app.url_map)

    return app




if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)




