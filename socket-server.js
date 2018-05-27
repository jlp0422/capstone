module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(socket.id, 'has made a persisent connection!')
  })
}
