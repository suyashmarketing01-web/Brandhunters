import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { contactRouter } from './routes/contact.js';
import { authRouter } from './routes/auth.js';
import { clientRouter } from './routes/clients.js';
import { postRouter } from './routes/posts.js';
import { suggestionRouter } from './routes/suggestions.js';
import { uploadRouter } from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://brandhunters.vercel.app',
  'https://brandhunters-dtqexhhox-suyashmarketing01-webs-projects.vercel.app',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Brand Hunters API',
  });
});

// Routes
app.use('/api', contactRouter);
app.use('/api', authRouter);
app.use('/api', clientRouter);
app.use('/api', postRouter);
app.use('/api', suggestionRouter);
app.use('/api', uploadRouter);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Brand Hunters Backend Server`);
  console.log(`   ➜ Local:      http://localhost:${PORT}`);
  console.log(`   ➜ Health:     http://localhost:${PORT}/api/health`);
  console.log(`   ➜ API:        http://localhost:${PORT}/api/contact`);
  console.log(`   ➜ Admin Auth: http://localhost:${PORT}/api/auth/admin/login`);
  console.log(`   ➜ Client Auth:http://localhost:${PORT}/api/auth/client/login\n`);
});

export default app;
