//SETTING UP THE SERVER AND THE SOCKET
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port);
var socket = require("socket.io");
var io = socket(server);
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
google.options({ auth });
var sheets = google.sheets("v4");
var spreadsheetId = "1Q25gnGC5R3uE4qQHON8njArLOeIcu0IvrbT1jTqy5QQ";

//GLOBAL VARIABLES TO STORE AND UPDATE THE NUMBER OF PULLS RECEIVED FROM USERS AND DATABASE
var pulls = [[]];
var updatedPulls;
var updater;

//GETS THE CURRENT NUMBER OF PULLS FROM THE DATABASE
function getPullsCount() {
  sheets.spreadsheets.values.get(
    {
      spreadsheetId,
      range: "swordInStoneData!B1"
    },
    (err, result) => {
      pulls = [[Number(result.data.values[0][0])]];
      console.log(pulls);
      updatePulls();
    }
  );
}
//UPDATES THE DATABASE WITH THE NEW PULLS COUNT
function updatePulls() {
  updatedPulls = [[1 + pulls[0][0]]];
  updater = { values: updatedPulls };
  sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "swordInStoneData!B1",
    valueInputOption: "USER_ENTERED",
    resource: updater
  });
}

//ENABLES THE APP TO ACCESS THE "PUBLIC" FOLDER
app.use(express.static("public"));

//CALLS THE newConnection FUNCTION FOR EACH NEW CONNECTION
io.on("connection", newConnection);

function newConnection(socket) {
  //socket code here
  console.log("a new connection");
}

getPullsCount();
