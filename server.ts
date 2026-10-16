import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const distPath = path.resolve('dist');

app.use(express.json());

// Healthcheck endpoint for Cloud Run deployment probes
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from built dist directory
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback for all routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(503).send('Application bundle not found. Please run `npm run build` first.');
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
