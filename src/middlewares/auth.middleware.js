const { ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET } = require('../config/config');
const expressSession = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(
  new Strategy((username, password, done) => {
    const isAdmin = username === ADMIN_EMAIL && password === ADMIN_PASSWORD;

    if (isAdmin) {
      return done(null,  { username: ADMIN_EMAIL });
    }

    return done(null, false);
  })
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
const authenticate = passport.authenticate('local');

function setMiddleware (app) {
  app.use(session());
  app.use(passport.initialize());
  app.use(passport.session());
}

function login(req, res, next) {
  return res.json({ success: true });
}

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === ADMIN_EMAIL;

  if (isAdmin) return next();

  const err = new Error('Unauthorized');
  err.statusCode = 401;
  return next(err);
}

function session() {
  return expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  });
}

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === ADMIN_EMAIL;
  if (isAdmin) return next();

  return res.status(401).json({ error: 'Unauthorized' });
}

module.exports = {
  setMiddleware,
  authenticate,
  login,
  ensureAdmin
}
