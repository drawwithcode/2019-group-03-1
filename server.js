var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var socket = require('socket.io');
var io = socket(server);

var google = require('googleapis');
var credentials = require('./spreadsheet-credentials.json');
var auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.pivate_key,
  [
    'https://www.googleapis.com/auth/spreadsheets'
  ],
  null
);

google.options({auth});

var GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet('1Q25gnGC5R3uE4qQHON8njArLOeIcu0IvrbT1jTqy5QQ');

app.use(express.static('public'));

io.on('connection', newConnection);

function newConnection(socket) {
  //socket code here
}
