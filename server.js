//SETTING UP THE SERVER AND THE SOCKET
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require("socket.io")(server);
var maxPullsCount = 23;
var updatedUsers = 0;
var updatedPulls = 0;
var swordTimerCount = 15;

//ENABLES THE APP TO ACCESS THE "PUBLIC" FOLDER
app.use(express.static("public"));
//SETTING UP THE GOOGLE API AND PROVIDING CREDENTIALS TO ACCESS THE DATA
var { google } = require("googleapis");
var credentials = require("./spreadsheet-credentials.json");
var auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"],
  null
);
//PROVIDING THE INFORMATIONS TO ACCESS THE DATABASE SPREADSHEET
google.options({
  auth
});
var sheets = google.sheets("v4");
var spreadsheetId = "1Q25gnGC5R3uE4qQHON8njArLOeIcu0IvrbT1jTqy5QQ";

//GLOBAL VARIABLES TO STORE AND UPDATE THE NAME OF THE KING RECEIVED FROM USERS AND DATABASE
var updater;
var kingName;

//GETS THE CURRENT KING'S NAME FROM THE DATABASE
function getKingName() {
  sheets.spreadsheets.values.get(
    {
      spreadsheetId,
      range: "swordInStoneData!B1"
    },
    (err, result) => {
      kingName = result.data.values[0][0];
      console.log(kingName);
    }
  );
}

getKingName();

//CALLS THE newConnection FUNCTION FOR EACH NEW CONNECTION
io.on("connection", newConnection);

function newConnection(socket) {
  //socket code here
  updatedUsers++;
  console.log(updatedUsers);
  // getPullsCount();
  socket.on("swordPull", function() {
    if (updatedPulls === maxPullsCount - 1) {
      updatedPulls += 1000;
      socket.emit("winner");
      socket.broadcast.emit("loser");
    } else {
      updatedPulls += 1;
      swordTimerCount = 30;
      socket.broadcast.emit("enemyRay");
      io.emit("pullsCountFromServer", updatedPulls);
    }
  });
  socket.on("requestKingName", function() {
    socket.emit("kingNameFromServer", kingName);
  });
  socket.on("submitName", function(submittedName) {
    updateKingName(submittedName);
    kingName = submittedName;
  });
  io.emit("pullsCountFromServer", updatedPulls);
  socket.on("disconnect", function() {
    updatedUsers--;
    io.emit("usersCountFromServer", updatedUsers);
    console.log(updatedUsers);
  });
  io.emit("usersCountFromServer", updatedUsers);
}

swordTimeOut();

function updateKingName(name) {
  updater = { values: [[name]] };
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "swordInStoneData!B1",
    valueInputOption: "USER_ENTERED",
    resource: updater
  });
}

function swordTimeOut() {
  if (swordTimerCount == 0 && updatedPulls < 1000) {
    updatedPulls = 0;
    io.emit("pullsCountFromServer", updatedPulls);
  }
  setTimeout(function() {
    swordTimerCount--;
    swordTimeOut();
  }, 1000);
}
