import { Router } from 'express';
import upload from './storage.upload';
import { deleteSingleFile, uploadSingleFile } from './storage.service';

const storageRouter = Router();

storageRouter.post('/', upload.single('file'), uploadSingleFile);
storageRouter.delete('/:fileKey', deleteSingleFile);

export default storageRouter;
