'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_application_1 = __importDefault(require('./cors.application'));
const config_1 = require('./config');
const user_routes_1 = __importDefault(require('./user/user.routes'));
const chat_routes_1 = __importDefault(require('./chat/chat.routes'));
const auth_routes_1 = __importDefault(require('./auth/auth.routes'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const mongoose_1 = __importDefault(require('mongoose'));
const socket_application_1 = __importDefault(
  require('./socket/socket.application'),
);
const storage_routes_1 = __importDefault(require('./storage/storage.routes'));
const group_routes_1 = __importDefault(require('./group/group.routes'));
const { app, server } = socket_application_1.default.getInstance();
(async () => {
  mongoose_1.default.set('strictQuery', true);
  await mongoose_1.default.connect(config_1.mongoUri);
  console.log('Connected to MongoDB');
})();
app.use((0, cookie_parser_1.default)());
app.use(cors_application_1.default);
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
app.use('/api/chats', chat_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/storage', storage_routes_1.default);
app.use('/api/groups', group_routes_1.default);
server.listen(config_1.PORT, () => {
  console.log(
    `Server started on port ${config_1.PORT} in ${config_1.NODE_ENV} mode`,
  );
});
