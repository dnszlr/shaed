const socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('formChat');
let input = document.getElementById('inputChat');

/**
 * Adds Eventlistener for form to emit messages to server.
 */
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (input.value) {
        // Emit message to server
        socket.emit('chat message', input.value);
        // Reset input value
        input.value = '';
        input.focus();
    }
});

/**
 * Emits username to server
 */
socket.emit('tellUsername', getFromUri('username'));

/**
 * Receives all chat messages from server
 */
socket.on('chat message', function (msg) {
    console.log(msg);
    appendMsg(msg);
});

/**
 * Receives all messages from server
 */
socket.on('message', function (msg) {
    console.log(msg);
    appendMsg(msg);
});

/**
 * Appends passed message msg to chat.html
 * @param msg
 */
function appendMsg(msg) {
    let item = document.createElement('li');
    item.textContent = msg.username + ' ' + msg.time + ' ' + msg.message ;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Returnes the value from the passed url key.
 * For example www.localhost:8080/chat/username=admin, if you pass username, admin gets returned
 * @param element
 * @returns {string}
 */
function getFromUri(element) {
    const urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(element);
}