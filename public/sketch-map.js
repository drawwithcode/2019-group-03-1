var socket = io();
const mappa = new Mappa("Mapbox", "pk.eyJ1IjoiZ2lvdmFubmljb3ZyZSIsImEiOiJjazJ2MWpobHYwMGR4M2JucWxvMmYybnBhIn0.YBqPhOlRb-R9TlQYdkEmqQ");

var zoomLevel = 16;
let pixelMap;
let userPosition;

let canvas;

var latMiAmi = 45.4637478;
var lonMiAmi = 9.2858445;

const options = {
  lat: 0,
  lng: 0,
  zoom: zoomLevel,
  studio: true,
  style: "mapbox://styles/giovannicovre/ck3fyg3vo08bf1cpn7h3zmqx8"
}

function preload() {
  userPosition = getCurrentPosition();
  markerUser = loadImage("assets/img/marker-user.png");
  markerSword = loadImage("assets/img/marker-sword.png");
  box = loadImage("assets/img/map-box.svg");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);

  options.lat = userPosition.latitude;
  options.lng = userPosition.longitude;

  pixelMap = mappa.tileMap(options);
  pixelMap.overlay(canvas);
}

function draw() {

  clear();

  //Constantly update position
  navigator.geolocation.getCurrentPosition(changePos);

  //Distance between the user and the sword in meters
  var userswordDistance = calcGeoDistance(userPosition.latitude, userPosition.longitude, latMiAmi, lonMiAmi, "km")*1000;

  var pointUser = pixelMap.latLngToPixel(userPosition.latitude, userPosition.longitude);
  var pointSword = pixelMap.latLngToPixel(latMiAmi, lonMiAmi);

  if(userswordDistance<50){
    window.location.href = "the_sword_in_the_stone.html";
  }

  //Line
  strokeWeight(4);
  stroke(255,0,0);
  line(pointUser.x, pointUser.y, pointSword.x, pointSword.y);

  fill(255,0,0);

  //Marker Sword
  image(markerSword, pointSword.x-markerSword.width/2, pointSword.y-markerSword.height/1.5);

  //Marker User
  image(markerUser, pointUser.x-markerUser.width/2, pointUser.y-markerUser.height/2);

  noStroke();

  //Distance box and text
  box.resize(window.innerWidth - 32, 0);
  image(box,16,windowHeight-box.height-24);
  textFont("VT323");
  textSize(20);
  fill("white");
  textAlign(LEFT);
  text("There are " + Math.round(userswordDistance) + " meters between you and the Sword", 64, windowHeight-box.height-24+box.height/3, windowWidth-120, 50);
}

//Position update function
function changePos(position) {
  userPosition.latitude = position.coords.latitude;
  userPosition.longitude = position.coords.longitude;
}
