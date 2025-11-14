import { Request, Response } from 'express';
import { deleteFile } from './storage.upload';

export const uploadSingleFile = (req: Request, res: Response) => {
  // Extract file URLs from uploaded files
  const fileKey = (req.file as Express.MulterS3.File).key;

  res.status(200).json({ fileKey: fileKey });
};

export const deleteSingleFile = async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    await deleteFile(key);

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
