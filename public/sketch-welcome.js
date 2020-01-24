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
  var intro = "Once upon a time, in a village called Mi Ami Festival, there was a sword stuck in a stone. The legend says that whoever pulls out the sword is the true king of the day.\n\nTake part in the race to conquer the throne!";

  //BACKGROUND
  backgroundImage(bg);

  //BOX
  box.resize(0, window.innerHeight - 48);
  image(box, windowWidth / 2, windowHeight / 2);

  //TITLE
  push();
  fill(255);
  textSize(20);
  textFont("PressStart2P");
  textAlign(CENTER,CENTER);
  translate(windowWidth/2,windowHeight/5.6);
  textLeading(28);
  text("WELCOME TO\nMI AMI", 0, 0);
  pop();

  //TEXT
  push();
  fill(255);
  textSize(20);
  textLeading(24);
  textFont("VT323");
  textAlign(LEFT,CENTER);
  translate(windowWidth/2-(windowWidth-180)/2,0);
  text(intro, 0, -10, windowWidth-180, windowHeight);
  pop();

  //BUTTON
  buttonDom = createImg("assets/img/intro-button.svg");
  buttonDom.position((windowWidth - box.width) / 2 + 60, (windowHeight + box.height) / 2.3);
  buttonDom.style("width", box.width - 120 + "px");
  buttonDom.mousePressed(changePage);
}

function changePage() {
  window.open("instructions_1.html", "_self");
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
