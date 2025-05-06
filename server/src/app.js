import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import api from './api/index.js';
import uploadRoutes from './api/routes/upload-router.js';
import errorHandler from './api/middleware/error-middleware.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use('/api/v1', api);

// Middleware to serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/docs', express.static(path.join(rootDir, 'docs')));
app.use('/api/v1/jsdocs', express.static(path.join(rootDir, 'jsdoc')));

// Register upload routes
app.use('/api/v1', uploadRoutes);

app.use(errorHandler);

export default app;
