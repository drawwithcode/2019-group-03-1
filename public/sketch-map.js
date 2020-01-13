const mappa = new Mappa('Mapbox', "pk.eyJ1IjoiZ2lvdmFubmljb3ZyZSIsImEiOiJjazJ2MWpobHYwMGR4M2JucWxvMmYybnBhIn0.YBqPhOlRb-R9TlQYdkEmqQ");

var zoomLevel = 16;
let pixelMap;
let userPosition;

let canvas;

var latRossa = 45.5054758;
var lonRossa = 9.163077;

const options = {
  lat: 0,
  lng: 0,
  zoom: zoomLevel,
  studio: true,
  style: "mapbox://styles/giovannicovre/ck3fyg3vo08bf1cpn7h3zmqx8"
}

function preload() {
  userPosition = getCurrentPosition();
  markerUser = loadImage('assets/img/marker-user.png');
  markerSword = loadImage('assets/img/marker-sword.png');
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

  var userswordDistance = calcGeoDistance(userPosition.latitude, userPosition.longitude, latRossa, lonRossa, "km");

  var pointUser = pixelMap.latLngToPixel(userPosition.latitude, userPosition.longitude);
  var pointSword = pixelMap.latLngToPixel(latRossa, lonRossa);

  //Line
  strokeWeight(4);
  stroke(255,0,0);
  line(pointUser.x, pointUser.y, pointSword.x, pointSword.y);

  fill(255,0,0);

  //Marker Sword
  ellipse(pointSword.x, pointSword.y, 12);
  image(markerSword, pointSword.x-markerSword.width/2, pointSword.y-markerSword.height/1.5);

  //Marker User
  ellipse(pointUser.x, pointUser.y, 12);
  image(markerUser, pointUser.x-markerUser.width/2, pointUser.y-markerUser.height/2);

  noStroke();

  //Distance
  textSize(20);
  textAlign(RIGHT);
  //text("There are " + Math.round(userswordDistance) + " km between you and the Sword", windowWidth-48, windowHeight-48);
}
