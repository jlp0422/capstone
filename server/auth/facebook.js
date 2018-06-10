const router = require('express').Router();
const FacebookStrategy = require('');
const passport = require('passport');
const socket = require('../../socket-client');
const Team = require('../db/models/Team');

const host = process.env.HOST
const facebookCredentials = {
  clientID: process.env.FB_ID,
  clientSecret: process.env.FB_KEY,
  callbackURL: `${host}auth/facebook/callback`
}

const verificationCb = (token, refreshToken, profile, done) => {
  
  Team.findOrCreate({
    where: { facebookId: profile.id },
    defaults: profile.emails.length ? { email: profile.emails[0].value } : { email: 'NONE' }
  })
  .spread((team, created) => {
      done(null, team);
  })
  .catch(done);
}

passport.use(new FacebookStrategy(facebookCredentials, verificationCb));

router.get('/', passport.authenticate('facebook', { scope: 'email', session: false }))

router.get('/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
  socket.emit('authenticate', req.user.id)
  res.redirect(`untappedtrivia://`)
})


module.exports = router;
