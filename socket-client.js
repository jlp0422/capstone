const io = require('socket.io-client');
const socket = io(process.env.HOST)

socket.on('connect', () => {
  console.log('socket web: connected!')
});

module.exports = socket;
