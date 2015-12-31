var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID;

var sitesRouter = express.Router();

var router = function (nav) {

    sitesRouter.route('/')
        .get(function (req, res) {

            var url = 'mongodb://localhost:27017/sitesApp';

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites');

                collection.find({}).toArray(function (err, results) {

                    res.render('sitesListView', {
                        nav: nav,
                        title: 'Sites',
                        sites: results
                    });

                });

            });

        });

    sitesRouter.route('/:id')
        .get(function (req, res) {

            var id = new objectId(req.params.id);

            var url = 'mongodb://localhost:27017/sitesApp';

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites');

                collection.findOne({
                    _id: id
                }, function (err, results) {

                    res.render('sitesView', {
                        nav: nav,
                        title: 'Sites',
                        site: results
                    });

                });

            });

        });

    return sitesRouter;

};

module.exports = router;
