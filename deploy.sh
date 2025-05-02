#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a dist directory if it doesn't exist
mkdir -p dist

# Deploy instructions
echo "===== DEPLOYMENT INSTRUCTIONS ====="
echo "To deploy to your domain www.georgianlanguage.online, follow these steps:"
echo ""
echo "1. Upload the contents of the 'dist' directory to your web hosting server"
echo "2. Configure your domain DNS settings to point to your hosting server"
echo "3. Set up HTTPS for secure connections"
echo ""
echo "If you're using a specific hosting provider, follow their instructions for:"
echo "- Uploading static website files"
echo "- Setting up custom domains"
echo "- Configuring SSL certificates"
echo ""
echo "The build files are ready in the 'dist' directory."
echo "=================================="