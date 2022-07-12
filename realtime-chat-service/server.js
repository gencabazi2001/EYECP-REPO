const path = require('path');
require("dotenv").config();
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//Static folder

// app.use(express.static(path.join(__dirname, 'public')));
const botName = 'EYEC Bot';
//run when client connects

io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id ,username, room);
        socket.join(user.room);
        //single client
        socket.emit('message', formatMessage(botName,'Welcome to EyeCForum!'));

        //all but the user 
        socket.broadcast.to(user.room).emit('message', formatMessage(botName,` User ${username} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //Listen for chatMessage
    socket.on('chatMessage', (msg, username) => {
        const user = getCurrentUser(username);
        
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message',formatMessage(botName,`User ${user.username} has left the chat`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));