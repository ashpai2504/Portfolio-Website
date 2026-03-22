# Portfolio Website

Interactive portfolio — **Express backend** serves the **static frontend** from `public/`.

## Run frontend + backend together

```bash
npm install
npm start
```

Open **http://localhost:3000**

- **Site:** `/` — HTML/CSS/JS app  
- **API:** `GET /api/health` — JSON health check (used by the frontend to confirm the server)

### Development (auto-restart on file changes)

```bash
npm run dev
```

## Project layout

```
├── server.js          # Express: static files + /api/*
├── package.json
└── public/            # Frontend (served as-is)
    ├── index.html
    ├── styles.css
    ├── script.js
    ├── Images/
    └── Ashmit_Pai_Resume.pdf
```

## Environment

- `PORT` — optional, default `3000` (e.g. `PORT=8080 npm start`)

## Deploy

Any Node host (Railway, Render, Fly.io, etc.): set start command to `npm start` and ensure `PORT` is provided by the platform.
