const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/searchRoutes');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/search', userRoutes);


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('new-destination', (data) => {
    socket.broadcast.emit('destination-updated', data); // Send to all others
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(5000, () => {
      console.log("Server (with Socket.IO) running on port 5000");
    });
  })
  .catch(error => console.log(error));
