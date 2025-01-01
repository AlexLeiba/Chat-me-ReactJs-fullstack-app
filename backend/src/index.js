import express from 'express';

import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import cors from 'cors';

import { app, server } from './lib/socket.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

app.use(cookieParser()); // for parsing cookies, to be able to access the token from req.cookies and see the encoded user data which was stored in token

app.use(express.json()); // for parsing application/json -> req.body

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from the frontend origin
    credentials: true,
  })
);

app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5002;

server.listen(PORT || 5002, () => {
  console.log('Server is running on port:', PORT);
  connectDB();
});
