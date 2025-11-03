import cors from 'cors';
import { clientUrl, serverUrl } from './config';

const corsApplication = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin == clientUrl || origin == serverUrl) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

export default corsApplication;
