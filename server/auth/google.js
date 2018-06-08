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
  const info = {
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    email: profile.emails[0].value,
  };

  Team.findOrCreate({
    where: { googleId: profile.id },
    defaults: info
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
  res.redirect(`unptappedtrivia://`)
})


module.exports = router;
