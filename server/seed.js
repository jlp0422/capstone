const { Team, Bar, Game, Question } = require('./db').models;
const conn = require('./db/conn');
const axios = require('axios');
const chance = require('chance').Chance();
const faker = require('faker');

const numOfTeams = 4;

const doTimes = (num, cb) => {
  const results = [];
  while (num--) {
    results.push(cb());
  }
};

<<<<<<< HEAD
const createPlayer = () => {
  return Player.create({
    team_name: `${chance.capitalize(
      faker.commerce.color()
    )} ${chance.animal()}s`,
=======
const createTeam = () => {
  return Team.create({
    team_name: `${chance.capitalize(faker.commerce.color())} ${chance.animal()}s`,
>>>>>>> master
    email: chance.email()
  });
};

<<<<<<< HEAD
const populatePlayers = () => {
  return doTimes(numOfPlayers, createPlayer);
};

const seed = () => {
  return axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(res => res.data.results)
    .then(questions => {
      questions.map(question => {
        Question.create({
          question: question.question,
          answers: question.answers,
          correct_answer: question.correct_answer,
          difficulty: question.difficulty,
          category: question.category
        });
      });
    })
    .then(() => {
      return Bar.create({
        email: chance.email(),
        password: 'admin',
        name: `${chance.animal()} Town`
      })
        .then(() => {
          for (let i = 0; i < 6; i++) {
            Game.create();
          }
        })
        .then(() => populatePlayers());
    })
    .catch(err => console.log(err));
};
=======
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
    return Bar.create({
      id: Math.floor(Math.random() * 10000),
      email: chance.email(),
      password: 'admin',
      name: `${chance.animal()} Town`
    })
    .then(() => Game.create())
    .then(() => populateTeams())
  })
  .catch(err => console.log(err))
}
>>>>>>> master

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
