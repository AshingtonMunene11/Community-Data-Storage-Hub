#!/bin/bash

# Build script for Render deployment
# This script runs during the build phase on Render

set -o errexit  # Exit on error

echo "🚀 Starting build process..."

# Upgrade pip to latest version
echo "📦 Upgrading pip..."
python -m pip install --upgrade pip

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p instance
mkdir -p logs

echo "✅ Build completed successfully!"
