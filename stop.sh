#!/bin/bash

echo "🛑 Stopping URL Shortener Development Environment..."

echo "📦 Stopping Docker services..."
docker-compose down

echo "🔧 Stopping Prisma Studio..."
pkill -f "prisma studio" 2>/dev/null || true

echo "✅ All services stopped!"
echo "   - To start again, run: ./start.sh" 