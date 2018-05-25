const express = require('express');
const app = express();
const path = require('path');
app.use(require('body-parser').json());

app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.send('Capstone is fun');
});
// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../src/index.html'));
// });

module.exports = app;
