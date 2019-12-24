var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('public'));

io.on('connection', newConnection);

function newConnection(socket) {
  //socket code here
}
