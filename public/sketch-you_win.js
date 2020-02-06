let animationCount = 0;
let soundCount = 0;

function preload() {
  winAnimation = loadImage("assets/animation/you_win-animation.gif");
  winSound = loadSound("assets/sound/you_win-sound.mp3");
  winImg = loadImage("assets/img/you_win-img.png");
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
    setTimeout(changeBackground, 6000);
    if (soundCount == 1) {
      winSound.play();
      soundCount++;
    }
    backgroundImage(winAnimation);
  } else if (animationCount > 1) {
    backgroundImage(winImg);
    changePage();
    //You win text
    textFont("PressStart2P");
    textSize(36);
    textAlign(CENTER, CENTER);
    fill(255);
    text("YOU  WIN", width/2, height/2);
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

function changePage() {
  //PAGINA CHE STA FACENDO LA FRA
  window.open("index.html", "_self");
}
