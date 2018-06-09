// publishable key = pk_test_vbn22qchI8SX3q2ls7TOdJ75

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const charge = (token) => {
  stripe.charges.create({
    amount: 10,
    currency: 'usd',
    description: 'UnTapped Trivia',
    source: token
  });
};

module.exports = charge;
