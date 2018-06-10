const router = require('express').Router();
const { Question } = require('../db').models;

router.get('/', (req, res, next) => {
  Question.findAll().then(questions => {
    res.send(questions);
  });
});

module.exports = router;
