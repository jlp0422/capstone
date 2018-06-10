const { Team, Bar, Game, Question } = require('./db').models;
const conn = require('./db/conn');
const axios = require('axios');
const chance = require('chance').Chance();
const bcrypt = require('bcryptjs');
const faker = require('faker');

const createTeam = game => {
  return Team.create({
    team_name: `${chance.capitalize(faker.commerce.color())} ${chance.animal()}s`,
    email: chance.email(),
    score: chance.integer({ min: 0, max: 100 })
  })
    .then(team => team.setGame(game))
    .then(team => {
      return Bar.findAll().then(bars => {
        team.setBar(bars[Math.ceil(Math.random() * bars.length - 1)]);
      });
    });
};

const populateTeams = game => {
  return Promise.all([createTeam(game), createTeam(game), createTeam(game)]);
};

const createGames = () => {
  return Bar.findAll().then(bars => {
    return Promise.all([
      Game.create({
        active: true,
        bar_id: bars[Math.ceil(Math.random() * bars.length - 1)].id
      }),
      Game.create({
        active: false,
        bar_id: bars[Math.ceil(Math.random() * bars.length - 1)].id
      }),
      Game.create({
        active: false,
        bar_id: bars[Math.ceil(Math.random() * bars.length - 1)].id
      })
    ]);
  });
};
const createQuestions = (game) => {
  return axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(res => res.data.results)
    .then(questions => {
      questions.map(question => {
        Question.create({
          question: question.question,
          answers: question.answers,
          correct_answer: question.correct_answer,
          incorrect_answers: question.incorrect_answers,
          difficulty: question.difficulty,
          answered_correctly: chance.integer({ min: 0, max: 40 }),
          category: question.category
        }).then(question => question.setGame(game));
      });
    });
};
const createBar = () => {
  const hashPassword = bcrypt.hashSync('admin', 6);
  return Bar.create({
    id: Math.floor(Math.random() * 10000),
    email: chance.email(),
    password: hashPassword,
    name: `${chance.animal()} Town`,
    latitude: chance.latitude({ min: 29, max: 64.85694 }),
    longitude: chance.longitude({ min: -115, max: -85 })
  });
};

const seed = () => {
  return Promise.all([createBar(), createBar(), createBar()]).then(() => {
    return Promise.resolve(createGames())
      .then(games => {
        return Promise.all([
          createQuestions(1),
          createQuestions(2),
          createQuestions(3)
        ]).then(() => {
          return Promise.all([
            populateTeams(Math.ceil(Math.random() * games.length)),
            populateTeams(Math.ceil(Math.random() * games.length)),
            populateTeams(Math.ceil(Math.random() * games.length))
          ]);
        });
      })

      .catch(err => console.log(err));
  });
};


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
