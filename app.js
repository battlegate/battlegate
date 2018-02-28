const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const bcrypt       = require('bcrypt');
const app          = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

mongoose.connect('mongodb://alec:123@ds011228.mlab.com:11228/battlegate')


app.use(session({
  secret: "alec",
  resave: true,
  saveUninitialized: true
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

app.use(passport.initialize());

app.use(passport.session());


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


//Aqui usas el nombre de las consts de arriba
app.use('/', index);
app.use('/', aboutus)
app.use('/', contactus)
app.use('/', create)
app.use('/', how)
app.use('/', login)
app.use('/', signup)
app.use('/', find)



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