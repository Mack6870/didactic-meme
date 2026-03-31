# Hintle

Full-stack web application — React + Vite frontend, Express REST API backend.

## Project Structure

```
├── client/            # React frontend (Vite, HMR)
│   └── src/
│       ├── components/
│       ├── hooks/        useApi and custom hooks
│       ├── pages/        Route-level page components
│       └── services/     API client helpers
├── server/            # Express backend
│   └── src/
│       ├── config/       App & DB configuration
│       ├── controllers/  Request handlers
│       ├── middleware/    Express middleware
│       ├── models/       Data models / schemas
│       ├── routes/       Route definitions
│       └── services/     Business logic & AWS helpers
├── package.json       # Root scripts (runs both)
└── .gitignore
```

## Getting Started

```bash
# Install everything (root + client + server)
npm run install:all

# Start both frontend and backend in dev mode (hot-reload)
npm run dev
```

| Script | Description |
|---|---|
| `npm run dev` | Runs client (Vite :5173) + server (Express :3001) concurrently |
| `npm run dev:client` | Vite dev server only |
| `npm run dev:server` | Express via nodemon only |
| `npm run build` | Production build of the React client |
| `npm start` | Start the server in production mode |
| `npm run clean` | Remove build artifacts and caches |

## API

All routes are prefixed with `/api`. Vite proxies `/api` and `/health` to the Express server during development.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server health check |
| GET | `/api` | API root / version |
| GET | `/api/examples` | List all example items |
| GET | `/api/examples/:id` | Get single item |
| POST | `/api/examples` | Create item |
| PUT | `/api/examples/:id` | Update item |
| DELETE | `/api/examples/:id` | Delete item |

## AWS & Database Integration

Stubs are provided in:
- `server/src/config/db.js` — MongoDB, PostgreSQL, or DynamoDB connection boilerplate
- `server/src/services/aws.service.js` — S3, Lambda invocation helpers
- `server/.env.example` — All available environment variables

Uncomment the relevant sections and install the needed packages (e.g. `mongoose`, `pg`, `@aws-sdk/client-s3`).
Silly repo for a quick passion project
