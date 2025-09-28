#!/usr/bin/env python3
"""
Database migration script.
Run this from the backend directory: python migrate_db.py
"""
import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from server import create_app
from server.extensions import db

def main():
    """Initialize and migrate the database."""
    app = create_app()
    
    with app.app_context():
        print("🔄 Starting database migration...")
        
        # Drop all tables (be careful in production!)
        print("⚠️  Dropping existing tables...")
        db.drop_all()
        
        # Create all tables
        print("🏗️  Creating database tables...")
        db.create_all()
        
        print("✅ Database migration completed!")
        print("📊 Tables created:")
        
        # List all tables
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        for table in tables:
            print(f"  - {table}")

if __name__ == "__main__":
    main()
