# URL Shortener

A modern URL shortening service built with Node.js, TypeScript, Express, PostgreSQL, and Redis. Features a beautiful web interface and robust backend with caching.

## 🚀 Quick Start

### Prerequisites

- **Docker Desktop** (for databases)
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### One-Command Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd url_shortener
   ```

2. **Start everything with one command:**

   ```bash
   ./start.sh
   ```

   This script will:

   - ✅ Start PostgreSQL, Redis, and admin tools
   - ✅ Create `.env` file from template
   - ✅ Install dependencies
   - ✅ Set up database schema
   - ✅ Start Prisma Studio
   - ✅ Launch your app with hot reload

3. **Access your application:**

   - **Main App**: http://localhost:3000
   - **Prisma Studio**: http://localhost:5555
   - **pgWeb (DB Admin)**: http://localhost:8085
   - **Redis Commander**: http://localhost:8081

4. **Stop everything:**
   ```bash
   ./stop.sh
   ```

## 📁 Project Structure

```
url_shortener/
├── src/
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── db.ts           # Database connection
│   ├── redis.ts        # Redis connection
│   └── index.ts        # Express server
├── public/             # Frontend files
│   ├── index.html      # Main page
│   ├── styles.css      # Styling
│   └── script.js       # Frontend logic
├── prisma/
│   └── schema.prisma   # Database schema
├── docker-compose.yml  # Database services
├── start.sh           # Development startup script
├── stop.sh            # Development shutdown script
└── env.template       # Environment variables template
```

## 🛠️ Development

### Manual Setup (Alternative to scripts)

If you prefer to run commands manually:

1. **Start databases:**

   ```bash
   docker-compose up -d
   ```

2. **Create environment file:**

   ```bash
   cp env.template .env
   # Edit .env with your database credentials
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up database:**

   ```bash
   npx prisma db push
   ```

5. **Start the application:**
   ```bash
   npm run dev
   ```

### Available Scripts

| Script               | Description                |
| -------------------- | -------------------------- |
| `./start.sh`         | Start all services and app |
| `./stop.sh`          | Stop all services          |
| `npm run dev`        | Start app with nodemon     |
| `npm run build`      | Build for production       |
| `npm start`          | Start production build     |
| `npx prisma studio`  | Open database GUI          |
| `npx prisma db push` | Push schema to database    |

## 🗄️ Database Services

### PostgreSQL

- **Host**: localhost
- **Port**: 5435 (mapped from Docker)
- **Database**: urlshortener
- **Username**: postgres
- **Password**: Set in `.env` file

### Redis

- **Host**: localhost
- **Port**: 6379
- **Purpose**: URL caching and rate limiting

### Admin Tools

- **pgWeb**: Web-based PostgreSQL admin at http://localhost:8085
- **Redis Commander**: Redis admin at http://localhost:8081
- **Prisma Studio**: Database GUI at http://localhost:5555

## 🔧 Environment Variables

Create a `.env` file based on `env.template`:

```env
# Database Configuration
POSTGRES_DB=urlshortener
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your-database-password>
DATABASE_URL=postgresql://postgres:<your-database-password>@localhost:5435/urlshortener

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Redis Commander Configuration
REDIS_COMMANDER_USER=admin
REDIS_COMMANDER_PASSWORD=<your-redis-commander-password>

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 🐳 Docker Services

The `docker-compose.yml` includes:

- **PostgreSQL**: Database server
- **Redis**: Caching and session storage
- **pgWeb**: PostgreSQL web admin interface
- **Redis Commander**: Redis web admin interface

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Start specific services
docker-compose up postgres redis -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔒 Security

- **Environment variables**: Never commit `.env` files
- **Database passwords**: Use strong, unique passwords
- **Port mapping**: Services are exposed on non-standard ports
- **Network isolation**: Services communicate via Docker network

## 🚀 Production Deployment

For production, consider:

1. **Environment variables**: Use proper secrets management
2. **Database**: Use managed PostgreSQL service
3. **Redis**: Use managed Redis service
4. **HTTPS**: Set up SSL/TLS certificates
5. **Monitoring**: Add logging and monitoring
6. **Backup**: Set up database backups

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**

   ```bash
   # Check what's using the port
   lsof -i :3000
   # Kill the process or change port in .env
   ```

2. **Database connection failed:**

   ```bash
   # Check if databases are running
   docker-compose ps
   # Check database logs
   docker-compose logs postgres
   ```

3. **Prisma errors:**

   ```bash
   # Regenerate Prisma client
   npx prisma generate
   # Push schema changes
   npx prisma db push
   ```

4. **Permission denied on scripts:**
   ```bash
   chmod +x start.sh stop.sh
   ```

### Getting Help

- Check Docker logs: `docker-compose logs`
- Check app logs: Look for errors in terminal
- Verify environment: Ensure `.env` file exists and is correct
- Test database connection: Use pgWeb or Prisma Studio

## 📝 License

This project is licensed under the ISC License.
