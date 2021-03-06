const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const bcrypt       = require('bcrypt');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const MongoStore = require("connect-mongo")(session)

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
mongoose.connect('mongodb://localhost/battlegate')
.then(console.log("connected"))


const User = require('./models/User')
const flash = require("connect-flash");

//Aqui usa el nombre de el js file
const index = require('./routes/index');
const aboutus = require('./routes/aboutus');
const contactus = require('./routes/contact');
const create = require('./routes/createbattle');
const error = require('./routes/contact');
const how = require('./routes/how');
const login = require('./routes/auth');
const signup = require('./routes/auth');
const find = require('./routes/findbattle');
const profile = require('./routes/profile');


const app          = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Battlegate';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));


passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  passReqToCallback : true
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

passport.use(new GoogleStrategy({
  clientID: "287934396843-88ic4kcv7ns1q7nesopv965m0sgkkql4.apps.googleusercontent.com",
  clientSecret: "D61PmDYEWx8LYIIeO45IvpYv",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

app.use(passport.initialize());
app.use(passport.session());

//Aqui usas el nombre de las consts de arriba
app.use('/', index);
app.use('/', aboutus)
app.use('/', contactus)
app.use('/', create)
app.use('/', how)
app.use('/', login)
app.use('/', signup)
app.use('/', find)
app.use('/', profile)

app.use(flash());

app.use(session({
  secret: "alec",
  resave: true,
  saveUninitialized: true
}));

//bliss middleware to set the user in the templates
app.use(function(req,res,next){
  res.locals.user = req.user;
  next();
}); 

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;