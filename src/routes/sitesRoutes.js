var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID;

var sitesRouter = express.Router(),
    url = 'mongodb://localhost:27017/sitesApp';

var router = function (nav) {

    sitesRouter.route('/')
        .get(function (req, res) {

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites');

                collection.find({

                }).toArray(function (err, results) {

                    res.render('sitesListView', {
                        nav: nav,
                        title: 'Sites',
                        sites: results
                    });

                });

            });

        })

        .post(function (req, res) {

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites'),
                    search = req.body.search;

                console.log(req.body);

                collection.createIndex({

                    '$**': 'text',
                    tags: 1

                }, {
                    weights: {

                        title: 10,
                        developer: 1,
                        designer: 1,
                        am: 1,
                        siteId: 1,
                        tags: 2

                    },
                    name: 'TextIndex'

                });

                collection.find({

                    $text: {

                        $search: search

                    }

                }, {
                    score: {

                        $meta: 'textScore'

                    }

                }).sort({

                    score: {

                        $meta: 'textScore'

                    }

                }).toArray(function (err, results) {

//                    collection.dropIndex('TextIndex');

//                    req.flash('search', 'Your search returned ' + results.length + ' results:');

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
