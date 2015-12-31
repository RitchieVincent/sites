var express = require('express'),
    fs = require('fs'),
    engine = require('ejs-locals');

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
    link: '/',
    text: 'Home'
}, {
    link: '/sites',
    text: 'Sites'
}, {
    link: '/developer',
    text: 'Developers'
}];

var sitesRouter = require('./src/routes/sitesRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use('/sites', sitesRouter);
app.use('/admin', adminRouter);

app.get('/', function (req, res) {

    res.render('index', {
        nav: nav,
        title: 'Index'
    });

});

app.use(function(req, res, next) {

    res.status(404).send('404.');

});

app.use(function(err, req, res, next) {

    console.error(err.stack);
    res.status(500).send('Something broke!');

});

app.listen(port, function (err) {

});
