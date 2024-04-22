import { Server } from 'socket.io';
import http from 'http';
import express from 'express'

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  }
})


const userSocketMap = {};

export const getUserSocketId = (username) => {
  return userSocketMap[username];
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);
  const username = socket.handshake.query.username;
  // console.log("userId" , userId);
  
  if(username != 'undefined') userSocketMap[username] = socket.id;
  console.log(userSocketMap);
  
  // Handle events here
  socket.on('hi', (data) => {
    console.log(data)
    socket.emit('Welcome', 'Welcome from scoket')
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected", socket.id);
    delete userSocketMap[username]
  })

});

export { app, io, server};