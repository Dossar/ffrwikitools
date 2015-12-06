/*****************************************************
 *
 * File:          server.js
 * Description:   The script to run for starting the
 *                node server.
 *
 ****************************************************/

// Use express to create a server.
var express = require('express');
var app = express();

// Use constants for pre-defined data not part of the JSONs.
var constants = require('./Public/js/constants.js');

// Use a common directory for files to be used in the
// web pages, such as for images, javascript, and css.
app.use(express.static(__dirname + '/Public'));
var fs = require('fs');

// Home Page.
app.get('/', function(req, res) {
  res.render('home.jade');
});

// WikiCode Page.
app.get('/wikicode', function(req, res) {
    res.render('wikicode.jade');
})

//<<<<<<< HEAD
// NPS Generator Page -- currently hidden (notpron anybody?!)
app.get('/nps_generator', function(req, res) {
    res.render('nps_generator.jade');
})

//=======
//>>>>>>> f4d39ce45bd60005f5ced9df6f993920b4c2b22b
// Error page which redirects the user back to Search.
app.get('/*', function(req, res) {
  res.status(404).render('error.jade');
});

console.log('Running on port: ' + constants.port);

// Tell the server to listen to a specific port. If on localhost,
// you might need to use http://localhost:3000/ as the URL.
app.listen(constants.port, constants.ipAdress);
