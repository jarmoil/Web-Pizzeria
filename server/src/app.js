import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './api/index.js';
import uploadRoutes from './api/routes/upload-router.js';
import errorHandler from './api/middleware/error-middleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/api/v1', api);

// Middleware to serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));

// Register upload routes
app.use('/api/v1', uploadRoutes);

app.use(errorHandler);

export default app;
