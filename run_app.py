#!/usr/bin/env python3
"""
Community Data Storage Hub - Flask Application Runner

This script properly initializes and runs the Flask application with all dependencies.
Run this from the project root directory.
"""

import os
import sys

project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

from app import create_app
from server.extensions import db

def main():
    """Initialize and run the Flask application."""
    
    app = create_app()
    
    with app.app_context():
        try:
            from server.models import User
            user_count = User.query.count()
            print(f"✓ Database already initialized ({user_count} users found)")
        except Exception:
            db.create_all()
            print("✓ Database tables created (empty database)")
    
    # Print startup information
    print(f"Server: http://127.0.0.1:5000")
    print(f"API Routes: http://127.0.0.1:5000")
    print(f"Debug Mode: {app.debug}")
    print("Press CTRL+C to stop the server")
    print()
    
    try:
        app.run(
            debug=True,
            host='127.0.0.1',
            port=5000,
            use_reloader=True
        )
    except KeyboardInterrupt:
        print("\n Server stopped by user")
    except Exception as e:
        print(f"\n Server error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
