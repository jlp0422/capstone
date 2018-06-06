/* eslint-disable */
const sock = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id)
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
      // io.to(bar_id).emit('team connected', bar_id)
      // io.emit('bar register', bar_id)
    });
    socket.on('choose team name', ({ name, bar_id }) => {
      io.to(bar_id).emit('team register', name)
    });
    socket.on('answer', (info) => {
      // const { team, answer } = info
      io.emit('answer submitted', info)
    });
    // socket.on('request question', () => {
    //   io.emit('question requested')
    // });
    socket.on('send question', (obj) => {
      io.emit('sending question', obj)
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
      console.log('user has disconnected')
    })
  })
}

module.exports = sock
