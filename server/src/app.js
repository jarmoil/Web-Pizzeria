import express from 'express';
import dotenv from 'dotenv';
import api from './api/index.js';
import uploadRoutes from './api/routes/upload-router.js';

const hostname = '127.0.0.1';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);

// Middleware to serve static files (e.g., uploaded images)
app.use('/uploads', express.static('uploads'));

// Register upload routes
app.use('/api/v1', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://${hostname}:${PORT}`);
});

export default app;
