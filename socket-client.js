import io from 'socket.io-client';
const socket = io('http://localhost:3000/')

socket.on('connect', () => {
  console.log('socket client: connected!')
  socket.on('team register', (name) => {
    console.log(`socket client: team ${name} has signed up!`)
  })
});

export default socket;
