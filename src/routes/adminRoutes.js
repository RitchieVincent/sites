var express = require('express'),
    mongodb = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID;

var adminRouter = express.Router(),
    url = 'mongodb://localhost:27017/sitesApp';

var router = function (nav) {

    adminRouter.route('/new')
        .get(function (req, res) {

            res.render('sitesNew', {
                nav: nav,
                title: 'Add new site'
            });

        })

        .post(function(req, res) {

            mongodb.connect(url, function (err, db) {
                
                var collection = db.collection('sites');
                
                result = req.body;

                collection.insert(result, function(err, results) {
                    
                    collection.find({}).toArray(function (err, results) {

                        res.render('sitesListView', {
                            nav: nav,
                            title: 'Sites',
                            sites: results
                        });

                    });
                    
                });
                
            });
        
        });
    
    adminRouter.route('/delete/:id')
        .get(function (req, res) {
       
            var id = new objectId(req.params.id);

            mongodb.connect(url, function (err, db) {
                
                var collection = db.collection('sites');
                
                collection.remove( { _id: id }, 1, function(err, results) {
                    
                    collection.find({}).toArray(function (err, results) {

                        res.render('sitesListView', {
                            nav: nav,
                            title: 'Sites',
                            sites: results
                        });

                    });
                    
                });

            });
        
        });

    return adminRouter;

};

module.exports = router;
