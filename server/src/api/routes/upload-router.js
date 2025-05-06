import express from 'express';
import upload from '../middleware/upload-middleware.js';

const router = express.Router();

/**
 * @api {post} /upload Upload single image
 * @apiName UploadImage
 * @apiGroup Upload
 * @apiDescription Currently not implemented for users or menu.
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeader {String} Content-Type multipart/form-data
 *
 * @apiBody {File} image Image file to upload (jpeg|jpg|png|gif, max 5MB)
 *
 * @apiSuccess {Object} response Upload result
 * @apiSuccess {String} response.message Success message
 * @apiSuccess {Object} response.file Uploaded files info
 *
 * @apiError {Object} 400 Invalid file type
 * @apiError {Object} 413 File too large (>5MB)
 * @apiError {Object} 500 Upload failed
 */
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

/**
 * @api {post} /uploads Upload multiple images
 * @apiName UploadMultipleImages
 * @apiGroup Upload
 * @apiDescription Currently not implemented for users or menu.
 *
 * @apiHeader {String} Authorization Bearer token
 * @apiHeader {String} Content-Type multipart/form-data
 *
 * @apiBody {File[]} images Array of image files (max 5 files, jpeg|jpg|png|gif, each max 5MB)
 *
 * @apiSuccess {Object} response Upload result
 * @apiSuccess {String} response.message Success message
 * @apiSuccess {Object[]} response.files Array of uploaded files info
 *
 * @apiError {Object} 400 Invalid file type
 * @apiError {Object} 413 Files too large
 * @apiError {Object} 500 Upload failed
 */
router.post('/uploads', upload.array('images', 5), (req, res) => {
  try {
    res.status(200).json({
      message: 'Files uploaded successfully',
      files: req.files,
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

export default router;
