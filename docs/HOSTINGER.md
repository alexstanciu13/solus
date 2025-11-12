# Solus E-commerce — Hostinger Deployment Guide

Complete guide for deploying the Solus e-commerce platform to Hostinger.

---

## Prerequisites

- Hostinger VPS or Cloud Hosting plan
- Domain name (optional for initial testing)
- SSH access to your server
- Git installed on server
- Node.js 20+ support

---

## Deployment Options

### Option A: Hostinger VPS/Cloud (Recommended)

Full control with Node.js runtime support.

### Option B: Hostinger Shared Hosting

Limited Node.js support - may require static export (not recommended for full e-commerce).

---

## Step-by-Step Deployment (VPS)

### 1. Connect to Your VPS

```bash
ssh root@your-server-ip
```

### 2. Install Node.js

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### 3. Install PM2 Process Manager

```bash
sudo npm install -g pm2
```

### 4. Install PostgreSQL (Production Database)

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

In PostgreSQL console:

```sql
CREATE DATABASE solus_production;
CREATE USER solusadmin WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE solus_production TO solusadmin;
\q
```

### 5. Clone Repository

```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/your-username/solus.git
cd solus/solus-ecommerce

# Or pull specific branch
git clone -b main https://github.com/your-username/solus.git
```

### 6. Install Dependencies

```bash
npm ci --production
```

### 7. Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit environment file
nano .env
```

**Production `.env` configuration:**

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://solusadmin:your-secure-password@localhost:5432/solus_production"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-secure-random-string-min-32-chars"

# Stripe (Live Keys - replace test keys)
STRIPE_SECRET_KEY="sk_live_your_live_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_live_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Resend (Email)
RESEND_API_KEY="re_your_resend_api_key"
RESEND_FROM_EMAIL="comenzi@yourdomain.com"

# App
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

**Generate secure secret:**

```bash
openssl rand -base64 32
```

### 8. Update Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional - for demo data)
npm run db:seed
```

### 9. Build Application

```bash
npm run build
```

### 10. Start with PM2

```bash
# Start application
pm2 start npm --name "solus-ecommerce" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup

# Check status
pm2 status
pm2 logs solus-ecommerce
```

### 11. Configure Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt-get install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/solus
```

**Nginx configuration (`/etc/nginx/sites-available/solus`):**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be configured with Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Next.js reverse proxy
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

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Public files
    location /public {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

**Enable site:**

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/solus /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 12. Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 13. Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

### 14. Set Up Stripe Webhooks

1. Log in to Stripe Dashboard
2. Go to **Developers** → **Webhooks**
3. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy webhook signing secret to `.env`

### 15. Test Deployment

```bash
# Check if site is running
curl https://yourdomain.com

# Check PM2 logs
pm2 logs solus-ecommerce

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

---

## PM2 Configuration File

Create `ecosystem.config.js` in project root:

```javascript
module.exports = {
  apps: [
    {
      name: 'solus-ecommerce',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/solus/solus-ecommerce',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
}
```

**Start with config:**

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## Continuous Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/solus/solus-ecommerce
            git pull origin main
            npm ci --production
            npx prisma generate
            npx prisma migrate deploy
            npm run build
            pm2 restart solus-ecommerce
```

**Required GitHub Secrets:**

- `HOSTINGER_HOST` - Your server IP
- `HOSTINGER_USER` - SSH username (usually `root`)
- `SSH_PRIVATE_KEY` - Your SSH private key

---

## Maintenance Commands

### Update Application

```bash
cd /var/www/solus/solus-ecommerce
git pull origin main
npm ci --production
npm run build
pm2 restart solus-ecommerce
```

### Database Migrations

```bash
npx prisma migrate deploy
```

### View Logs

```bash
# PM2 logs
pm2 logs solus-ecommerce

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Backup Database

```bash
# Create backup
pg_dump -U solusadmin -d solus_production > backup_$(date +%Y%m%d).sql

# Restore backup
psql -U solusadmin -d solus_production < backup_20250101.sql
```

### Monitor Resources

```bash
# Server resources
htop

# PM2 monitoring
pm2 monit

# Disk usage
df -h
```

---

## Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs solus-ecommerce --err

# Restart application
pm2 restart solus-ecommerce

# Check environment variables
pm2 env solus-ecommerce
```

### Database connection errors

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Test connection
psql -U solusadmin -d solus_production -h localhost
```

### Nginx errors

```bash
# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Check logs
sudo tail -f /var/log/nginx/error.log
```

### SSL certificate issues

```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

---

## Performance Optimization

### Enable Nginx Gzip

Add to Nginx config:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
```

### Configure PM2 Cluster Mode

Update `ecosystem.config.js`:

```javascript
instances: 'max',  // Use all CPU cores
exec_mode: 'cluster',
```

### Database Connection Pooling

Already configured in Prisma. Adjust if needed in `lib/prisma.ts`.

---

## Security Checklist

- ✅ SSL certificate installed
- ✅ Firewall configured
- ✅ Secure environment variables
- ✅ Database credentials protected
- ✅ Nginx security headers
- ✅ Regular backups scheduled
- ✅ PM2 logs rotation enabled
- ✅ Stripe webhooks validated
- ✅ Rate limiting (add if needed)
- ✅ CSRF protection (Next.js built-in)

---

## Support

For Hostinger-specific issues:
- Hostinger Support: https://www.hostinger.com/support
- Knowledge Base: https://support.hostinger.com

For application issues:
- Check logs: `pm2 logs solus-ecommerce`
- GitHub Issues: [repository-url]

---

**Made with ❤️ for Solus**
