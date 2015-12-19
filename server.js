/*****************************************************
 *
 * File:          server.js
 * Description:   The script to run for starting the
 *                node server.
 *
 ****************************************************/

// This is just for debugging when we spawn a child process.
(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();

// Use express to create a server.
var express = require('express');
var app = express();

// Use constants for pre-defined data not part of the JSONs.
var constants = require('./Public/js/constants.js');

// Use a common directory for files to be used in the
// web pages, such as for images, javascript, and css.
app.use(express.static(__dirname + '/Public'));
var fs = require('fs');

/* Spawn a synchronous child process to run our python script, and return
 * the print statement of the song info object to pass as data to our
 * back end to use for information on our wikicode page.
 */
var child = require('child_process');
var spawnResult = child.execSync('python levelstatsparse.py');
console.log("Result: " + spawnResult);

// Home Page.
app.get('/', function(req, res) {
  res.render('home.jade');
});

// WikiCode Page and htmltojson
app.get('/wikicode', function(req, res) {
  res.render('wikicode.jade');
})

// NPS Generator Page -- currently hidden (notpron anybody?!)
app.get('/nps_generator', function(req, res) {
  
  var levelNum = 0;
  
  if (req.query.levelnumber != undefined) {
    levelNum = req.query.levelnumber;
  }
  
  res.render('nps_generator.jade', {levelnum: levelNum});
})

// Error page which redirects the user back to Search.
app.get('/*', function(req, res) {
  res.status(404).render('error.jade');
});

console.log('Running on port: ' + constants.port);

// Tell the server to listen to a specific port. If on localhost,
// you might need to use http://localhost:3000/ as the URL.
app.listen(constants.port, constants.ipAdress);