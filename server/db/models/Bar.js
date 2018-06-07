const conn = require('../conn');
const { Sequelize } = conn;
const { newBar } = require('../../automail');

const Bar = conn.define('bar', 
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    email: Sequelize.STRING,
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },{ underscored: true }
);

Bar.hook('afterCreate', (bar) => {
  newBar(bar)
});


module.exports = Bar;
