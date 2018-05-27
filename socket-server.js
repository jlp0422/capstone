module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('**** SOCKET CONNECTED: ', socket.id)
    socket.on('login', (type) => {
      console.log(`socket: login attempt with ${type}`)
    });
    socket.on('choose-bar', (bar_id) => {
      console.log(`socket: bar id: ${bar_id}`)
    })
    socket.on('team-name', (name) => {
      console.log(`socket: team name: ${name}`)
    })
  })
}
