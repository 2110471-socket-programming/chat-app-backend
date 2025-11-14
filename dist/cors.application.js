'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const cors_1 = __importDefault(require('cors'));
const config_1 = require('./config');
const corsApplication = (0, cors_1.default)({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin == config_1.clientUrl || origin == config_1.serverUrl) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
exports.default = corsApplication;
