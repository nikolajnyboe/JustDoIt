const passport = require('passport');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.json(err); }
    if (!user) { return res.send('login failed, no user'); }
    req.login(user, err => {
      if (err) { return res.json(err); }
      return res.json(user);
    });
  })(req, res, next);
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const error = new Error()
  error.status = 401;
  error.message = 'You must be logged in to do this.'
  res.json(error);
};

exports.logout = (req, res) => {
  req.logout();
  res.send('You are now logged out.');
};