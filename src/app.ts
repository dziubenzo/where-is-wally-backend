import compression from 'compression';
import cors from 'cors';
import 'dotenv/config.js';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import './config/mongoDB';

// Route imports
import indexRouter from './routes/index';
import levelRouter from './routes/level';
import playerRouter from './routes/player';

// CORS options - allowed site(s)
const corsOptions = {
  origin: 'https://dziubenzo-where-is-wally.netlify.app',
};

const app = express();
app.use(cors(corsOptions));

// Rate limiter: maximum of forty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  validate: { xForwardedForHeader: false },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(limiter);

// Routes
app.use('/', indexRouter);
app.use('/levels', levelRouter);
app.use('/players', playerRouter);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: `ERROR: ${err.message}`,
  });
  return;
});

// Server listener
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});
