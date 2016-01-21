var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID;

var adminRouter = express.Router(),
    url = 'mongodb://localhost:27017/sitesApp';

var router = function (nav) {

    adminRouter
        .get('/new', function (req, res) {

            res.render('sitesNew', {
                nav: nav,
                title: 'Add new site'
            });

        })

        .post('/new', function(req, res) {

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites'),
                    result = req.body,
                    tags = result.tags.split(','),
                    data = {};

                for (var i = 0; i < 1; i++) {

                    data = {

                        title: result.title,
                        developer: result.developer,
                        designer: result.designer,
                        am: result.am,
                        siteId: result.siteId,
                        tags: tags

                    };

                }

                try {

                    collection.insert(data, function(err, results) {

                        collection.find({}).toArray(function (err, results) {

                            results.title = 'Site added.';

                            res.render('sitesListView', {
                                nav: nav,
                                title: 'Sites',
                                sites: results
                            });

                        });

                    });

                }
                catch (err) {

                    console.log(err);

                }

            });

        });

    adminRouter
        .post('/delete', function (req, res) {

            var result = objectId(req.body.id);

            try {

                mongodb.connect(url, function (err, db) {

                    var collection = db.collection('sites');

                    collection.remove({_id: result}, 1, function(err, results) {

                        req.flash('test', 'Site Deleted.');
                        res.redirect('/sites');

                    });

                });

            }
            catch (err) {

                console.log(err);

            }

        })

    adminRouter
        .get('/modify/:id', function (req, res) {

            var id = new objectId(req.params.id);

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites');

                collection.findOne({
                    _id: id
                }, function (err, results) {

                    res.render('modifyView', {
                        nav: nav,
                        title: 'Sites',
                        site: results
                    });

                });

            });

        })

        .post('/modify/:id', function(req, res) {

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites'),
                    id = new objectId(req.params.id),
                    result = req.body,
                    tags = result.tags.split(',');

                try {

                    collection.update(

                        {
                            _id: id
                        }, {

                            $set: {
                                title: result.title,
                                developer: result.developer,
                                designer: result.designer,
                                am: result.am,
                                siteId: result.siteId,
                                tags: tags
                            }

                        }, function (err, results) {

                            collection.find({}).toArray(function (err, results) {

                                results.title = 'Site updated.';

                                res.render('sitesListView', {
                                    nav: nav,
                                    title: 'Sites',
                                    sites: results
                                });

                            });

                        }

                    );

                }
                catch (err) {

                    console.log(err);

                }

            });

        });

    return adminRouter;

};

module.exports = router;
