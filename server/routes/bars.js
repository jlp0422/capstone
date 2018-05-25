const router = require('express').Router();
const { Bar } = require('../db').models

router.get('/', (req,res,next) => {
  Bar.findAll()
  .then(bars => res.send(bars))
})

router.post('/', (req,res,next) => {
  Bar.create(req.params.body)
  .then(bar => res.send(bar))
})

module.exports = router;
