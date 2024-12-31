import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL, //front end url
  },
});

const onlineUsersSocketMap = {}; //{userId: sockedId}

io.on('connection', (socket) => {
  // socket- is an object with methods which works with the user that connected
  console.log('🚀 ~ A user connected', socket.id);

  const userId = socket.handshake.query.userId; //get the user id from the query on frontend passed in the io(backend_base_url,{query : {userId} }) connection

  // ONLINE USERS OBJECT
  if (userId) {
    onlineUsersSocketMap[userId] = socket.id; //save the socket id in the map with the user id as key

    io.emit('onlineUsers', Object.keys(onlineUsersSocketMap)); //is used to send events to all connected clients (brodcast)
  }

  socket.on('disconnect', () => {
    console.log('🚀 ~ A user disconnected:', userId);

    delete onlineUsersSocketMap[userId]; //delete the user id from the map

    io.emit('onlineUsers', Object.keys(onlineUsersSocketMap)); //is used to send events to all connected clients (brodcast)
  });
});

export function getReceiverSucketId(userId) {
  return onlineUsersSocketMap[userId];
}

export { io, app, server };
