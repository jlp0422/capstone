const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = require('express').Router();

router.post('/', (req, res, next) => {
  stripe.charges.create({
    amount: req.body.amount,
    currency: 'usd',
    description: 'UnTapped Trivia',
    source: req.body.token,
    // receipt_email: req.body.email
  })
  .then(() => res.sendStatus(200));
});

module.exports = router;
