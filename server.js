/**
 * Portfolio — Express serves the frontend (public/) and exposes a small API.
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`\n  Portfolio running at http://localhost:${PORT}\n  API health: http://localhost:${PORT}/api/health\n`);
});
