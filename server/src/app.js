const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const apiRouter = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// --------------- Middleware ---------------
app.use(
  helmet({
    contentSecurityPolicy: isProd
      ? {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:'],
          },
        }
      : false,
  })
);
app.use(
  cors({
    origin: isProd
      ? process.env.CLIENT_ORIGIN || true // true = reflect request origin
      : 'http://localhost:5173',
  })
);
app.use(morgan(isProd ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------
app.use('/api', apiRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Static files (production) ---------------
if (isProd) {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));

  // SPA fallback — only for non-API routes
  app.get(/^(?!\/api\/)(?!\/health).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// --------------- Error handling ---------------
app.use(errorHandler);

module.exports = app;
