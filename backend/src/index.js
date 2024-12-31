import express from 'express';

import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import cors from 'cors';

import { app, server } from './lib/socket.js';

// import socketIO from 'socket.io';
// import mongoose from 'mongoose';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import path from 'path';

dotenv.config();

// const allowedOrigins = [
//   'http://localhost:3000', // For local development
//   'https://chat-me-full-stack-app.vercel.app', // Deployed frontend
// ];

const __dirname = path.resolve();

app.use(cookieParser()); // for parsing cookies, to be able to access the token from req.cookies and see the encoded user data which was stored in token

app.use(express.json()); // for parsing application/json -> req.body

app.use(
  cors(
    {
      origin: [
        'http://localhost:3000',
        'https://chat-me-full-stack-app.vercel.app',
      ], // Allow requests from the frontend
      credentials: true,
    }

    // {
    //   origin: (origin, callback) => {
    //     // Allow requests with no origin (e.g., mobile apps or curl)
    //     if (!origin || allowedOrigins.includes(origin)) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error('Not allowed by CORS'));
    //     }
    //   },
    //   credentials: true,
    // }
  )
); //TODO: ask gpt what it does: credentials: true

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

// const serverConnection = (req, res) => {
//   res.send('Hello World!');
//   connectDB();
//   app(req, res);
// };

// export default serverConnection;

// if (process.env.NODE_ENV === 'production') {
// app.use(express.static(path.join(__dirname, '../frontend/.next')));

// app.get('*', (req, res) => {
//   res.sendFile(
//     path.join(__dirname, '../frontend', '.next/server/app', 'index.html')
//   );
// });
// }

const dev = process.env.NODE_ENV !== 'production';
const appInit = next({ dev }); // This initializes the Next.js app
const handle = app.getRequestHandler(); // This is Next.js's request handler

appInit.prepare().then(() => {
  const server = express();

  // Custom routes (optional)
  server.get('/custom-route', (req, res) => {
    return appInit.render(req, res, '/custom-page', req.query);
  });

  // Default catch-all handler to let Next.js handle all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});

const PORT = process.env.PORT || 5002;

server.listen(PORT || 5002, () => {
  console.log('Server is running on port:', PORT);
  connectDB();
});
