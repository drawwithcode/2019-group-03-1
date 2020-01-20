var bg, box, button, buttonDom;

function preload() {
  bg = loadImage("assets/img/intro-background.svg");
  box = loadImage("assets/img/intro-box.svg");
  button = loadImage("assets/img/instructions-button.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  var intro = "If you are far from the sword you can follow the map of the Kingdom to the magic spot.\n\nWhen you are near enough to try your chance of winning, you can move the sword by dragging it. ";

  //BACKGROUND
  backgroundImage(bg);

  //BOX
  box.resize(0, window.innerHeight - 48);
  image(box, windowWidth / 2, windowHeight / 2);

  //BUTTON
  buttonDom = createImg("assets/img/instructions-button.svg");
  buttonDom.position((windowWidth - box.width) / 2 + 60, (windowHeight + box.height) / 2.5);
  buttonDom.style("width", box.width - 120 + "px");
  buttonDom.mousePressed(changePage);

  //TITLE
  push();
  fill(255);
  textSize(20);
  textFont("PressStart2P");
  textAlign(CENTER,CENTER);
  translate(windowWidth/2,windowHeight/5);
  textLeading(28);
  text("HOW TO\nBE KING", 0, 0);
  pop();

  //TEXT
  push();
  fill(255);
  textSize(20);
  textLeading(24);
  textFont("VT323");
  textAlign(LEFT,CENTER);
  translate(windowWidth/2-(windowWidth-180)/2,0);
  text(intro, 0, -24, windowWidth-180, windowHeight);
  pop();
}

function changePage() {
  window.open("instructions_2.html", "_self");
}

function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  let scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width * scale, img.height * scale)
  pop();
}

function touchMoved() {
  return false;
}
