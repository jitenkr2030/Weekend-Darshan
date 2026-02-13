#!/bin/bash

echo "🔧 Neon Database Setup Script"
echo "============================"
echo ""
echo "This script will help you set up your Neon database connection."
echo ""
echo "Please get your actual Neon database credentials from your Vercel dashboard:"
echo ""
echo "1. Go to your Vercel project"
echo "2. Navigate to Settings → Environment Variables"
echo "3. Copy the actual values for:"
echo "   - NEON__POSTGRES_PASSWORD"
echo "   - NEON__PGHOST"
echo "   - NEXTAUTH_SECRET"
echo "   - JWT_SECRET"
echo ""
echo "Then run this script again with the actual values."
echo ""
echo "Current .env.local has placeholder values that need to be replaced."
echo ""

# Show current placeholder values
echo "Current DATABASE_URL format:"
echo "postgresql://postgres:NEON__POSTGRES_PASSWORD@NEON__PGHOST:5432/neondb?sslmode=require"
echo ""
echo "You need to replace:"
echo "- NEON__POSTGRES_PASSWORD with your actual password"
echo "- NEON__PGHOST with your actual host"
echo ""

# Instructions for manual setup
echo "📝 Manual Setup Instructions:"
echo "1. Edit .env.local file"
echo "2. Replace placeholder values with actual ones:"
echo ""
echo "   DATABASE_URL=\"postgresql://postgres:YOUR_ACTUAL_PASSWORD@YOUR_ACTUAL_HOST:5432/neondb?sslmode=require\""
echo "   NEON__POSTGRES_URL_NON_POOLING=\"postgresql://postgres:YOUR_ACTUAL_PASSWORD@YOUR_ACTUAL_HOST:5432/neondb?sslmode=require\""
echo "   NEXTAUTH_SECRET=\"YOUR_ACTUAL_SECRET\""
echo "   JWT_SECRET=\"YOUR_ACTUAL_SECRET\""
echo "   NEON__POSTGRES_PASSWORD=\"YOUR_ACTUAL_PASSWORD\""
echo "   NEON__PGHOST=\"YOUR_ACTUAL_HOST\""
echo ""
echo "3. Then run:"
echo "   bun run db:push    # Creates tables in Neon"
echo "   bun run db:seed    # Adds demo data"
echo ""

# Alternative: Interactive setup
read -p "Do you want to set up interactively? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Enter your Neon database details:"
    read -p "NEON__POSTGRES_PASSWORD: " neon_password
    read -p "NEON__PGHOST: " neon_host
    read -p "NEXTAUTH_SECRET: " nextauth_secret
    read -p "JWT_SECRET: " jwt_secret
    
    # Update .env.local with actual values
    cat > .env.local << EOF
# Database Configuration - Neon PostgreSQL
DATABASE_URL="postgresql://postgres:${neon_password}@${neon_host}:5432/neondb?sslmode=require"
NEON__POSTGRES_URL_NON_POOLING="postgresql://postgres:${neon_password}@${neon_host}:5432/neondb?sslmode=require"

# Authentication
NEXTAUTH_SECRET="${nextauth_secret}"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="${jwt_secret}"

# Neon Database Environment Variables
NEON__POSTGRES_PASSWORD="${neon_password}"
NEON__PGHOST="${neon_host}"
EOF
    
    echo "✅ .env.local updated with actual values!"
    echo ""
    echo "Now run:"
    echo "  bun run db:push"
    echo "  bun run db:seed"
else
    echo "Please update .env.local manually with your actual Neon credentials."
fi