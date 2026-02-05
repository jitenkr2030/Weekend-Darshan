# 🚀 Deployment Guide

This guide covers various deployment options for the WeekendDarshan platform.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository cloned
- Environment variables configured
- Database set up

## 🌐 Vercel Deployment (Recommended)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

### 4. Configure Environment Variables
In Vercel dashboard, add these environment variables:
```
DATABASE_URL=your-production-database-url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

### 5. Deploy to Production
```bash
vercel --prod
```

## 🐳 Docker Deployment

### 1. Build Docker Image
```bash
docker build -t weekend-darshan .
```

### 2. Run Container
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./prod.db" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  weekend-darshan
```

### 3. With Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=file:./prod.db
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret-key
    volumes:
      - ./data:/app/data
```

Run:
```bash
docker-compose up -d
```

## 🖥️ Traditional Server Deployment

### 1. Build for Production
```bash
bun run build
```

### 2. Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### 3. Start with PM2
```bash
pm2 start npm --name "weekend-darshan" -- start
```

### 4. Setup PM2 to Start on Boot
```bash
pm2 startup
pm2 save
```

## 🔧 Environment Setup

### Production Environment Variables
Create `.env.production`:
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-very-secure-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

### Database Setup
```bash
# For production, consider PostgreSQL
# Update DATABASE_URL accordingly
# Example: postgresql://user:password@localhost:5432/weekend_darshan

# Push schema to production database
bun run db:push

# Seed data if needed
bun run seed.ts
```

## 🌍 Nginx Configuration (Optional)

For custom domains and SSL:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Monitoring

### Health Check Endpoint
The application includes a health check at `/api/health`

### PM2 Monitoring
```bash
pm2 monit
```

### Logs
```bash
pm2 logs weekend-darshan
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database**: Use strong passwords for production databases
3. **HTTPS**: Always use SSL in production
4. **Dependencies**: Keep packages updated
5. **Rate Limiting**: Implement rate limiting for APIs
6. **CORS**: Configure CORS properly

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (18+)
   - Clear cache: `rm -rf .next`

2. **Database Connection**
   - Verify DATABASE_URL
   - Check database accessibility

3. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

4. **Port Conflicts**
   - Change port if 3000 is in use
   - Use `PORT=3001 bun start`

### Debug Mode
```bash
NODE_ENV=development bun run dev
```

## 📈 Performance Optimization

1. **Enable Caching**: Configure CDN
2. **Image Optimization**: Use Next.js Image component
3. **Code Splitting**: Automatic with Next.js
4. **Database Indexing**: Add indexes for frequent queries
5. **Monitor**: Use analytics to track performance

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: bun install
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
- Check GitHub Issues
- Contact: info@weekenddarshan.com
- Documentation: [README.md](./README.md)