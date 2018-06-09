const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const socket = require('../../socket-client');
const Team = require('../db/models/Team');

const host = process.env.HOST
const googleCredentials = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_KEY,
  callbackURL: `${host}auth/google/callback`
}

const verificationCb = (token, refreshToken, profile, done) => {
  
  Team.findOrCreate({
    where: { googleId: profile.id },
    defaults: { email: profile.emails[0].value }
  })
  .spread((team, created) => {
      done(null, team);
  })
  .catch(done);
}

passport.use(new GoogleStrategy(googleCredentials, verificationCb));

router.get('/', passport.authenticate('google', { scope: 'email', session: false }))

router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
  socket.emit('authenticate', req.user.id)
  // token = jwt.sign({ id: req.user.id }, process.env.SECRET, { expiresIn: 86400 })
  res.redirect(`untappedtrivia://`)
})


module.exports = router;
