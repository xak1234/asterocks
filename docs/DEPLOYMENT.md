# Deployment Guide

## Quick Start Deployment

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Git (for cloning)

### Local Development

1. **Clone and install:**
   ```bash
   git clone <repository>
   cd asterocks
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run the server:**
   ```bash
   npm start
   ```
   
   Visit `http://localhost:3000` in your browser.

## Production Deployment

### Render.com (Recommended)

1. **Connect repository** to Render
2. **Set build command:** `npm install`
3. **Set start command:** `node server/server.js`
4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=3000
   ALLOWED_ORIGINS=yourdomain.com,www.yourdomain.com
   REFRESH_INTERVAL_HOURS=6
   ```

5. **Deploy** - Render automatically builds and deploys

### Heroku

1. **Create app:**
   ```bash
   heroku create asterocks-app
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set ALLOWED_ORIGINS=asterocks-app.herokuapp.com
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

### AWS/DigitalOcean/Other VPS

1. **SSH into server**
2. **Install Node.js 20:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Clone repository:**
   ```bash
   git clone <repo> asterocks
   cd asterocks
   npm install --production
   ```

4. **Create .env file:**
   ```bash
   cp .env.example .env
   nano .env  # Edit configuration
   ```

5. **Install process manager (PM2):**
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name "asterocks"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

7. **Enable HTTPS (Let's Encrypt):**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server/server.js"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  asterocks:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      PORT: 3000
      ALLOWED_ORIGINS: localhost:3000
      REFRESH_INTERVAL_HOURS: 6
```

Deploy:
```bash
docker-compose up -d
```

## Performance Optimization

### Enable Caching
```javascript
// In server.js
app.use(express.static('public', {
  maxAge: '1d',  // Cache static assets for 1 day
  etag: false    // Disable ETags for faster responses
}));
```

### Load Balancing
For high-traffic deployments, use:
- **Nginx** as reverse proxy
- **PM2 Cluster mode** for multi-core Node.js
- **Redis** for session/cache management

### Monitoring
Set up monitoring for:
- Server uptime
- Response times
- Error rates
- Memory usage
- CPU usage

Tools:
- **PM2 Plus** - Process monitoring
- **New Relic** - Application monitoring
- **Sentry** - Error tracking
- **DataDog** - Infrastructure monitoring

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=8000 npm start
```

### WebSocket Connection Fails
- Ensure CORS origins include your domain
- Check firewall allows WebSocket connections
- Verify reverse proxy forwards upgrade headers

### Memory Leaks
- Use `node --max-old-space-size=2048` for more memory
- Monitor with `top` or PM2 dashboard
- Check for unclosed database connections

### High CPU Usage
- Profile with `node --prof`
- Check for infinite loops in game logic
- Monitor rate limiting effectiveness

## Security Checklist for Production

- [ ] HTTPS enabled with valid certificate
- [ ] `.env` file with production secrets (not in repo)
- [ ] `NODE_ENV=production` set
- [ ] `ALLOWED_ORIGINS` configured correctly
- [ ] Rate limiting enabled
- [ ] Error logging configured
- [ ] Security headers verified
- [ ] CORS properly restricted
- [ ] Dependencies audited (`npm audit`)
- [ ] Regular backups enabled
- [ ] Monitoring and alerts configured
- [ ] DDoS protection enabled (optional)
- [ ] Web Application Firewall (WAF) enabled (optional)

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update specific package
npm update express

# Update all packages
npm update
```

## Backup & Recovery

### Backup Strategy
- Git repository as primary backup
- Database backups (if added)
- Configuration backups (.env files)

### Recovery Process
1. Restore `.env` configuration
2. `npm install --production`
3. Start server with PM2 or Docker
4. Verify health checks pass

## Scaling Strategy

### Vertical Scaling (Single Server)
1. Increase server memory/CPU
2. Use PM2 cluster mode
3. Optimize database queries
4. Enable caching

### Horizontal Scaling (Multiple Servers)
1. Use load balancer (Nginx, HAProxy)
2. Shared session store (Redis)
3. WebSocket sticky sessions
4. Centralized logging

## Support

For deployment issues:
1. Check logs: `pm2 logs asterocks`
2. Verify environment variables
3. Test endpoints: `curl http://localhost:3000/api/test`
4. Check network connectivity
