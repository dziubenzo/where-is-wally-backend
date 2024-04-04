const express = require('express');
require('dotenv').config();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

// Route imports
const indexRouter = require('./routes/index');

const app = express();

// MongoDB connection
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
}

// Rate limiter: maximum of forty requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
});

// CORS options - allowed site(s)
const corsOptions = {
  origin: '',
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(compression());
app.use(helmet());
app.use(limiter);

// Routes
app.use('/', indexRouter);

// Error handler
app.use((err, req, res, next) => {
  return res.status(500).json({
    message: `ERROR: ${err.message}`,
  });
});

// Server listener
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}...`);
});