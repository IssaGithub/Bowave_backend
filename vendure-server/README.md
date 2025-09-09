# Vendure Backend

## Deployment Setup

### GitHub Secrets Required

Die folgenden Secrets müssen in den GitHub Repository-Einstellungen gesetzt werden:

- `VPS_HOST`: IP-Adresse oder Hostname des VPS
- `VPS_USER`: SSH Benutzername für den VPS
- `VPS_SSH_PRIVATE_KEY`: SSH Private Key für die Authentifizierung
- `VENDURE_ADMIN_USER`: Superadmin Benutzername für Vendure
- `VENDURE_ADMIN_PASSWORD`: Superadmin Passwort für Vendure
- `COOKIE_SECRET`: Secret Key für Cookie-Verschlüsselung

### Umgebungsvariablen

Das Deployment-Skript erstellt eine `.env` Datei mit folgenden Variablen:

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

### Deployment-Prozess

1. Push auf `master` oder `main` Branch
2. GitHub Actions wird:
   - Das Projekt bauen
   - Dateien auf den VPS kopieren
   - Umgebungsvariablen erstellen/aktualisieren
   - Mit Docker Compose deployen

### URLs nach dem Deployment

- Shop API: `http://[VPS_IP]/shop-api`
- Admin API: `http://[VPS_IP]/admin-api`
- Admin UI: `http://[VPS_IP]/admin`
