// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // set our port

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log({request:req});
    next();
});

router.route('/')
    .post(function (req, res) {
        console.log(`Sending ${JSON.stringify(req.body)} at ${new Date()}`);
        res.statusCode = 200;
        res.json({sent: req.body });
    });


// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

const server = app.listen(port);
const shutdown = () => {
    console.log(`Fortunes Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Listening on port: ' + port);
module.exports = {server, shutdown};

