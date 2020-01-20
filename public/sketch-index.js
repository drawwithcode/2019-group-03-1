var socket = io();
var logo, linkDom;
var pix;
var stelline = [];
var stellina;

function preload() {
  logo = loadImage("assets/img/logo.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
  frameRate(5);

  pix = round(width / 51);

  stellina1 = new Stellina(12, 40, 120);
  stellina2 = new Stellina(20, 24, 90);
  stellina3 = new Stellina(35, 40, 60);
  stelline.push(stellina1, stellina2, stellina3);

  var options = {
    preventDefault: true
  };

  //PRESS START
  linkDom = createA("welcome.html", "PRESS START", "_self");
  linkDom.position(windowWidth / 2 - 88, windowHeight / 2 +64);
  linkDom.addClass("welcome-link");
}

function draw() {
  background(12,18,28);

  //LOGO
  logo.resize(window.innerWidth - 48, 0);
  image(logo, windowWidth / 2, windowHeight / 2.4);

  for (var i = 0; i < stelline.length; i++) {
    stelline[i].display();
    stelline[i].animate();
  }
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
    translate(-pix*2,pix *2);
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
