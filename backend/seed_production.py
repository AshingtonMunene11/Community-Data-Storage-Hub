#!/usr/bin/env python3
"""
Production seeding script for Render deployment.
This script can be run on Render to seed the production database.
"""
import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from server import create_app
from server.extensions import db
from server.seeds import run_all_seeders

def main():
    """Seed production database."""
    print("🌱 Starting production database seeding...")
    
    # Ensure we're in production mode
    os.environ['FLASK_ENV'] = 'production'
    
    app = create_app()
    
    with app.app_context():
        print("📊 Checking database connection...")
        
        try:
            # Test database connection
            db.engine.execute('SELECT 1')
            print("✅ Database connection successful")
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            return False
        
        # Create tables if they don't exist
        print("🏗️  Creating/verifying database tables...")
        db.create_all()
        
        # Check current data
        from server.models import User, Upload, StorageNode, Allocation
        
        user_count = User.query.count()
        upload_count = Upload.query.count()
        node_count = StorageNode.query.count()
        allocation_count = Allocation.query.count()
        
        print(f"📊 Current data counts:")
        print(f"   Users: {user_count}")
        print(f"   Uploads: {upload_count}")
        print(f"   Storage Nodes: {node_count}")
        print(f"   Allocations: {allocation_count}")
        
        # Only seed if database is empty or has minimal data
        if user_count == 0 or upload_count == 0:
            print("🌱 Database appears empty, running seeders...")
            run_all_seeders()
        else:
            print("📋 Database already has data, skipping seeding")
        
        # Final counts
        user_count = User.query.count()
        upload_count = Upload.query.count()
        node_count = StorageNode.query.count()
        allocation_count = Allocation.query.count()
        
        print(f"📊 Final data counts:")
        print(f"   Users: {user_count}")
        print(f"   Uploads: {upload_count}")
        print(f"   Storage Nodes: {node_count}")
        print(f"   Allocations: {allocation_count}")
        
        print("🎉 Production database seeding completed!")
        return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
