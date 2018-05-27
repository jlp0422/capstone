import io from 'socket.io-client';
const socket = io('http://localhost/3000')

socket.on('connect', (socket) => {
  console.log('****** socket connected! ********')
});

export default socket;
