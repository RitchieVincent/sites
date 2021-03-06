var express = require('express'),
    fs = require('fs'),
    engine = require('ejs-locals'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('express-flash');

var app = express();

var port = 5000;
//var port = process.env.PORT || 5000;

var nav = [{
    link: '/',
    text: 'Home'
}, {
    link: '/sites',
    text: 'Sites'
}];

app.use(cookieParser('secret'));
app.use(session({
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
}));
app.use(flash());

app.use(express.static('public'));
app.set('views', './src/views');

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var sitesRouter = require('./src/routes/sitesRoutes');
var adminRouter = require('./src/routes/adminRoutes');

app.use('/sites', sitesRouter(nav));
app.use('/admin', adminRouter(nav));

app.get('/', function (req, res) {

    res.render('index', {
        nav: nav,
        title: 'Index'
    });

});

app.use(function (req, res, next) {

    res.status(404).send('404.');

});

app.use(function (err, req, res, next) {

    console.error(err.stack);
    res.status(500).send('Something broke!');

});

app.listen(port, function (err) {

});
