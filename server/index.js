const express = require('express');
const app = express();
const path = require('path');
const conn = require('./db/conn')

require('dotenv').config();
app.use(require('body-parser').json());

app.use('/v1', require('./routes'));

app.get('/', (req, res, next) => {
  res.send('Capstone is fun');
});

// app.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../src/index.html'));
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

