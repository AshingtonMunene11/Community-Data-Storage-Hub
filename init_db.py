#!/usr/bin/env python3
"""
Database Initialization Script for Community Data Storage Hub

This script properly initializes the database with all models and creates
sample data for testing.
"""

import os
import sys

# Add the project root to Python path
project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)

from app import create_app
from server.extensions import db
from server.models import User, Upload, StorageNode, Allocation
from datetime import datetime

def init_database():
    """Initialize the database with all tables and sample data."""
    
    app = create_app()
    
    with app.app_context():
        print("🗄️  Initializing database...")
        
        # Drop all existing tables
        db.drop_all()
        print("✓ Dropped existing tables")
        
        # Create all tables
        db.create_all()
        print("✓ Created all tables")
        
        # Create sample users
        users_data = [
            {
                'username': 'admin',
                'email': 'admin@example.com',
                'role': 'admin'
            },
            {
                'username': 'user1',
                'email': 'user1@example.com',
                'role': 'user'
            },
            {
                'username': 'user2',
                'email': 'user2@example.com',
                'role': 'user'
            }
        ]
        
        created_users = []
        for user_data in users_data:
            user = User(
                username=user_data['username'],
                email=user_data['email'],
                role=user_data['role']
            )
            user.set_password('password123')  # Default password for testing
            db.session.add(user)
            created_users.append(user)
        
        # Create sample storage nodes
        storage_nodes_data = [
            {
                'name': 'Node-East-1',
                'location': 'East Coast Data Center',
                'capacity': 1000000,  # 1TB in MB
                'used': 250000       # 250GB used
            },
            {
                'name': 'Node-West-1',
                'location': 'West Coast Data Center',
                'capacity': 2000000,  # 2TB in MB
                'used': 500000       # 500GB used
            },
            {
                'name': 'Node-Central-1',
                'location': 'Central Data Center',
                'capacity': 1500000,  # 1.5TB in MB
                'used': 100000       # 100GB used
            }
        ]
        
        created_storage_nodes = []
        for node_data in storage_nodes_data:
            storage_node = StorageNode(**node_data)
            db.session.add(storage_node)
            created_storage_nodes.append(storage_node)
        
        # Commit users and storage nodes first
        db.session.commit()
        print("✓ Created sample users and storage nodes")
        
        # Create sample uploads
        uploads_data = [
            {
                'filename': 'document1.pdf',
                'size': 2.5,  # 2.5 MB
                'user_id': created_users[1].id
            },
            {
                'filename': 'image1.jpg',
                'size': 1.2,  # 1.2 MB
                'user_id': created_users[1].id
            },
            {
                'filename': 'video1.mp4',
                'size': 150.0,  # 150 MB
                'user_id': created_users[2].id
            }
        ]
        
        created_uploads = []
        for upload_data in uploads_data:
            upload = Upload(**upload_data)
            db.session.add(upload)
            created_uploads.append(upload)
        
        # Commit uploads
        db.session.commit()
        print("✓ Created sample uploads")
        
        # Create sample allocations
        allocations_data = [
            {
                'upload_id': created_uploads[0].id,
                'storage_node_id': created_storage_nodes[0].id,
                'allocated_size': 2.5
            },
            {
                'upload_id': created_uploads[1].id,
                'storage_node_id': created_storage_nodes[1].id,
                'allocated_size': 1.2
            },
            {
                'upload_id': created_uploads[2].id,
                'storage_node_id': created_storage_nodes[0].id,
                'allocated_size': 75.0
            },
            {
                'upload_id': created_uploads[2].id,
                'storage_node_id': created_storage_nodes[2].id,
                'allocated_size': 75.0
            }
        ]
        
        for allocation_data in allocations_data:
            allocation = Allocation(**allocation_data)
            db.session.add(allocation)
        
        # Final commit
        db.session.commit()
        print("✓ Created sample allocations")
        
        # Print summary
        print("\n" + "="*50)
        print("🎉 Database initialized successfully!")
        print("="*50)
        print(f"👥 Users created: {len(created_users)}")
        print(f"🗄️  Storage nodes created: {len(created_storage_nodes)}")
        print(f"📁 Uploads created: {len(created_uploads)}")
        print(f"🔗 Allocations created: {len(allocations_data)}")
        print("\n📝 Test credentials:")
        for user in created_users:
            print(f"   • {user.username} ({user.role}): password123")
        print("="*50)

if __name__ == "__main__":
    init_database()
