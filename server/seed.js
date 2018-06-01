const { Team, Bar, Game, Question } = require('./db').models;
const conn = require('./db/conn');
const axios = require('axios');
const chance = require('chance').Chance();
const bcrypt = require('bcryptjs');
const faker = require('faker');

const numOfTeams = 4;

const doTimes = (num, cb) => {
  const results = [];
  while (num--) {
    results.push(cb());
  }
};

const createTeam = () => {
  return Team.create({
    team_name: `${chance.capitalize(faker.commerce.color())} ${chance.animal()}s`,
    email: chance.email()
  });
};

const populateTeams = () => {
  return doTimes(numOfTeams, createTeam);
}

const seed = () => {
  return axios.get('https://opentdb.com/api.php?amount=10')
  .then(res => res.data.results)
  .then(questions => {
    questions.map(question => {
      Question.create({
        question: question.question,
        answers: question.answers,
        correct_answer: question.correct_answer,
        difficulty: question.difficulty,
        category: question.category
      })
    })
  })
  .then(() => {
    const hashPassword = bcrypt.hashSync('admin', 6)
    return Bar.create({
      id: Math.floor(Math.random() * 10000),
      email: chance.email(),
      password: hashPassword,
      name: `${chance.animal()} Town`
    })
    .then(() => Game.create())
    .then(() => populateTeams())
  })
  .catch(err => console.log(err))
}

conn
  .sync({ force: true })
  .then(() => {
    console.log('Seeding now...');
    return seed();
  })
  .then(() => console.log('Seed Complete!'))
  .then(() => {
    conn.close();
    console.log('Connection Closed...');
    return null;
  })
  .catch(err => console.log('*** Error Seeding Database ***', err));
