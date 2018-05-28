const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cyrpto = require('crypto');
const { Bar } = require('../db').models;
const secret = process.env.SECRET;

router.post('/register', (req, res) => {
  Bar.create(req.body)
  .then(bar => {
    const token = jwt.sign({ id: bar.id }, secret, { expiresIn: 86400 });
    res.send({ token });
  })
  .catch(err => res.status(404).send({ error: err }));
});

router.post('/login', (req, res) => {
  Bar.findOne({ where: { email: req.body.email } })
    .then(bar => {
      const passwordIsValid = bcrypt.compareSync(req.body.password, bar.password);
      const token = jwt.sign({ id: bar.id }, secret, {expiresIn: 86400 });
      if (!passwordIsValid){
        return res.status(401).send({ token: null });
      } 
      res.status(200).send({ token });
    })
    .catch(err => res.status(404).send({ error: err }));
});

module.exports = router;
