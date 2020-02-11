//SETTING UP THE SERVER AND THE SOCKET
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require("socket.io")(server);
//NUMBER OF TOTAL PULLS THAT ENDS THE GAME
var maxPullsCount = 23;
//INITIAL NUMBER OF CONNECTED USERS
var updatedUsers = 0;
//INITIAL NUMBER OF TOTAL SWORD PULLS
var updatedPulls = 0;
//NUMBER OF SECONDS WITHOUT SUCCESSFUL SWIPES AFTER WHICH THE STATE OF THE SWORD IS REFRESHED
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

//GLOBAL VARIABLES USED TO STORE AND UPDATE THE NAME OF THE KING RECEIVED FROM USERS AND DATABASE
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

//UPDATES THE CURRENT KING'S NAME IN THE DATABASE USING THE VALUES PROVIDED BY THE WINNER USER
function updateKingName(name) {
  updater = { values: [[name]] };
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "swordInStoneData!B1",
    valueInputOption: "USER_ENTERED",
    resource: updater
  });
}

//CALLS THE newConnection FUNCTION FOR EACH NEW CONNECTION
io.on("connection", newConnection);

function newConnection(socket) {
  //UPDATES THE NUMBER OF USERS FOR EACH NEW CONNECTION
  updatedUsers++;
  console.log(updatedUsers);
  //LISTENS FOR NEW SUCCESSFUL SWORD PULLS
  socket.on("swordPull", function() {
    //CHECKS IF THIS IS THE DECISIVE SWIPE
    if (updatedPulls === maxPullsCount - 1) {
      //MAKES THE SWORD "DISAPPEAR" WHEN THE GAME ENDS
      updatedPulls += 1000;
      //CALLS DIFFERENT EVENTS FOR THE WINNER AND EVERYONE ELSE
      socket.emit("winner");
      socket.broadcast.emit("loser");
    } else {
      //INCREASES THE TOTAL NUMBER OF PULLS BY 1
      updatedPulls += 1;
      swordTimerCount = 30;
      //TRIGGERS AN ANIMATION SHOWING A PULL FROM ANOTHER USER
      socket.broadcast.emit("enemyRay");
      //SENDS THE UPDATED NUMBER OF PULLS TO EACH USER
      io.emit("pullsCountFromServer", updatedPulls);
    }
  });
  //LISTENS FOR A REQUEST OF THE KING'S NAME BY THE CLIENT
  socket.on("requestKingName", function() {
    //SENDS THE KING'S NAME TO THE CLIENT
    socket.emit("kingNameFromServer", kingName);
  });
  //LISTENS FOR THE SUBMITION OF A NEW KING'S NAME FROM THE WINNER'S SOCKET
  socket.on("submitName", function(submittedName) {
    //UPDATES THE NAME BOTH IN THE DATABASE AND THE SERVER
    updateKingName(submittedName);
    kingName = submittedName;
  });
  //SENDS THE UPDATED TOTAL NUMBER OF PULLS TO ALL CLIENTS FOR EVERY NEW CONNECTION
  io.emit("pullsCountFromServer", updatedPulls);
  socket.on("disconnect", function() {
    //UPDATES THE NUMBER OF CONNECTED USERS FOR EACH NEW DISCONNECTION
    updatedUsers--;
    //SENDS THE NUMBER OF CONNECTED USERS TO ALL CLIENTS
    io.emit("usersCountFromServer", updatedUsers);
    console.log(updatedUsers);
  });
  //SENDS THE NUMBER OF CONNECTED USERS TO ALL CLIENTS
  io.emit("usersCountFromServer", updatedUsers);
}

//CALLING THE getKingName AND swordTimeOut FUNCTIONS WHEN THE SERVER GETS STARTED
getKingName();
swordTimeOut();

//MAKES THE SWORD GET BACK TO THE INITIAL POSITION AFTER 15 SECONDS WITHOUT ANY SUCCESSFUL SWIPE
function swordTimeOut() {
  if (swordTimerCount == 0 && updatedPulls < 1000) {
    //RESTORES THE INITIAL STATE OF THE SWORD
    updatedPulls = 0;
    //SENDS THE UPDATED STATE OF THE SWORD TO CLIENTS
    io.emit("pullsCountFromServer", updatedPulls);
  }
  // DECREASES THE COUNTDOWN BY 1 AND REPEATS THE WHOLE PROCESS EVERY SECOND
  setTimeout(function() {
    swordTimerCount--;
    swordTimeOut();
  }, 1000);
}
