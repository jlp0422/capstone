/* eslint-disable */
module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('login', (type) => {
      console.log(`socket server: login attempt with ${type}`)
    });
    socket.on('choose-bar', (bar_id) => {
      io.emit('bar register', bar_id)
    });
    socket.on('team-name', (name) => {
      io.emit('team register', name)
    });
    socket.on('answer', (info) => {
      // const { team, answer } = info
      io.emit('answer submitted', info)
    });
    socket.on('request question', () => {
      io.emit('question requested')
    });
    socket.on('send question', (obj) => {
      io.emit('sending question', obj)
    }),
    socket.on('start game', () => {
      io.emit('game started')
    })
    socket.on('question over', () => {
      io.emit('waiting for next question')
    })
    socket.on('get next question', () => {
      io.emit('ready for next question')
    })
    socket.on('question countdown', (timer) => {
      io.emit('question timer', timer)
    })
    socket.on('wait countdown', (timer) => {
      io.emit('wait timer', timer)
    })
    socket.on('game over', () => {
      io.emit('game has ended')
    })
    socket.on('authenticate', (id) => {
      io.emit('authenticated', id)
    });
    socket.on('disconnect', () => {
      console.log('user has disconnected')
    })
  })
}
