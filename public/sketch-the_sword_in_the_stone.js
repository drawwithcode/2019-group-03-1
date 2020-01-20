var socket = io();
var bg, spada, rocciaBottom, rocciaTop;
var bgImg, spadaImg, rocciaBottomImg, rocciaTopImg;
var pix;
var stelline = [];
var stellina1, stellina2, stellina3;
var hammer;

function preload() {
  bgImg = loadImage("assets/the-sword-in-the-stone/spada_roccia-background.png");
  spadaImg = loadImage("assets/the-sword-in-the-stone/spada.png");
  rocciaBottomImg = loadImage("assets/the-sword-in-the-stone/roccia_bottom.png");
  rocciaTopImg = loadImage("assets/the-sword-in-the-stone/roccia_top.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(5);
  pix = round(width / 51);

  stellina1 = new Stellina(15, 35, 120);
  stellina2 = new Stellina(25, 25, 90);
  stellina3 = new Stellina(35, 45, 60);
  stelline.push(stellina1, stellina2, stellina3);
  spada = new Spada(19, 30);

  var options = {
    preventDefault: true
  };
  hammer = new Hammer(document.body, options);
  hammer.get("swipe").set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipeup", swiped);
}

function draw() {
  clear();
  translate(-width / 2, -height / 2);
  //BACKGROUND IMAGE
  bg = image(bgImg, 0, 0, width, width * 1.78);
  //TOP AREA OF THE ROCK IMAGE
  rocciaTop = image(rocciaTopImg, pix * 12, pix * 45, pix * 30, pix * 30 * 1.14);
  //DISPLAYS THE SWORD
  spada.display();
  //BOTTOM AREA OF THE ROCK
  rocciaBottom = image(rocciaBottomImg, pix * 12, pix * 45, pix * 30, pix * 30 * 1.14);
  //DISPLAYS ALL THE STARS
  for (var i = 0; i < stelline.length; i++) {
    stelline[i].display();
    stelline[i].animate();
  }
}

//STAR OBJECT
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
  };

  this.display = function() {
    push();
    noStroke();
    fill(255, 255, 255, this.opacity);
    rect(this.x, this.y, pix * 5, pix);
    pop();
    push();
    noStroke();
    fill(255, 255, 255, this.opacity);
    rect(this.x, this.y, pix, pix * 5);
    pop();
  };
}

//SWORD OBJECT
function Spada(_x, _y) {
  this.x = pix * _x;
  this.y = pix * _y;

  this.display = function() {
    image(spadaImg, this.x, this.y, pix * 19, pix * 19 * 2.3);
  };

  this.lift = function() {
    this.y -= pix * 1;
  };
}

//HANDLES THE USER'S SWIPE
function swiped() {
  spada.lift();
}
