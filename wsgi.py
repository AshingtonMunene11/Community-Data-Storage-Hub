#!/usr/bin/env python3
"""
WSGI Entry Point for Gunicorn

This file is used by Gunicorn to serve the Flask application in production.
"""

import os
import sys

# Add the project root to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

from app import create_app
from server.extensions import db

# Create the Flask application
application = create_app()

# Initialize database tables in production
with application.app_context():
    try:
        db.create_all()
        print("✓ Database tables initialized")
    except Exception as e:
        print(f"⚠ Database initialization warning: {e}")

if __name__ == "__main__":
    application.run()
