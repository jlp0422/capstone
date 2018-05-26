const express = require('express');
const path = require('path');
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.Server(app)
const socket = socketio(server)

require('dotenv').config();
app.use(require('body-parser').json());

app.use('/v1', require('./routes'));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// app.get('/', (req, res, next) => {
//   res.send('Capstone is fun');
// });

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));


socket.on('connection', (client) => {
  console.log('***** connected to: ', client.id)
})

socket.on('login', () => {
  console.log('*** LOGIN: ')
})
