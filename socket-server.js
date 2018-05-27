module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('**** SOCKET CONNECTED: ', socket.id)
    socket.on('login', (type) => {
      console.log(`login attempt with ${type}`)
    });
  })
}
