#!/bin/bash

echo "=== Weekend Darshan Environment Setup ==="
echo ""
echo "Please provide your Neon database details:"
echo ""

read -p "Enter your NEON_POSTGRES_PASSWORD: " neon_password
read -p "Enter your NEON_PGHOST: " neon_host
read -p "Enter your NEXTAUTH_SECRET: " nextauth_secret
read -p "Enter your JWT_SECRET: " jwt_secret

echo ""
echo "Updating .env.local file..."

# Create the .env.local file with actual values
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

echo "✅ Environment variables updated successfully!"
echo ""
echo "Now run: bun run db:push"
echo "Then run: bun run dev"