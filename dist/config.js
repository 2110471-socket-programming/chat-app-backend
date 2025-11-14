'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.spaceSecret =
  exports.spaceKey =
  exports.mongoUri =
  exports.JWT_SECRET =
  exports.serverUrl =
  exports.clientUrl =
  exports.NODE_ENV =
  exports.PORT =
    void 0;
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.NODE_ENV = process.env.NODE_ENV;
exports.clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
exports.serverUrl =
  process.env.SERVER_URL || `http://localhost:${exports.PORT}`;
exports.JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
exports.mongoUri =
  exports.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD || ''
    : process.env.MONGO_URI_DEV || '';
exports.spaceKey = process.env.SPACES_KEY || '';
exports.spaceSecret = process.env.SPACES_SECRET || '';
