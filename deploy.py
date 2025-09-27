#!/usr/bin/env python3
"""
Automated deployment script for Community Data Storage Hub

This script handles database initialization and other deployment tasks
that need to run before the application starts.
"""

import os
import sys
import logging
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def setup_database():
    """Initialize database tables and handle migrations."""
    try:
        from wsgi import application
        from server.extensions import db
        from server.models import User, Upload, StorageNode, Allocation
        
        with application.app_context():
            logger.info("🗄️ Setting up database...")
            
            # Create all tables
            db.create_all()
            logger.info("✅ Database tables created/verified")
            
            # Check if we need to create initial data
            user_count = User.query.count()
            if user_count == 0:
                logger.info("📝 Creating initial admin user...")
                admin_user = User(
                    username='admin',
                    email='admin@example.com',
                    role='admin'
                )
                admin_user.set_password('admin123')
                db.session.add(admin_user)
                db.session.commit()
                logger.info("✅ Initial admin user created")
            else:
                logger.info(f"✅ Database already has {user_count} users")
                
    except Exception as e:
        logger.error(f"❌ Database setup failed: {e}")
        raise

def verify_environment():
    """Verify that all required environment variables are set."""
    required_vars = ['DATABASE_URL']
    missing_vars = []
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.warning(f"⚠️ Missing environment variables: {missing_vars}")
    else:
        logger.info("✅ All required environment variables are set")

def main():
    """Main deployment function."""
    logger.info("🚀 Starting deployment setup...")
    
    try:
        # Verify environment
        verify_environment()
        
        # Setup database
        setup_database()
        
        logger.info("🎉 Deployment setup completed successfully!")
        return 0
        
    except Exception as e:
        logger.error(f"💥 Deployment setup failed: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
