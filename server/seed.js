const { Team, Bar, Game, Question } = require('./db').models;
const conn = require('./db/conn');
const axios = require('axios');
const chance = require('chance').Chance();
const bcrypt = require('bcryptjs');
const faker = require('faker');

let numOfTeams = 5;

const createTeam = (game) => {
  return Team.create({
    team_name: `${chance.capitalize(faker.commerce.color())} ${chance.animal()}s`,
    email: chance.email()
  })
  .then(team => team.setGame(game))
};

const populateTeams = (game) => {
  while (numOfTeams--) {
    createTeam(game)
  }
}

const seed = () => {
  return Game.create({ active: false })
  .then((game) => {
    return axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => res.data.results)
    .then(questions => {
      questions.map(question => {
        Question.create({
          question: question.question,
          answers: question.answers,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          difficulty: question.difficulty,
          category: question.category,
        })
        .then(question => question.setGame(game))
      })
    })
    .then(() => {
      const hashPassword = bcrypt.hashSync('admin', 6)
      const randomNum = Math.floor(Math.random() * 10000)
      const newId = randomNum > 1000 ? String(randomNum) : `0${randomNum}`
      return Bar.create({
        id: newId,
        email: chance.email(),
        password: hashPassword,
        name: `${chance.animal()} Town`
      })
    })
    .catch(err => console.log(err))
  })
}

conn
  .sync({ force: true })
  .then(() => {
    console.log('Seeding now...');
    return seed();
  })
  .then(() => console.log('Seed Complete!'))
  .then(() => {
    return conn.close();
  })
  .catch(err => console.log('*** Error Seeding Database ***', err));
