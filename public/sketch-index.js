var bg, box, button, buttonDom;

function preload() {
  bg = loadImage("assets/img/intro-background.svg");
  box = loadImage("assets/img/intro-box.svg");
  button = loadImage("assets/img/intro-button.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  var intro = "Take part in the race to conquer the throne!\n\nDraw the sword from the rock and defeat your rivals to become king for a day!";

  //BACKGROUND
  backgroundImage(bg);

  //BOX
  box.resize(0, window.innerHeight - 48);
  //box.resize(window.innerWidth - 48, 0);
  image(box, windowWidth / 2, windowHeight / 2);

  //TITLE
  push();
  fill(255);
  textSize(20);
  textFont("PressStart2P");
  textAlign(CENTER,CENTER);
  translate(windowWidth/2,windowHeight/6);
  text("WELLCOME", 0, 0);
  pop();

  //TEXT
  push();
  fill(255);
  textSize(20);
  textLeading(24);
  textFont("VT323");
  textAlign(LEFT,CENTER);
  translate(windowWidth/2-(windowWidth-175)/2,0);
  text(intro, 0, -24, windowWidth-175, windowHeight);
  pop();

  //BUTTON
  buttonDom = createImg("assets/img/intro-button.svg");
  buttonDom.position((windowWidth - box.width) / 2 + 60, (windowHeight + box.height) / 2.5);
  buttonDom.style("width", box.width - 120 + "px");
  buttonDom.mousePressed(changePage);
}

function changePage() {
  window.open('instructions.html', '_self');
}

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
