require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const cors         = require('cors');
const passport     = require('passport');
const session      = require('express-session');

const passportSetup= require('./config/passport');
passportSetup(passport);


mongoose.Promise = Promise;
mongoose
  .connect(mongoose.connect(process.env.MONGODB_URI), {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  secret:'angular auth passport secret',
  resave: true,
  saveUninitialized: true,
  cookie: {httpOnly: true, maxAge: 2419200000}
}));

app.use(passport.initialize());
app.use(passport.session());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));

const index = require('./routes/index');
app.use('/', index);

const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes)

const profileRoutes = require('./routes/profile-routes');
app.use('', profileRoutes)

const commentRoutes = require('./routes/comment-routes');
app.use('', commentRoutes)

const groupRoutes = require('./routes/group-routes');
app.use('', groupRoutes)

const eventRoutes = require('./routes/event-routes');
app.use('', eventRoutes)


app.use((req, res, next) => {
  res.sendfile(__dirname + '/public/index.html');
});

module.exports = app;
