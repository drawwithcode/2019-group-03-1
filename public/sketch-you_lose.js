let animationCount = 0;
let soundCount = 0;

function preload() {
  loseAnimation = loadImage("assets/animation/you_lose-animation.gif");
  loseSound = loadSound("assets/sound/you_lose-sound.mp3");
  loseImg = loadImage("assets/img/you_lose-img.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  buttonDom = createImg("assets/img/index-button.svg");
  buttonDom.position(windowWidth / 2 - 112, windowHeight / 2 + 20 + windowHeight / 6);
  buttonDom.size(224, 124);
  buttonDom.addClass("blinker-box");
  buttonDom.mousePressed(startAnimation);

  divDom = createDiv("PRESS HERE");
  divDom.position(windowWidth / 2 - 78, windowHeight / 2 + 74 + windowHeight / 6);
  divDom.addClass("blinker-text");
  divDom.mousePressed(startAnimation);
}

function draw() {
  if (animationCount == 1) {
    removeElements();
    if (soundCount == 1) {
      loseSound.play();
      soundCount++;
    }
    backgroundImage(loseAnimation);
    setTimeout(changeBackground, 5000);
  } else if (animationCount > 1) {
    backgroundImage(loseImg);

  }
}

function startAnimation() {
  animationCount++;
  soundCount++;
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
  animationCount++;
}
