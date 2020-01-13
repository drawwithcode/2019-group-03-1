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
}

function changePage() {
  window.open('the_sword_in_the_stone.html', '_self');
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
