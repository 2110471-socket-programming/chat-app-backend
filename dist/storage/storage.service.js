'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteSingleFile = exports.uploadSingleFile = void 0;
const storage_upload_1 = require('./storage.upload');
const uploadSingleFile = (req, res) => {
  // Extract file URLs from uploaded files
  const fileKey = req.file.key;
  res.status(200).json({ fileKey: fileKey });
};
exports.uploadSingleFile = uploadSingleFile;
const deleteSingleFile = async (req, res) => {
  try {
    const key = req.params.key;
    await (0, storage_upload_1.deleteFile)(key);
    res.status(200).json({
      message: 'File deleted successfully',
      deletedKey: key,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete file',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
exports.deleteSingleFile = deleteSingleFile;
