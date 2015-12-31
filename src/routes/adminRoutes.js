var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var sites = [
    {
        title: 'Test 1',
        developer: 'Test developer1',
        read: false
    },
    {
        title: 'Test 2',
        developer: 'Test developer2',
        read: false
    },
    {
        title: 'Test 3',
        developer: 'Test developer3',
        read: false
    },
    {
        title: 'Test 4',
        developer: 'Test developer4',
        read: false
    }
];

var router = function (nav) {

    adminRouter.route('/addSites')
        .get(function (req, res) {

            var url = 'mongodb://localhost:27017/sitesApp';

            mongodb.connect(url, function (err, db) {

                var collection = db.collection('sites');
                collection.insertMany(sites, function (err, results) {

                    res.send(results);
                    db.close();

                });

            });

        });

    return adminRouter;

};

module.exports = router;
