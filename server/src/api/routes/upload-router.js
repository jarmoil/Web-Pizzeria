import express from 'express';
import upload from '../middleware/upload-middleware.js';

const router = express.Router();

// Single file upload
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Multiple file upload
router.post('/uploads', upload.array('images', 5), (req, res) => {
  try {
    res.status(200).json({
      message: 'Files uploaded successfully',
      files: req.files
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
