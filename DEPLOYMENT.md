#  Deployment Guide

## Automated Deployment Files

This repository includes several files that automate the deployment process:

### Deployment Files

| File | Purpose |
|------|---------|
| `render.yaml` | Render.com deployment configuration |
| `build.sh` | Build script that runs during deployment |
| `start.sh` | Start script with optimized Gunicorn settings |
| `deploy.py` | Database initialization and setup automation |
| `wsgi.py` | WSGI entry point for production |
| `Dockerfile` | Docker containerization (optional) |
| `Procfile` | Process file for Heroku-style deployments |
| `runtime.txt` | Python version specification |
| `requirements.txt` | Python dependencies |

### 🔧 Automated Build Process

1. **Build Phase** (`build.sh`):
   - Upgrades pip to latest version
   - Installs all Python dependencies
   - Creates necessary directories

2. **Deployment Phase** (`deploy.py`):
   - Initializes database tables
   - Creates admin user if needed
   - Verifies environment variables

3. **Start Phase** (`start.sh`):
   - Sets up database
   - Starts Gunicorn with optimized settings
   - Configures logging and monitoring

### Render.com Deployment

#### Quick Deploy
1. Fork/clone this repository
2. Connect to Render.com
3. Create new Web Service
4. Select this repository
5. Render will automatically use `render.yaml` configuration

#### Manual Configuration
If not using `render.yaml`:
```
Build Command: ./build.sh
Start Command: ./start.sh
Environment: Python 3.10.12
```

###  Docker Deployment

```bash
# Build the image
docker build -t community-data-storage-hub .

# Run the container
docker run -p 8000:8000 \
  -e DATABASE_URL="your_database_url" \
  -e SECRET_KEY="your_secret_key" \
  community-data-storage-hub
```

### Health Checks

The application includes built-in health checks:
- **Health endpoint**: `GET /`
- **Debug endpoint**: `GET /debug`
- **API status**: Returns database counts and system info

### Database Setup

The deployment automatically:
-  Creates all database tables
-  Sets up relationships and indexes
-  Creates initial admin user (if database is empty)
-  Handles PostgreSQL URL conversion for SQLAlchemy

### Environment Variables

Required for production:
```
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
FLASK_ENV=production
```

### Monitoring

The application includes:
- Request logging via Gunicorn
- Error tracking and reporting
- Database connection monitoring
- Health check endpoints

### Troubleshooting

Common issues and solutions:

1. **Gunicorn not found**:
   - Ensure `requirements.txt` includes `gunicorn`
   - Use `python -m gunicorn` instead of direct `gunicorn`

2. **Database connection errors**:
   - Check `DATABASE_URL` format
   - Ensure PostgreSQL URL uses `postgresql://` not `postgres://`

3. **Import errors**:
   - Verify all dependencies in `requirements.txt`
   - Check Python path configuration

### Performance Optimization

The deployment includes:
- Multi-worker Gunicorn setup
- Connection pooling
- Request timeout handling
- Memory optimization
- Static file serving

### Auto-deployment

Configured for automatic deployment on:
- Push to main branch
- Pull request merges
- Manual triggers via Render dashboard

---

## Ready to Deploy!

Your Flask API is now fully automated for deployment. Just push to your repository and let the automation handle the rest!
