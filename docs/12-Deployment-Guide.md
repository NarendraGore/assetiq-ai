# Deployment Guide

## Project

**AssetIQ AI** – Deployment Guide

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Railway |
| Database | Supabase PostgreSQL |
| Storage | Cloudinary |
| AI | Google Gemini |
| CI/CD | GitHub Actions |

---

# 1. Deployment Architecture

```text
Users
  │
Vercel (Next.js)
  │ HTTPS
Railway (ASP.NET Core API)
  │
Supabase PostgreSQL

Cloudinary
Gemini API
```

# 2. Environments

| Environment | Purpose |
|---|---|
| Development | Local |
| Staging | Testing |
| Production | Live |

# 3. Prerequisites

- GitHub repository
- Vercel account
- Railway account
- Supabase project
- Cloudinary account
- Gemini API key

# 4. Environment Variables

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Backend

```env
ConnectionStrings__DefaultConnection=
Jwt__Key=
Jwt__Issuer=
Jwt__Audience=
Gemini__ApiKey=
Cloudinary__CloudName=
Cloudinary__ApiKey=
Cloudinary__ApiSecret=
```

# 5. Deploy Frontend

1. Push code to GitHub.
2. Import repository into Vercel.
3. Configure environment variables.
4. Deploy.

# 6. Deploy Backend

1. Create Railway project.
2. Connect GitHub repository.
3. Select ASP.NET Core service.
4. Add environment variables.
5. Deploy.

# 7. Database

- Create Supabase PostgreSQL project.
- Copy connection string.
- Configure backend.

Run migrations:

```bash
dotnet ef database update
```

# 8. Cloudinary

Configure Cloud Name, API Key and Secret in backend environment variables.

# 9. Gemini

Store API key securely on backend only.

# 10. GitHub Actions

Typical pipeline:

```text
Push
 │
Build
 │
Run Tests
 │
Publish
 │
Deploy
```

# 11. Health Checks

Endpoint:

```text
GET /health
```

Verify:
- API
- Database
- AI Provider

# 12. Logging

- Serilog
- Console
- File (optional)

# 13. Security Checklist

- HTTPS enabled
- JWT secrets stored securely
- Environment variables only
- CORS configured
- No secrets committed
- Production logging configured

# 14. Rollback

- Redeploy previous Git commit.
- Restore previous database backup if needed.

# 15. Production Checklist

- Database migrated
- Environment variables configured
- HTTPS verified
- Health endpoint passing
- AI working
- File uploads working

# 16. Troubleshooting

| Issue | Resolution |
|---|---|
| 500 Error | Check logs |
| DB connection failed | Verify connection string |
| JWT invalid | Verify keys |
| AI unavailable | Check Gemini key |
| Upload failed | Verify Cloudinary credentials |

# Summary

Deploy the frontend to Vercel, backend to Railway, PostgreSQL on Supabase, media on Cloudinary, and use GitHub Actions for CI/CD. Keep secrets in environment variables and verify health checks before every production release.
