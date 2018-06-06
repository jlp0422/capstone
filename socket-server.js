/* eslint-disable */
const devices = {}

const sock = (io) => {
  io.on('connection', (socket) => {
    devices[socket.id] = socket
    socket.on('login', (type) => {
      console.log(`socket server: login attempt with ${type}`)
    });
    socket.on('bar login', (id) => {
      console.log('bar logged in: ', id)
      socket.join(id)
    });
    socket.on('choose bar', (bar_id) => {
      socket.join(bar_id)
      io.to(bar_id).emit('bar register', bar_id)
    });
    socket.on('choose team name', ({ name, bar_id }) => {
      io.to(bar_id).emit('team register', name)
    });
    socket.on('answer', (info) => {
      // const { team, answer } = info
      io.emit('answer submitted', info)
    });
    socket.on('send question', (question) => {
      io.emit('sending question', question)
    }),
    socket.on('start game', () => {
      io.emit('game started')
    })
    socket.on('question over', () => {
      io.emit('waiting for next question')
    })
    socket.on('get next question', (index) => {
      io.emit('ready for next question', index)
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
      delete devices[socket.id]
      console.log('user has disconnected')
    })
  })
}

module.exports = sock
