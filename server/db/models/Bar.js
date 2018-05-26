const conn = require('../conn');
const { Sequelize } = conn;

const Bar = conn.define(
  'bar',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      unique: {
        args: [true],
        msg: 'E-mail is already taken'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'E-mail is invalid'
        },
        notEmpty: {
          args: [true],
          msg: 'E-mail cannot be empty'
        }
      }
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'First Name cannot be empty'
        }
      }
    }
  },
  { underscored: true }
);

module.exports = Bar;
