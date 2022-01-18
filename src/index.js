const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const validator = require('express-validator');

const { database } = require('./keys');

//inicializaciones
const app=express();
require('./lib/passport');

//configuraciones
const port = process.env.PORT || 3000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//middlewares
app.use(morgan('dev'));
app.use(session({
  secret: 'mysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());


//variables globales
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});


//rutas
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/routers',require('./routes/routers'));


//publico
app.use(express.static(path.join(__dirname,'public')));

//inicio del servidor
app.listen(port, () => {
  console.log(`Server started at port ${port}`)
});
