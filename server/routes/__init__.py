from server.routes.storage_nodes import storage_nodes_bp

def register_routes(app):
    app.register_blueprint(storage_nodes_bp)
