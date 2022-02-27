const socket = io('http://localhost:8000')
    // Get DOm element in respective js variable
const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
    //Audio that will play on receiving message
var audio = new Audio('tune.wav');

//function which will append  event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}



//ask new user for his/her new name and let the server know
const name = prompt("Enter your name to join")
socket.emit('new-user-joined', name);

//It a new user joins,Receive his/her name from the server
socket.on('user-joined', name => {
    append(`${name}: joined the Chat`, `right`)
})

//If server sends a message receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, `left`)
})

//It a user leaves the chat, append the info to the container
socket.on('leave', name => {
    append(`${name}: Left the Chat`, `left`)
})


//If the form gets submitted , send to the server  message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, `right`);
    socket.emit('send', message);
    messageInput.value = '';


})