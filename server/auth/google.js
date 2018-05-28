const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

const host = process.env.HOST
const googleCredentials = {
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_KEY,
  callbackURL: `${host}/auth/google/callback`
}

const verificationCb = (token, refreshToken, profile, done) => {
  const info = {
    firstname: profile.name.givenName,
    lastname: profile.name.familyName,
    email: profile.emails[0].value,
  };

  User.findOrCreate({
    where: { googleId: profile.id },
    defaults: info
  })
  .spread((user, created) => {
      done(null, user);
  })
  .catch(done);
}

passport.use(new GoogleStrategy(googleCredentials, verificationCb));

router.get('/', passport.authenticate('google', { scope: 'email', session: false }))

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  const token = jwt.sign({id: req.user.id}, process.env.SECRET, { expiresIn: 86400 })
  res.redirect(`/?token=${token}`)
})

module.exports = router;
