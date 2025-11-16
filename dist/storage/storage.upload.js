'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteFile = void 0;
const client_s3_1 = require('@aws-sdk/client-s3');
const config_1 = require('../config');
const multer_1 = __importDefault(require('multer'));
const multer_s3_1 = __importDefault(require('multer-s3'));
const s3Client = new client_s3_1.S3({
  forcePathStyle: false,
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  region: 'ap-southeast-1',
  credentials: {
    accessKeyId: config_1.spaceKey,
    secretAccessKey: config_1.spaceSecret,
  },
});
const fileFilter = (req, file, cb) => {
  const validFileType = ['image/jpeg', 'image/png'];
  if (validFileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
const storage = (0, multer_s3_1.default)({
  s3: s3Client,
  bucket: 'baan-saat',
  acl: 'public-read',
  contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `chat-app/${prefix}-${file.originalname}`);
  },
});
const deleteFile = async (key) => {
  const deleteCommand = new client_s3_1.DeleteObjectCommand({
    Bucket: 'baan-saat',
    Key: key,
  });
  await s3Client.send(deleteCommand);
};
exports.deleteFile = deleteFile;
exports.default = (0, multer_1.default)({ storage, fileFilter });
