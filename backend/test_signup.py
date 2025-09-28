#!/usr/bin/env python3
"""
Test script to verify signup functionality works.
Run this from the backend directory: python test_signup.py
"""
import os
import sys
import requests
import json

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from server import create_app
from server.extensions import db
from server.models import User

def test_local_signup():
    """Test signup functionality locally."""
    app = create_app()
    
    with app.app_context():
        print("🧪 Testing local signup functionality...")
        
        # Test data
        test_user = {
            "username": "testuser123",
            "email": "testuser123@example.com",
            "password": "testpassword123"
        }
        
        # Check if user already exists
        existing_user = User.query.filter_by(username=test_user["username"]).first()
        if existing_user:
            print(f"🗑️  Removing existing test user...")
            db.session.delete(existing_user)
            db.session.commit()
        
        # Create test client
        with app.test_client() as client:
            print(f"📤 Attempting to create user: {test_user['username']}")
            
            response = client.post(
                '/api/users/',
                data=json.dumps(test_user),
                content_type='application/json'
            )
            
            print(f"📥 Response status: {response.status_code}")
            print(f"📥 Response data: {response.get_json()}")
            
            if response.status_code == 201:
                print("✅ Local signup test PASSED!")
                return True
            else:
                print("❌ Local signup test FAILED!")
                return False

def test_deployed_signup():
    """Test signup functionality on deployed backend."""
    print("🌐 Testing deployed signup functionality...")
    
    # Test data
    test_user = {
        "username": "testuser456",
        "email": "testuser456@example.com", 
        "password": "testpassword456"
    }
    
    try:
        print(f"📤 Attempting to create user on deployed backend: {test_user['username']}")
        
        response = requests.post(
            'https://community-data-storage-hub-7.onrender.com/api/users',
            json=test_user,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"📥 Response status: {response.status_code}")
        print(f"📥 Response data: {response.json()}")
        
        if response.status_code == 201:
            print("✅ Deployed signup test PASSED!")
            return True
        else:
            print("❌ Deployed signup test FAILED!")
            return False
            
    except Exception as e:
        print(f"❌ Deployed signup test ERROR: {e}")
        return False

def main():
    """Run all tests."""
    print("🚀 Starting signup functionality tests...\n")
    
    local_result = test_local_signup()
    print()
    deployed_result = test_deployed_signup()
    
    print("\n📊 Test Results:")
    print(f"   Local signup: {'✅ PASS' if local_result else '❌ FAIL'}")
    print(f"   Deployed signup: {'✅ PASS' if deployed_result else '❌ FAIL'}")
    
    if local_result and deployed_result:
        print("\n🎉 All tests passed! Signup functionality is working.")
    else:
        print("\n⚠️  Some tests failed. Check the logs above for details.")

if __name__ == "__main__":
    main()
