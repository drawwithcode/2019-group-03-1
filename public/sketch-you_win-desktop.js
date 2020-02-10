let bgCounter = 0;

function preload() {
  winAnimation = loadImage("assets/animation/you_win-animation-desktop.gif");
  winSound = loadSound("assets/sound/you_win-sound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  //If the device is not desktop go to index.html
  if(windowWidth<576){
    window.open("index.html", "_self");
  }
  setTimeout(changeBackground, 6000);
  if (bgCounter == 0) {
    winSound.play();
    bgCounter++;
  }
  if (bgCounter == 1) {
    backgroundImage(winAnimation);
  } else {
    background(0);

    //New king text
    textFont("PressStart2P");
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255);
    text("WE HAVE A NEW KING!", width / 2, height / 2);
  }
}

function backgroundImage(img) {
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  let scale = Math.max(width / img.width, height / img.height);
  image(img, 0, 0, img.width * scale, img.height * scale)
  pop();
}

function changeBackground() {
  bgCounter++;
}
