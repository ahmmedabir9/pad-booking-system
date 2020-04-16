const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', (err, manager, info) => {
    if (err) {
      console.log(info);
      console.log(err);

      return next(err);
    }

    if (!manager) {
      res.status(400).json({
        message: 'Authentication Failled',
      });
    }

    req.manager = manager;
    return next();
  })(req, res, next);
};
