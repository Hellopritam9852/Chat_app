//node server which will handle socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
})
const users = {};

io.on('connection', socket => {
    //It any new user joined ,let other users connected to the server know
    socket.on('new-user-joined', name => {
        //console.log("New user", name)

        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //It someone send  a message , broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    //If someone leaves the chat,Let other know
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})