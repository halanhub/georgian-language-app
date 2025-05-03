#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Create a dist directory if it doesn't exist
mkdir -p dist

# Copy CNAME file to dist directory to ensure custom domain persists
echo "Copying CNAME file to dist directory..."
cp CNAME dist/

# Copy robots.txt and sitemap.xml to dist directory
echo "Copying robots.txt and sitemap.xml to dist directory..."
cp public/robots.txt dist/
cp public/sitemap.xml dist/

# Create a .nojekyll file to prevent GitHub Pages from using Jekyll
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# GitHub Pages deployment instructions
echo "===== GITHUB PAGES DEPLOYMENT INSTRUCTIONS ====="
echo "To deploy to GitHub Pages with your custom domain, follow these steps:"
echo ""
echo "1. Force push the contents of the 'dist' directory to the 'gh-pages' branch:"
echo "   git add dist -f"
echo "   git commit -m \"Deploy to GitHub Pages\""
echo "   git push origin \`git subtree split --prefix dist main\`:gh-pages --force"
echo ""
echo "2. In your repository settings, ensure GitHub Pages is enabled and set to use the 'gh-pages' branch"
echo "3. Check that your custom domain is configured in the GitHub Pages settings"
echo "4. Ensure your DNS settings are correctly configured:"
echo "   - A records pointing to GitHub Pages IPs: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153"
echo "   - CNAME record for www pointing to halanhub.github.io"
echo ""
echo "The build files are ready in the 'dist' directory."
echo "================================================"