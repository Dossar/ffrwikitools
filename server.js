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

// Error page which redirects the user back to Search.
app.get('/*', function(req, res) {
  res.status(404).render('error.jade');
});

console.log('Running on port: ' + constants.port);

// Tell the server to listen to a specific port. If on localhost,
// you might need to use http://localhost:3000/ as the URL.
app.listen(constants.port, constants.ipAdress);
