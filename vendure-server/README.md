# Vendure Backend

## Deployment Setup

#### GitHub Secrets Required

The following secrets need to be set in your GitHub repository settings:

- `VPS_HOST`: Your VPS IP address or hostname
- `VPS_USER`: SSH username for the VPS
- `VPS_SSH_PRIVATE_KEY`: SSH private key for authentication
- `VENDURE_ADMIN_USER`: Superadmin username for Vendure
- `VENDURE_ADMIN_PASSWORD`: Superadmin password for Vendure
- `COOKIE_SECRET`: Secret key for cookie encryption

### Environment Variables

The deployment script will create a `.env` file with the following variables:

```env
APP_ENV=production
PORT=3000
DB_NAME=vendure
DB_SCHEMA=public
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=vendure
DB_PASSWORD=vendure
SUPERADMIN_USERNAME=[from secrets]
SUPERADMIN_PASSWORD=[from secrets]
COOKIE_SECRET=[from secrets]
```

### Deployment Process

1. Push to `master` or `main` branch
2. GitHub Actions will:
   - Build the project
   - Copy files to VPS
   - Create/update environment variables
   - Deploy using Docker Compose

### URLs After Deployment

- Shop API: `http://[VPS_IP]/shop-api`
- Admin API: `http://[VPS_IP]/admin-api`
- Admin UI: `http://[VPS_IP]/admin`
