/**
 * Portfolio — Express serves the frontend (public/) and exposes a small API.
 */
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const preferredPort = parseInt(process.env.PORT, 10) || 3000;
const maxPortTry = preferredPort + 25;

app.use(express.json());

// —— API (backend) ——
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'portfolio-api',
    time: new Date().toISOString()
  });
});

// —— Frontend (static) ——
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir, { index: 'index.html' }));

// SPA-style fallback: unknown routes → index.html (optional)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(publicDir, 'index.html'));
});

function listen(port) {
  const server = http.createServer(app);
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n  Portfolio running at ${url}\n  API health: ${url}/api/health\n`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < maxPortTry) {
      console.warn(`  Port ${port} is already in use, trying ${port + 1}…`);
      listen(port + 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

listen(preferredPort);
