#!/usr/bin/env python3
"""
Seed script to populate the database with initial data.
Run this from the backend directory: python run_seeds.py
"""
import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from server import create_app
from server.extensions import db
from server.seeds import run_all_seeders

def main():
    """Run all seed functions."""
    app = create_app()
    
    with app.app_context():
        print("🌱 Starting database seeding...")
        
        # Create all tables if they don't exist
        db.create_all()
        print("✅ Database tables created/verified")
        
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
        
        # Run all seed functions
        run_all_seeders()
        
        # Check final counts
        user_count = User.query.count()
        upload_count = Upload.query.count()
        node_count = StorageNode.query.count()
        allocation_count = Allocation.query.count()
        
        print(f"📊 Final data counts:")
        print(f"   Users: {user_count}")
        print(f"   Uploads: {upload_count}")
        print(f"   Storage Nodes: {node_count}")
        print(f"   Allocations: {allocation_count}")
        
        print("🎉 Database seeding completed!")

if __name__ == "__main__":
    main()
