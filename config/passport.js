var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, db = require('../models')

// Serialize Sessions
passport.serializeUser(function(user, done){
  done(null, user);
});

//Deserialize Sessions
passport.deserializeUser(function(user, done){
  db.User.findOne({where: {id: user.id}}).then(function(user){
      done(null, user);
  }).error(function(err){
      done(err, null)
  });
});

// For Authentication Purposes
passport.use(new LocalStrategy(
  function(username, password, done){
      db.User.findOne({where: {username: username}}).then(function(user){
          // console.log(user);
        //   meaning of confusing ternary expression
        // var passwd;
        // if (user) {
        //       passwd = user.password
        //   } else {
        //       passwd = ''
        //   }
          passwd = user ? user.password : ''
          isMatch = db.User.validPassword(password, passwd, done, user)
      });
  }
));