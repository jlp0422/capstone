const router = require('express').Router();
const axios = require('axios');

router.get('/questions', (req, res, next) => {
  axios.get(`https://opentdb.com/api.php?amount=1`)
  .then(res => res.data)
  .then(questions => res.send(questions))
})

/* 
amount = Amount of questions (1-50)
category = ID of category (9-32)
  list of category ids {
    9: General Knowledge
    10: Entertainment: Books
    11: Entertainment: Film
    12: Entertainment: Music
    13: Entertainment: Musicals & Theater
    14: Entertainment: Television
    15: Entertainment: Video Games
    16: Entertainment: Board Games
    17: Science and Nature
    18: Science: Computers
    19: Science: Mathematics
    20: Mythology
    21: Sports
    22: Geography
    23: History
    24: Politics
    25: Art
    26: Celebrities
    27: Animals
    28: Vehicles
    29: Entertainment: Comics
    30: Science: Gadgets
    31: Entertainment: Japanese Anime & Manga
    32: Entertainment: Cartoons & Animation
  }
difficulty = easy/medium/hard 
type = multiple/boolean
*/

router.get('/questions/:query', (req, res, next) => {
  axios.get(`https://opentdb.com/api.php?${req.params.query}`)
  .then(res => res.data)
  .then(questions => res.send(questions))
})

router.get('/categories', (req, res, next) => {
  axios.get(`https://opentdb.com/api_category.php`)
  .then(res => res.data)
  .then(categories => res.send(categories))
})

router.get('/categories/:id', (req, res, next) => {
  axios.get(`https://opentdb.com/api_count.php?category=${req.params.id}`)
  .then(res => res.data)
  .then(categories => res.send(categories))
})

router.get('/counts', (req, res, next) => {
  axios.get(`https://opentdb.com/api_count_global.php`)
  .then(res => res.data)
  .then(counts => res.send(counts))
})


module.exports = router;
