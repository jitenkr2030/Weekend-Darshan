#!/bin/bash

echo "=== Weekend Darshan Quick Setup ==="
echo ""
echo "This script will help you set up your environment variables."
echo ""
echo "Please copy your environment variables from Vercel/Neon dashboard:"
echo ""

# Create a template for the user to fill in
echo "Create your .env.local file with the following content:"
echo ""
cat << 'EOF'
# Database Configuration - Neon PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_NEON_PASSWORD@YOUR_ACTUAL_NEON_HOST:5432/neondb?sslmode=require"
NEON__POSTGRES_URL_NON_POOLING="postgresql://postgres:YOUR_ACTUAL_NEON_PASSWORD@YOUR_ACTUAL_NEON_HOST:5432/neondb?sslmode=require"

# Authentication
NEXTAUTH_SECRET="YOUR_ACTUAL_NEXTAUTH_SECRET"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="YOUR_ACTUAL_JWT_SECRET"

# Neon Database Environment Variables
NEON__POSTGRES_PASSWORD="YOUR_ACTUAL_NEON_PASSWORD"
NEON__PGHOST="YOUR_ACTUAL_NEON_HOST"
EOF

echo ""
echo "Replace YOUR_ACTUAL_* values with your real environment variables."
echo ""
echo "After setting up .env.local, run:"
echo "  bun run db:push"
echo "  bun run db:seed"
echo "  bun run dev"