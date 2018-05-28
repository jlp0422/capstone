/* eslint-disable */
const axios = require('axios');

const authenticate = (socket, token) => {
  socket.on('authenticate', (token) => {
    // emit to whoever needs
  })
}

const sock = (io) => {
  io.on('connection', (socket) => {
    console.log('socket server connected:', socket.id)
    socket.on('login', (type) => {
      console.log(`socket server: login attempt with ${type}`)
    });
    socket.on('choose-bar', (bar_id) => {
      console.log(`socket server: bar id: ${bar_id}`)
      // only works with io.emit
      socket.broadcast.emit('bar register', bar_id)
    });
    socket.on('team-name', (name) => {
      console.log(`socket server: team name: ${name}`)
      // only works with io.emit
      socket.broadcast.emit('team register', name)
    });
    socket.on('answer', (info) => {
      const { team, answer } = info
      console.log(`socket server: team: ${team}, answer: ${answer}`)
    });
    socket.on('request question', () => {
      console.log('question requested on server')
      axios.get('http://localhost:3000/v1/api/')
        .then( res => res.data)
        .then( question => io.emit('send question', question))
    });
    authenticate(socket, 'xxx');
    socket.on('disconnect', () => {
      console.log('user has disconnected')
    })
  })
}

module.exports = {
  sock,
  authenticate
}
