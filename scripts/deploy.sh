#!/bin/bash

# Deploy script for jomis7keys to Fly.io
# Usage: ./scripts/deploy.sh [environment]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment to Fly.io...${NC}"

# Check if fly is installed
if ! command -v fly &> /dev/null; then
    echo -e "${RED}❌ Fly CLI is not installed. Please install it first:${NC}"
    echo "brew install flyctl"
    exit 1
fi

# Check if user is logged in
if ! fly auth whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Fly.io. Please login first:${NC}"
    echo "fly auth login"
    exit 1
fi

# Load environment variables if .env file exists
if [ -f .env ]; then
    echo -e "${YELLOW}📝 Loading environment variables from .env file...${NC}"
    source .env
fi

# Check required environment variables
if [ -z "$PUBLIC_APPWRITE_ENDPOINT" ] || [ -z "$PUBLIC_APPWRITE_PROJECT_ID" ]; then
    echo -e "${RED}❌ Missing required environment variables:${NC}"
    echo "PUBLIC_APPWRITE_ENDPOINT=${PUBLIC_APPWRITE_ENDPOINT:-'not set'}"
    echo "PUBLIC_APPWRITE_PROJECT_ID=${PUBLIC_APPWRITE_PROJECT_ID:-'not set'}"
    echo ""
    echo "Please set them in .env file or as environment variables"
    exit 1
fi

# Set secrets on Fly.io
echo -e "${YELLOW}🔐 Setting secrets on Fly.io...${NC}"
fly secrets set PUBLIC_APPWRITE_ENDPOINT="$PUBLIC_APPWRITE_ENDPOINT"
fly secrets set PUBLIC_APPWRITE_PROJECT_ID="$PUBLIC_APPWRITE_PROJECT_ID"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
bun install

# Run linting
echo -e "${YELLOW}🔍 Running linting...${NC}"
bun run lint

# Build the app
echo -e "${YELLOW}🔨 Building the app...${NC}"
bun run build

# Deploy to Fly.io
echo -e "${YELLOW}🚁 Deploying to Fly.io...${NC}"
fly deploy

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your app should be available at: https://jomis7keys.fly.dev${NC}"

# Show status
echo -e "${YELLOW}📊 App status:${NC}"
fly status 