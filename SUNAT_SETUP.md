# SUNAT private lookup module — deployment

Branch: `feature/sunat-private-panel`

## Features
- Private page at `/admin/sunat`
- Password is configured only as a Render secret (`SUNAT_PANEL_PASSWORD`)
- Signed, HttpOnly, SameSite=Strict session cookie (8-hour expiry)
- RUC input validation and server-side request to Endpoint.pe
- Provider token is server-only (`SUNAT_API_TOKEN`); never expose it to client code
- HMAC session key: `SUNAT_SESSION_SECRET` (minimum 32 characters)

## Render configuration required
The current CodexDigital Render service is a **Static Site**. Next.js API routes and secure server sessions cannot run on a static export. This branch removes static export and must be deployed as a **Web Service** after reviewing the service conversion.

Suggested Web Service settings:
- Repository: `jailchazev/CodexDigital`
- Branch: `feature/sunat-private-panel`
- Build command: `bun install && bun run build`
- Start command: `bun run start`
- Environment: `NODE_VERSION=20` (or supported current Node runtime)

Set these environment variables in Render's secret environment configuration:
- `SUNAT_PANEL_PASSWORD`: strong, unique access password
- `SUNAT_SESSION_SECRET`: random secret of 32+ characters
- `SUNAT_API_TOKEN`: API token obtained from Endpoint.pe

## Data source / current limitation
This initial implementation queries Endpoint.pe's RUC endpoint, which serves SUNAT-derived information. It is **not a direct SUNAT-issued API credential**. Provider terms, plan limits, and permitted use must be reviewed before production. The official SUNAT RUC padron is also published through Peru's Open Data portal and can be ingested later for an independently hosted searchable index.

## Production hardening before public launch
- Add persistent rate limiting (e.g. Redis/managed KV) to login and lookup endpoints.
- Add admin user management / MFA rather than a shared password.
- Add request audit records without storing unnecessary personal data.
- Confirm provider terms, data freshness, and privacy obligations.
- Review and secure the existing `/admin` offer-management login separately; this SUNAT area does not rely on its browser localStorage flag.
