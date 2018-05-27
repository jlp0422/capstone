const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cyrpto = require('crypto');
const { Player } = require('../db').models;
const secret = process.env.SECRET;

router.post('/register', (req, res) => {
  console.log(req.body)
  Player.create(req.body)
  .then(player => {
    const token = jwt.sign({ id: player.id }, secret, { expiresIn: 86400 });
    res.send({ token });
  })
  .catch(err => res.status(404).send({ error: err }));
});

router.post('/login', (req, res) => {
  console.log("login", req.body)
  Player.findOne({ where: { email: req.body.email } })
    .then(player => {
      const passwordIsValid = bcrypt.compareSync(req.body.password, player.password);
      const token = jwt.sign({ id: player.id }, secret, {expiresIn: 86400 });
      if (!passwordIsValid){
        return res.status(401).send({ token: null });
      } 
      res.status(200).send({ token });
    })
    .catch(err => res.status(404).send({ error: err }));
});

module.exports = router;
