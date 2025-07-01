#!/bin/bash

echo "🚀 Starting URL Shortener Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    if [ -f env.template ]; then
        cp env.template .env
        echo "✅ Created .env file from template. Please edit it with your database credentials."
    else
        echo "❌ env.template not found. Please create a .env file manually."
        exit 1
    fi
fi

echo "📦 Starting Docker services (PostgreSQL, Redis, pgWeb, Redis Commander)..."
docker-compose up -d

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
sleep 5

# Check if databases are running
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Failed to start Docker services. Check docker-compose logs."
    exit 1
fi

echo "✅ Docker services are running!"
echo "   - PostgreSQL: localhost:5435"
echo "   - Redis: localhost:6379"
echo "   - pgWeb: http://localhost:8085"
echo "   - Redis Commander: http://localhost:8081"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
fi

# Check if database tables exist (optional)
echo "🔍 Checking database schema..."
if ! npx prisma db push --accept-data-loss > /dev/null 2>&1; then
    echo "⚠️  Database schema might need to be created. Run 'npx prisma db push' manually if needed."
fi

echo "🚀 Starting Node.js application..."
echo "   - App will be available at: http://localhost:3000"
echo "   - Press Ctrl+C to stop"
echo ""

# Start Prisma Studio in background
echo "🔧 Starting Prisma Studio..."
echo "   - Prisma Studio will be available at: http://localhost:5555"
npx prisma studio &
PRISMA_PID=$!

# Start the application
npm run dev

# When npm run dev exits, kill Prisma Studio
if [ ! -z "$PRISMA_PID" ]; then
    echo "🛑 Stopping Prisma Studio..."
    kill $PRISMA_PID 2>/dev/null
fi 