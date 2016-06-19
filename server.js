// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


// configure app to use bodyParser()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(allowCrossDomain);

var port = process.env.PORT || 8080;        // set our port

// models
var Bear     = require('./app/models/bear');
var Restaurant = require('./app/models/restaurant');
var Customer = require('./app/models/customer');

mongoose.connect('mongodb://localhost:27017/bears'); // connect to our database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected !!');
});



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

app.get('/', function (req, res) {
  res.render('index', {});
});

router.use(function(req, res, next) {
    // do logging
    console.log('Actions taken !! ');
    next(); // make sure we go to the next routes and don't stop here
});



// more routes for our API will happen here

// on routes that end in /restaurants

router.route('/restaurants')

  // create a restaurant (accessed at POST http://localhost:8080/api/restaurants)
    .post(function(req, res){

var restaurant = new Restaurant();
        restaurant.name = req.body.name;
        restaurant.location = req.body.location;


        Restaurant.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New Restaurant created!' });
        });


    })
    .get(function(req, res) {
        Restaurant.find(function(err, restaurants) {
            if (err)
                res.send(err);

            res.json(restaurants);
        });
    });




// on routes that end in /restaurants/:restaurant_id
// ----------------------------------------------------
router.route('/restaurants/:restaurant_id')

    // get the restaurant with that id (accessed at GET http://localhost:8080/api/restaurants/:restaurant_id)
    .get(function(req, res) {
        Restaurant.findById(req.params.restaurant_id, function(err, restaurant) {
            if (err)
                res.send(err);
            res.json(restaurant);
        })
    })

    .put(function(req, res) {

            // use our bear model to find the bear we want
            Restaurant.findById(req.params.restaurant_id, function (err, restaurant) {

                if (err)
                    res.send(err);

                restaurant.name = req.body.name;  // update the Restaurant info
                console.log('Restaurant Name:'+ restaurant.name);
                restaurant.location = req.body.location; //update the restaurant info
                console.log('Restaurant Location:'+ restaurant.location);
                // save the restaurant
                restaurant.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Restaurant updated!'});
                });

            });

        })

.delete(function(req, res) {
    Restaurant.remove({
        _id: req.params.restaurant_id
    }, function (err, restaurant) {
        if (err)
            res.send(err);

        res.json({message: 'Restaurant Successfully deleted'});
    });

});





// on routes that end in /customers

router.route('/customers')

    // create a customer (accessed at POST http://localhost:8080/api/customers)
    .post(function(req, res) {
        var customer = new Customer();      // create a new instance of the Bear model
        customer.name = req.body.name;  // set the bears name (comes from the request)
        customer.email = req.body.email; // set the bears brand (comes from the request)

        // save the bear and check for errors
        customer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'New Customer created!' });
        });

    })

    .get(function(req, res) {
        Customer.find(function(err, customers) {
            if (err)
                res.send(err);

            res.json(customers);
        });
    });


// on routes that end in /customers/:customer_id
router.route('/customers/:customer_id')

    // get the customer with that id (accessed at GET http://localhost:8080/api/customers/:customer_id)
    .get(function(req, res) {
        Customer.findById(req.params.customer_id, function(err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        })
    })

    .put(function(req, res) {

        // use our customer model to find the customer we want
        Customer.findById(req.params.customer_id, function (err, customer) {

            if (err)
                res.send(err);

            customer.name = req.body.name;  // update the Customer Name
            customer.email = req.body.email; // update the Customer email

            // save the customer
            customer.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Customer Details updated!'});
            });

        });

    })

    .delete(function(req, res) {
        Customer.remove({
            _id: req.params.customer_id
        }, function (err, customer) {
            if (err)
                res.send(err);

            res.json({message: 'Customer Successfully deleted'});
        });

    });




// on routes that end in /bears

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.brand = req.body.brand; // set the bears brand (comes from the request)
        bear.restaurant = req.body.restaurant; //set the restaurant (comes from the request)
        bear.customer = req.body.customer; //set the customer (comes from the request)
        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })

    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


    // on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function (err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info
            bear.customer = req.body.customer;  // update the bears info

            // save the bear
            bear.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Bear updated!'});
            });

        });

    })

            .delete(function(req, res) {
                Bear.remove({
                    _id: req.params.bear_id
                }, function(err, bear) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Bear Successfully deleted' });
                });

    });


// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


