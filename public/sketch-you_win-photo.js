//GENERAL VAR
var bg, box, snap, img, casellaNome;

//WEBCAM VAR
var capture;
var foto;
var pixelGrid = []; //contains the grid made from CAPTURE
var rec = false; //play and stop the rec
var pixelColor = 10; //base color of pixels of the PIXELGRID
var xStart;
var xFin;
var yStart;
var yFin;

function preload() {
  bg = loadImage("assets/img/intro-background.svg");
  box = loadImage("assets/img/winner-box.svg");
  snap = loadImage("assets/img/snap-button.svg");
  logo1 = loadImage("assets/img/logo.png");
  crown = loadImage("assets/img/crown.svg");
  typeY = loadImage("assets/img/type.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  box.resize(0, window.innerHeight - 48);

  //WEBCAM
  capture = createCapture(VIDEO);
  capture.size(320 - 320 / 4, 260 - 260 / 4);
  capture.hide();
  //Set the points of the capture rectangle
  xStart = windowWidth / 2 - capture.width / 2;
  yStart = windowHeight / 2 - capture.height + capture.height / 2;
  xFin = windowWidth / 2 + capture.width / 2;
  yFin = windowHeight / 2 + capture.height / 2;

  //INPUT NAME
  casellaNome = createInput("");
  casellaNome.position(
    windowWidth / 2 - box.width / 4,
    windowHeight / 2 + box.width / 2.1
  );
  casellaNome.style("width", box.width / 2 + "px");
  casellaNome.style("height", "30px");
  casellaNome.style("color", "FFFFFF");
  casellaNome.style("z-index", 999);
  casellaNome.input(myInputEvent);
}

function draw() {
  var winner = "CONGRATULATIONS!\nYou are the KING";
  backgroundImage(bg);

  //WEBCAM
  push();
  var foto = capture.loadPixels();
  imageMode(CORNER);
  image(foto, xStart, yStart, capture.width, capture.height);
  gridCreate(xStart, xFin, yStart, yFin, 6);
  for (var i = 0; i < pixelGrid.length; i++) {
    var p = pixelGrid[i];
    p.display();
  }
  pop();

  //BLACK BOX
  push();
  imageMode(CENTER);
  box.resize(0, window.innerHeight - 48);
  image(box, windowWidth / 2, windowHeight / 2);
  pop();

  //TEXT
  push();
  fill(255);
  textSize(24);
  textLeading(25);
  textFont("VT323");
  textAlign(CENTER);
  translate(windowWidth / 2 - (windowWidth - 180) / 2, windowHeight / 7);
  text(winner, 0, 0, windowWidth - 170, windowHeight);
  pop();

  //CROWN
  push();
  imageMode(CENTER);
  crown.resize(box.width / 2, 0);
  image(crown, windowWidth / 2, windowHeight / 2 - box.width / 3);
  pop();

  //IMAGE "TYPE YOUR NAME"
  typeY = createImg("assets/img/type.svg");
  typeY.position(
    windowWidth / 2 - box.width / 3.2,
    windowHeight / 2 + box.width / 3.2
  );
  typeY.style("width", box.width / 1.6 + "px");

  //BUTTON TO SAVE SCREEN
  snap = createImg("assets/img/snap-button.svg");
  snap.position(
    windowWidth / 2 - box.width / 3.2,
    windowHeight / 2 + box.width / 1.6
  );
  snap.style("width", box.width / 1.6 + "px");
  snap.mousePressed(savePhoto);
}

//PIXELGRID array getting the color of the capture
function gridCreate(_xStart, _xFin, _yStart, _yFin, _dim) {
  var pos = 0; //position in the array
  for (var x = _xStart; x < _xFin; x += _dim) {
    for (var y = _yStart + 1; y < _yFin; y += _dim) {
      var color = get(x, y); //get the COLOR in the X an Y position
      var tempPixel = new Pixel(x, y, color, _dim); //create the PIXEL object

      pixelGrid[pos] = tempPixel; //put the PIXEL in the PIXELGRID array
      pos++; //Go to the next element in the array
    }
  }
}

//PIXEL COLOR
function Pixel(_x, _y, _color, _dim) {
  this.x = _x;
  this.y = _y;
  this.color = _color;
  this.dim = _dim;

  this.display = function() {
    noStroke();
    fill(this.color);
    square(this.x, this.y, this.dim);
  };
}

//INPUT CHECK
function myInputEvent() {
  console.log("you are typing: ", this.value());
}

//SAVE YOUR WINNING
function savePhoto() {
  socket.emit("submitName", casellaNome.value());
  //Logo
  imageMode(CENTER);
  logo1.resize(box.width / 1.6, 0);
  image(logo1, windowWidth / 2, windowHeight / 2 + box.width / 1.8);
  //Save img
  saveCanvas("king", "jpg");
}

//BACKGROUND IMAGE
function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  let scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width * scale, img.height * scale);
  pop();
}

function touchMoved() {
  return false;
}
