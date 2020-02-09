var bg, spada, rocciaBottom, rocciaTop;
var bgImg, spadaImg, rocciaBottomImg, rocciaTopImg;
var pix;
var stelline = [];
var hammer;
var pullsCount;
var usersCount;

var bar;
var barCursor;
var personalCountDown;
var timer;

let userPosition;
var userswordDistance;

let pressStart2P, vt323;

var latMiAmi = 45.4637478;
var lonMiAmi = 9.2858445;

function preload() {
  if (window.innerWidth < 575) {
    bgImg = loadImage(
      "assets/the-sword-in-the-stone/spada_roccia-background.png"
    );
  } else {
    bgImg = loadImage(
      "assets/the-sword-in-the-stone/spada_roccia-background_desktop.png"
    );
  }
  box = loadImage("assets/img/intro-box.svg");
  spadaImg = loadImage("assets/the-sword-in-the-stone/spada.png");
  rocciaBottomImg = loadImage(
    "assets/the-sword-in-the-stone/roccia_bottom.png"
  );
  rocciaTopImg = loadImage("assets/the-sword-in-the-stone/roccia_top.png");

  //WEBGL requires loadFont
  pressStart2P = loadFont("font/PressStart2P-Regular.ttf");
  vt323 = loadFont("font/VT323-Regular.ttf");
}

function setup() {
  userPosition = getCurrentPosition();

  createCanvas(windowWidth, windowHeight, WEBGL);
  imageMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(30);

  if (window.innerWidth > 575) {
    pix = round(width / 181);
  } else {
    pix = round(width / 51);
  }
  personalCountDown = 300;

  var stellina1 = new Stellina(15, 35, 120);
  var stellina2 = new Stellina(25, 25, 90);
  var stellina3 = new Stellina(35, 45, 60);
  stelline.push(stellina1, stellina2, stellina3);
  spada = new Spada(27, 30);
  swipeBar = new Bar(26, 60, 32);
  barCursor = new BarCursor(26, 60);

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

  var warning =
    "Ops...\nYou crossed the border of the Reign!\n\nIf you still desire to be the King, please return to the magic spot!";

  //NOT MOBILE DEVICES
  if (window.innerWidth > 575) {
    //Background image
    bg = image(bgImg, width / 2, height / 2, width, width * 0.62);
    //Top area of the rock
    rocciaTop = image(
      rocciaTopImg,
      width / 2,
      height / 1.5,
      height / 3.5,
      (height / 3.5) * 1.14
    );
    //Display sword
    spada.display();
    //Bottom area of the rock
    rocciaBottom = image(
      rocciaBottomImg,
      width / 2,
      height / 1.5,
      height / 3.5,
      (height / 3.5) * 1.14
    );
    noStroke();
    //WHITE BOX
    push();
    fill(231, 234, 225);
    rect(width / 2, height / 1.1, width / 2 + 6 * pix, pix * 5);
    rect(width / 2, height / 1.1, width / 2 + 4 * pix, pix * 7);
    pop();
    push();
    fill(20);
    textSize(50);
    textFont(vt323);
    textAlign(CENTER);
    text("CONNECTED USERS: " + usersCount, width / 2, height / 1.08);
    pop();
  }
  //MOBILE DEVICES
  else {
    //Constantly update position
    navigator.geolocation.getCurrentPosition(changePos);

    //Distance between the user and the sword in meters
    userswordDistance =
      calcGeoDistance(
        userPosition.latitude,
        userPosition.longitude,
        latMiAmi,
        lonMiAmi,
        "km"
      ) * 1000;

    //Background image
    bg = image(bgImg, width / 2, height / 2, width, width * 1.78);
    //Top area of the rock
    rocciaTop = image(
      rocciaTopImg,
      width / 2,
      height / 1.5,
      width / 1.8,
      (width / 1.8) * 1.14
    );
    //Display sword
    spada.display();
    //Bottom area of the rock
    rocciaBottom = image(
      rocciaBottomImg,
      width / 2,
      height / 1.5,
      width / 1.8,
      (width / 1.8) * 1.14
    );
    //Display stars
    for (var i = 0; i < stelline.length; i++) {
      stelline[i].display();
      stelline[i].animate();
    }

    swipeBar.display();
    if (personalCountDown == 0) {
      barCursor.display();
      barCursor.animate();
    } else if (personalCountDown > 0) {
      timer = Math.round(personalCountDown / 30);
      var timerText = timer.toString();
      personalCountDown -= 1;
      fill(20);
      textSize(50);
      textFont(vt323);
      textAlign(CENTER);
      text(timerText, swipeBar.x, swipeBar.y + height * 0.02);
    }

    //   bar.displayWhite();
    //   var timerText;
    //
    //   if (personalCountDown <= 0){
    //   bar.display();
    //   barCursor.display();
    //   barCursor.animate();
    // } else {
    //   if (personalCountDown >= 15){
    //     timer = Math.round(personalCountDown / 30);
    //     timerText = timer.toString();
    //     bar.width = 5 * pix;
    //   } else {bar.width = 32 * pix; timerText = 'TRY TO WIN!';};
    //   push();
    //   textAlign(CENTER,CENTER);
    //   fill("black");
    //   textSize(50);
    //   textFont(vt323);
    //   text(timerText, bar.x, bar.y - pix);
    //   pop();
    //   personalCountDown -= 1;
    // }

    //User out of the area
    if (userswordDistance > 50000) {
      //Box
      box.resize(0, window.innerHeight - 48);
      image(box, (width - box.width) / 2, (height - box.height) / 2);

      //Title
      push();
      fill(255);
      textSize(20);
      textFont(pressStart2P);
      textAlign(CENTER, CENTER);
      translate(windowWidth / 2, windowHeight / 5);
      textLeading(28);
      text("ATTENTION!", 0, 0);
      pop();

      //TEXT
      push();
      fill(255);
      textSize(20);
      textLeading(24);
      textFont(vt323);
      textAlign(LEFT, CENTER);
      translate(windowWidth / 2, windowHeight / 2.2);
      text(warning, 0, 0, windowWidth - 180, windowHeight);
      pop();
    }
  }
}

//STAR OBJECT
function Stellina(_x, _y, _opacity) {
  this.x = pix * _x;
  this.y = pix * _y;
  this.opacity = _opacity;
  this.moveTime = this.opacity / 12;

  this.animate = function() {
    this.moveTime -= 1;
    if (this.moveTime <= 0) {
      this.x = pix * _x + random(1, 6) * pix;
      this.y = pix * _y + random(1, 6) * pix;
      this.moveTime = 10;
    }
    this.opacity -= 10;
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

function Bar(_x, _y, _width) {
  this.x = width / 2;
  this.y = height / 1.2;
  this.width = width / 1.5;

  // this.displayWhite = function() {
  //   push();
  //   noStroke();
  //   //WHITE BOX
  //   fill(231, 234, 225);
  //   rect(this.x, this.y, this.width + 6*pix, pix * 5);
  //   rect(this.x, this.y, this.width + 4*pix, pix * 7);
  //   pop();
  // };

  this.display = function() {
    noStroke();
    //WHITE BOX
    fill(231, 234, 225);
    rect(this.x, this.y, this.width + 6 * pix, pix * 5);
    rect(this.x, this.y, this.width + 4 * pix, pix * 7);
    //RED BAR
    push();
    fill(179, 40, 30);
    rect(this.x, this.y, this.width, pix);
    pop();
    //ORANGE BAR
    push();
    fill(255, 112, 70);
    rect(this.x, this.y, this.width / 1.8, pix);
    pop();
    //GREEN BAR
    push();
    fill(75, 224, 70);
    rect(this.x, this.y, this.width / 5, pix);
    pop();
  };
}

function BarCursor(_x, _y) {
  this.x = width / 2;
  this.y = height / 1.2;
  this.direction = 1;

  this.display = function() {
    push();
    translate(this.x, this.y);
    rotate(45);
    noFill();
    strokeWeight(pix);
    stroke(43, 115, 137);
    rect(0, 0, 2 * pix, 2 * pix);
    pop();
  };

  this.animate = function() {
    this.x += this.direction * pix;
    if (
      this.x >= swipeBar.x + swipeBar.width / 2 ||
      this.x <= swipeBar.x - swipeBar.width / 2
    ) {
      this.direction *= -1;
    }
  };
}

//SWORD OBJECT
function Spada(_x, _y) {
  this.x = width / 1.95;
  this.y = height / 1.8;

  this.display = function() {
    if (windowWidth <= windowHeight) {
      image(
        spadaImg,
        this.x,
        this.y - pix * pullsCount,
        width / 2.8,
        (width / 2.8) * 2.3
      );
    } else {
      image(
        spadaImg,
        this.x,
        this.y - pix * pullsCount,
        height / 5.5,
        (height / 5.5) * 2.3
      );
    }
  };
}

//HANDLES THE USER'S SWIPE
function swiped() {
  if (personalCountDown == 0) {
    if (
      barCursor.x >= swipeBar.x - swipeBar.width / 10 &&
      barCursor.x <= swipeBar.x + swipeBar.width / 10
    ) {
      socket.emit("swordPull");
    }
  }
  personalCountDown = 300;
}

//UPDATES PULL COUNT USING DATA FROM THE SERVER EVERY TIME THE SWORD IS PULLED
socket.on("pullsCountFromServer", function(data) {
  pullsCount = data;
  console.log(pullsCount);
});

//UPDATES USERS COUNT USING DATA FROM THE SERVER FOR EVERY NEW CONNECTION OR DISCONNECTION
socket.on("usersCountFromServer", function(data) {
  usersCount = data;
  console.log(usersCount + "connected users");
});

//LISTEN FOR WIN OR LOSE EVENTS FROM SERVER
socket.on("winner", youWon);
socket.on("loser", youLose);

//FUNCTION CALLED WHEN YOU WIN
function youWon() {
  pullsCount += 5;
  console.log("winner!!");
}
//FUNCTION CALLED WHEN SOMEONE ELSE WINS
function youLose() {
  pullsCount += 50;
  console.log("loser!!");
}

//POSITION UPDATE FUNCTION
function changePos(position) {
  userPosition.latitude = position.coords.latitude;
  userPosition.longitude = position.coords.longitude;
}
