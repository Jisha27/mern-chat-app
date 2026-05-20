import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
export function getRecieverSocketId  (userId) {
return userSocketMap[userId]
}
//used to store online users
const userSocketMap = {};

// User opens app  → connection event runs
// User leaves app → disconnect event runs
io.on("connection", (socket) => {
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id
//this is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
    
})

export { io, app, server };

// This code adds real-time communication to your chat app using Socket.IO.

// Normally with Express alone:

// user sends message
// message saves in database
// other user must refresh to see it

// With Socket.IO:

// message appears instantly for both users
// no refresh needed

// Simple flow:

// Frontend ↔ Socket.IO Server ↔ Backend

// Explanation:

// const app = express();

// Creates normal Express backend.

// const server = http.createServer(app);

// Creates actual HTTP server from Express.

// Socket.IO needs this server to work.

// const io = new Server(server)

// Attaches Socket.IO to the server.

// Now backend can send and receive live events/messages.

// cors: {
//   origin: ["http://localhost:5173"],
// }

// Allows your React frontend to connect to socket server.

// export { io, app, server };

// Exports everything so other files can use them.

// Main purpose in chat app:

// ✅ instant messages
// ✅ online/offline status
// ✅ typing indicators
// ✅ live updates without refresh
