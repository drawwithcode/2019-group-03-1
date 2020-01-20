var logo, linkDom;
var pix;
var stelline = [];
var stellina;

function preload() {
  logo = loadImage("assets/img/logo.svg");
}

function setup() {
  var buttonDom;

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
  frameRate(5);

  pix = round(width / 51);

  stellina1 = new Stellina((width / 4) / pix, (height / 2.2) / pix, 120);
  stellina2 = new Stellina((width / 2) / pix, (height / 4) / pix, 90);
  stellina3 = new Stellina((width / 1.5) / pix, (height / 2.2) / pix, 60);
  stelline.push(stellina1, stellina2, stellina3);

  var options = {
    preventDefault: true
  };

  //PRESS START
  buttonDom = createImg("assets/img/index-button.svg");
  buttonDom.position(windowWidth / 2 - 112, windowHeight / 2 + 20 + 110);
  buttonDom.size(224,124);
  buttonDom.addClass("welcome-link");
  buttonDom.mousePressed(changePage);

  linkDom = createA("welcome.html", "PRESS START", "_self");
  linkDom.position(windowWidth / 2 - 88, windowHeight / 2 + 74 + 110);
  linkDom.addClass("welcome-link");

}

function draw() {
  background(0);

  //LOGO
  logo.resize(window.innerWidth - 48, 0);
  image(logo, windowWidth / 2, windowHeight / 2.4);

  for (var i = 0; i < stelline.length; i++) {
    stelline[i].display();
    stelline[i].animate();
  }
}

function changePage() {
  window.open("welcome.html", "_self");
}

function Stellina(_x, _y, _opacity) {

  this.x = pix * _x;
  this.y = pix * _y;
  this.opacity = _opacity;

  this.animate = function() {
    this.x = pix * _x + random(1, 6) * pix;
    this.y = pix * _y + random(1, 6) * pix;
    this.opacity -= 30;
    if (this.opacity <= 0) {
      this.opacity = 120;
    }
  }

  this.display = function() {
    push();
    noStroke();
    fill(255, 255, 255, this.opacity);
    translate(-pix * 2, pix * 2);
    rect(this.x, this.y, pix * 5, pix);
    pop();
    push();
    noStroke();
    fill(255, 255, 255, this.opacity);
    rect(this.x, this.y, pix, pix * 5);
    pop();
  }
}

function touchMoved() {
  return false;
}
