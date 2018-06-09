/* eslint-disable */
const axios = require('axios');
const devices = {}
const sock = (io) => {
  io.on('connection', (socket) => {
    devices[socket.id] = socket

    // user logging in (won't have bar id yet)
    socket.on('authenticate', (id) => {
      io.emit('authenticated', id)
    });

    // bar logging in
    socket.on('bar login', (id) => {
      socket.join(id)
    });

    // team choosing bar
    socket.on('choose bar', (bar_id) => {
      socket.join(bar_id)
    });

    // team choosing team name
    socket.on('choose team name', ({ name, bar_id, team }) => {
      axios.put(`https://untapped-trivia.herokuapp.com/v1/teams/${team}`, { team_name: name })
      .then(() => io.to(bar_id).emit('team register', name))
       // need for web home page
    });

    // new game
    socket.on('start game', (bar_id) => {
      io.to(bar_id).emit('game started')
    });

    // new question
    socket.on('send question', (question) => {
      const { bar } = question
      io.to(bar.id).emit('sending question', question)
    });

    // team submitting answer
    socket.on('answer', (info) => {
      // const { team, answer } = info
      io.emit('answer submitted', info)
    });

    // question active is over
    socket.on('question over', (bar) => {
      io.to(bar.id).emit('waiting for next question')
    })

    // question waiting is over
    socket.on('get next question', ({ bar, index }) => {
      io.to(bar.id).emit('ready for next question', index)
    })

    // timers
    socket.on('question countdown', ({ bar, timer }) => {
      io.to(bar.id).emit('question timer', timer)
    })
    socket.on('wait countdown', ({ bar, timer }) => {
      io.to(bar.id).emit('wait timer', timer)
    })

    // game over
    socket.on('game over', (bar) => {
      io.to(bar.id).emit('game has ended')
    })

    // new game
    socket.on('new game', () => {
      io.emit('new game has started')
    })

    socket.on('disconnect', () => {
      delete devices[socket.id]
      console.log('user has disconnected')
    })
  })
}

module.exports = sock
