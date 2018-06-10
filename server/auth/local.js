const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Bar } = require('../db').models;
const secret = process.env.SECRET;
const axios = require('axios');

router.post('/register', (req, res) => {
  const { address, email, id, name, password } = req.body;
  const { street, city, state } = address;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${street},+${city},+${state}&key=${
        process.env.MAPS_KEY
      }`
    )
    .then(res => res.data.results[0].geometry.location)
    .then(location => {
      Bar.create({
        id,
        email,
        name,
        password,
        longitude: location.lng,
        latitude: location.lat
      }).then(bar => {
        const token = jwt.sign({ id: bar.id }, secret, { expiresIn: 86400 });
        res.send({ token });
      });
    })
    .catch(err => res.status(404).send({ error: err.stack }));
});

router.post('/login', (req, res) => {
  Bar.findOne({ where: { id: req.body.id } })
    .then(bar => {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        bar.password
      );
      const token = jwt.sign({ id: bar.id }, secret, { expiresIn: 86400 });
      if (!passwordIsValid) {
        return res.status(401).send({ token: null });
      }
      res.status(200).send({ token });
    })
    .catch(err => res.status(404).send({ error: err.response }));
});

module.exports = router;
