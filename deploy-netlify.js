const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

console.log(`${colors.blue}Starting Netlify deployment process...${colors.reset}`);

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.error(`${colors.red}Error: .env file not found. Please create it first.${colors.reset}`);
  process.exit(1);
}

// Build the project
console.log(`${colors.yellow}Building the project...${colors.reset}`);
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Build completed successfully.${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Build failed:${colors.reset}`, error);
  process.exit(1);
}

// Check if netlify.toml exists, create if not
if (!fs.existsSync('netlify.toml')) {
  console.log(`${colors.yellow}Creating netlify.toml configuration file...${colors.reset}`);
  const netlifyConfig = `[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  fs.writeFileSync('netlify.toml', netlifyConfig);
  console.log(`${colors.green}netlify.toml created.${colors.reset}`);
}

// Deploy to Netlify
console.log(`${colors.yellow}Deploying to Netlify...${colors.reset}`);
console.log(`${colors.blue}Note: You'll need to set environment variables in the Netlify dashboard.${colors.reset}`);

try {
  // Check if Netlify CLI is installed
  try {
    execSync('netlify --version', { stdio: 'pipe' });
  } catch (error) {
    console.log(`${colors.yellow}Installing Netlify CLI...${colors.reset}`);
    execSync('npm install -g netlify-cli', { stdio: 'inherit' });
  }

  // Deploy to Netlify
  execSync('netlify deploy --prod', { stdio: 'inherit' });
  console.log(`${colors.green}Deployment completed successfully!${colors.reset}`);
  
  console.log(`${colors.yellow}
IMPORTANT: Make sure to set these environment variables in your Netlify dashboard:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_STRIPE_PUBLISHABLE_KEY
${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Deployment failed:${colors.reset}`, error);
  process.exit(1);
}