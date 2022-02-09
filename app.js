import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBtJ3R8DWl26qtCXDQvCO0TU3dC5FRjj8s",
    authDomain: "velaumar-c0b81.firebaseapp.com",
    databaseURL: "https://velaumar-c0b81-default-rtdb.firebaseio.com",
    projectId: "velaumar-c0b81",
    storageBucket: "velaumar-c0b81.appspot.com",
    messagingSenderId: "12998876707",
    appId: "1:12998876707:web:c1de580b4006454ecc5b96"
  };
  
  // Initialize Firebase
const app2 = initializeApp(firebaseConfig);

const auth = getAuth();
var userauth = auth.currentUser;

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const adminDocsRouter = require('./routes/adminDocs');
const adminAcoesRouter = require('./routes/adminAcoes');
const docsRouter = require('./routes/docs');
const acoesRouter = require('./routes/acoes');
const eventsRouter = require('./routes/events');
const noticiasRouter = require('./routes/noticias');
const adminNoticiasRouter = require('./routes/adminNoticias');
const doacoesRouter = require('./routes/doacoes');
const adminDoacoesRouter = require('./routes/adminDoacoes');
const sobreRouter = require('./routes/sobre');
const contatoRouter = require('./routes/contato');

const cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({origin: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/login", function(req, res, next){
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
.then((userCredential) => {
  // Signed in
  userauth = userCredential.user;
  console.log('logado');
  res.redirect('/adminDocs');
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  res.render('login', {
    errorlogin: 'E-mail ou senha incorreto'
  });
});
})

app.get("/logout", function(req, res, next){
  signOut(auth).then(() => {
      userauth = auth.currentUser;
      res.redirect('/login');
    }).catch((error) => {
      console.log(error);
    });
})

app.use(function(req, res, next){
  if(['/login', '/acoes', '/doacoes', '/docs', '/events', '/', '/noticias', '/sobre', '/contato'].indexOf(req.url) == -1 && !userauth){
    res.redirect("/login");
    console.log(userauth);
  } else {
    next();
  }
})

app.use('/', indexRouter);
app.use('/adminDocs', adminDocsRouter);
app.use('/docs', docsRouter);
app.use('/acoes', acoesRouter);
app.use('/adminAcoes', adminAcoesRouter);
app.use('/events', eventsRouter);
app.use('/noticias', noticiasRouter);
app.use('/adminNoticias', adminNoticiasRouter);
app.use('/doacoes', doacoesRouter);
app.use('/adminDoacoes', adminDoacoesRouter);
app.use('/sobre', sobreRouter);
app.use('/contato', contatoRouter);

app.get("/login", function (req, res, next){
  res.render('login');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
