
const path = require('path');
const http = require('http');
const express = require('express');
const url = require('url');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const sharedsession = require('express-socket.io-session');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const _ = require('lodash');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const session_secret = "as3i42h4hj42jho";

const publicPath = path.join(__dirname, '../public');
const users = new Users();

const session = require('express-session')({
  resave: true,
  saveUninitialized: true,
  secret: session_secret,
  cookie: { secure: false }
});

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.set('view engine', 'hbs');
app.use(session);
app.use(cookieParser(session_secret));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(publicPath, {
  index: false
}));

app.use((req, res, next) => {
  if (users.getUser(req.sessionID) && (req.url != '/chat')) {
    res.redirect('/chat');
  } else {
    next();
  }
});

io.use(sharedsession(session, cookieParser(session_secret), {
  autoSave: true
}));

app.get('/', (req, res) => {
  res.render('index.hbs', {
    rooms: users.allRooms()
  });
});

app.get('/chat', (req, res) => {
  user = users.getUser(req.sessionID);
  if (user) {
    res.render('chat.hbs', {
      room: user.room
    });
  } else {
    res.render('index.hbs', {
      errormessages: ['Session not found.']
    });
  }
});

app.post('/login', (req, res) => {
  body = req.body;
  if (users.userWithName(body.name.trim())) {
    res.render('index.hbs', {
      errormessages: ['Username already taken!'],
      rooms: users.allRooms()
    });
    return;
  } else {
    users.addUser(req.sessionID, body.name, body.room);
    res.redirect('/chat');
    return;
  };
});

app.all('*', (req, res) => {
  res.redirect('/');
});

io.use((socket, next) => {
  socket.handshake.sid = socket.handshake.signedCookies['connect.sid'];
  next();
});

io.on('connection', (socket) => {

  socket.on('join', () => {
    var user = users.getUser(socket.handshake.sid);
    if (user) {
      var room = user.room;
      socket.join(room);
      msg = `${user.name} has entered the room.`;
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat!'));
      io.to(room).emit('updateActiveUsers', users.getUserList(room));
      socket.to(room).broadcast.emit('newMessage', generateMessage('Admin', msg));
    } else {
    }
  });

  socket.on('createMessage', (message, acknowledge) => {
      user = users.getUser(socket.handshake.sid);
      if (!user) {
        acknowledge();
        socket.emit('redirect', '/');
      } else if (isRealString(message.text)) {
        acknowledge();
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      } else {
      }
  });

  socket.on('createLocationMessage', (coords) => {
    user = users.getUser(socket.handshake.sid);
    if (user) {
      io.emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var id = socket.handshake.sid;
    var user = users.getUser(id);
    if (user) {
      var room = user.room;
      users.removeUser(id);
      socket.to(room).emit('updateActiveUsers', users.getUserList(user.room));
      msg = `${user.name} has left the room.`;
      socket.to(room).emit('newMessage', generateMessage('Admin', msg));
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
