#!/bin/bash

# Vercel Build Script with Database Setup
echo "🚀 Starting Vercel build with database setup..."

# Install dependencies
echo "📦 Installing dependencies..."
bun install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
bunx prisma generate

# Create database directory if it doesn't exist
echo "📁 Creating database directory..."
mkdir -p db

# Set up database file
echo "🗄️ Setting up database..."
touch db/custom.db

# Run database migrations/setup
echo "🔄 Running database setup..."
bunx prisma db push --force-reset

# Seed the database
echo "🌱 Seeding database..."
curl -f -X POST http://localhost:3000/api/seed || echo "Seed API not available during build, will run on first request"

# Build the Next.js application
echo "🏗️ Building Next.js application..."
bun run build

echo "✅ Build completed successfully!"