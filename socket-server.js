/* eslint-disable */
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('socket server connected:', socket.id)
    socket.on('login', (type) => {
      console.log(`socket server: login attempt with ${type}`)
    });
    socket.on('choose-bar', (bar_id) => {
      console.log(`socket server: bar id: ${bar_id}`)
      // only works with io.emit
      io.emit('bar register', bar_id)
    });
    socket.on('team-name', (name) => {
      console.log(`socket server: team name: ${name}`)
      // only works with io.emit
      io.emit('team register', name)
    });
    socket.on('answer', (info) => {
      const { team, answer } = info
      console.log(`socket server: team: ${team}, answer: ${answer}`)
      io.emit('answer submitted', info)
    });
    socket.on('request question', () => {
      io.emit('question requested')
    });
    socket.on('send question', (obj) => {
      // console.log('OBJ: ', obj)
      io.emit('sending question', obj)
    })
    socket.on('authenticate', (id) => {
      console.log('user id:', id)
      io.emit('authenticated', id)
    });
    socket.on('disconnect', () => {
      console.log('user has disconnected')
    })
  })
}
