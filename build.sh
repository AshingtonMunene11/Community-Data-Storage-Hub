#!/bin/bash

# Build script for Render deployment
# This script runs during the build phase on Render

set -o errexit

echo " Starting build process..."

echo " Upgrading pip..."
python -m pip install --upgrade pip

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Creating directories..."
mkdir -p instance
mkdir -p logs

echo " Build completed successfully!"
