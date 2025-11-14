'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const http_1 = __importDefault(require('http'));
const socket_io_1 = require('socket.io');
const config_1 = require('../config');
const socket_event_1 = __importDefault(require('./socket.event'));
class SocketApplication {
  constructor() {
    this.app = (0, express_1.default)();
    this.server = http_1.default.createServer(this.app);
    this.io = new socket_io_1.Server(this.server, {
      cors: {
        origin: config_1.clientUrl,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });
    (0, socket_event_1.default)(this.io);
  }
  static getInstance() {
    if (!SocketApplication.instance) {
      SocketApplication.instance = new SocketApplication();
    }
    return SocketApplication.instance;
  }
}
exports.default = SocketApplication;
