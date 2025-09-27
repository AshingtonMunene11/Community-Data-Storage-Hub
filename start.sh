#!/bin/bash

# Start script for Render deployment
# This script runs to start the application on Render

set -o errexit  # Exit on error

echo "🚀 Starting Community Data Storage Hub API..."

# Initialize database if needed
echo "🗄️ Initializing database..."
python -c "
from wsgi import application
from server.extensions import db
with application.app_context():
    try:
        db.create_all()
        print('✅ Database tables created/verified')
    except Exception as e:
        print(f'⚠️ Database setup: {e}')
"

# Start the application with Gunicorn
echo "🌐 Starting Gunicorn server..."
exec python -m gunicorn wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 2 \
    --worker-class sync \
    --worker-connections 1000 \
    --timeout 30 \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --log-level info \
    --access-logfile - \
    --error-logfile -
