
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('join', (params, callback) => {
    if (! isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    } else{
      var room = params.room;
      socket.join(room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, room);
      msg = `${params.name} has entered the room.`;
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));
      io.to(room).emit('updateActiveUsers', users.getUserList(room));
      socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', msg));
      callback();
    }
  });

  socket.on('createMessage', (message, acknowledge) => {
      user = users.getUser(socket.id);
      if (user) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        acknowledge();
      } else {
        console.error();
      }
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    user = users.removeUser(socket.id);
    if (user) {
      var msg = `${user.name} has left the building.`;
      io.to(user.room).emit('newMessage', generateMessage('Admin', msg));
      io.to(user.room).emit('updateActiveUsers', users.getUserList(user.room));
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
