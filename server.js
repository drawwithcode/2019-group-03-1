var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var socket = require('socket.io');
var io = socket(server);

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./spreadsheet-credentials.json');
var doc = new GoogleSpreadsheet('1Q25gnGC5R3uE4qQHON8njArLOeIcu0IvrbT1jTqy5QQ');

app.use(express.static('public'));

io.on('connection', newConnection);

function newConnection(socket) {
  //socket code here
}

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the spreadsheet.
  doc.getRows(1, function (err, rows) {

    console.log(rows);

  });

});
