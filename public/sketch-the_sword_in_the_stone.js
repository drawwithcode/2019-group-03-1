var bg, spada, rocciaBottom, rocciaTop;
var bgImg, spadaImg, rocciaBottomImg, rocciaTopImg, crownImg;
var rocciaX, rocciaY;
var pix;
var stelline = [];
var ray1, ray2, ray3, ray4;
var rayColor = "Aquamarine";
var hammer;
var pullsCount;
var usersCount;

var bar;
var barCursor;
var personalCountDown;
var timer;
var kingNameBox;

let userPosition;
var userswordDistance;

let pressStart2P, vt323;

var latMiAmi = 45.4637478;
var lonMiAmi = 9.2858445;

var king = "";

function preload() {
  if (window.innerWidth < 575) {
    bgImg = loadImage("assets/the-sword-in-the-stone/spada_roccia-background.png");
  } else {
    bgImg = loadImage("assets/the-sword-in-the-stone/spada_roccia-background_desktop.png");
  }
  box = loadImage("assets/img/intro-box.svg");
  spadaImg = loadImage("assets/the-sword-in-the-stone/spada.png");
  rocciaBottomImg = loadImage("assets/the-sword-in-the-stone/roccia_bottom.png");
  rocciaTopImg = loadImage("assets/the-sword-in-the-stone/roccia_top.png");
  crownImg = loadImage("assets/img/crown.svg");

  pressStart2P = loadFont("font/PressStart2P-Regular.ttf");
  vt323 = loadFont("font/VT323-Regular.ttf");
}

function setup() {
  userPosition = getCurrentPosition();

  createCanvas(windowWidth, windowHeight);
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
  rocciaX = width / 2;
  rocciaY = height / 1.5;

  var stellina1 = new Stellina(15, 35, 180);
  var stellina2 = new Stellina(25, 25, 120);
  var stellina3 = new Stellina(35, 45, 60);
  stelline.push(stellina1, stellina2, stellina3);
  spada = new Spada(27, 30);
  swipeBar = new Bar(26, 60, 32);
  barCursor = new BarCursor(26, 60);
  ray1 = new Ray(1, 0);
  ray2 = new Ray(1, 6);
  ray3 = new Ray(-1, 0);
  ray4 = new Ray(-1, 6);
  kingNameBox = new KingName();

  var options = {
    preventDefault: true
  };
  hammer = new Hammer(document.body, options);
  hammer.get("swipe").set({
    direction: Hammer.DIRECTION_ALL
  });

  hammer.on("swipeup", swiped);
  socket.emit("requestKingName");
}

function draw() {
  clear();

  var warning =
    "Ops...\nYou crossed the border of the Reign!\n\nIf you still desire to be the King, please return to the magic spot!";

  //NOT MOBILE DEVICES
  if (window.innerWidth > 575) {
    //Background image
    bg = image(bgImg, width / 2, height / 2, width, width * 0.62);
    //Top area of the rock
    rocciaTop = image(rocciaTopImg, rocciaX, rocciaY + pix, 30 * pix, 30 * pix * 1.14);
    //Display sword
    spada.display();
    //Bottom area of the rock
    rocciaBottom = image(
      rocciaBottomImg,
      rocciaX,
      rocciaY,
      30 * pix,
      30 * pix * 1.14
    );
    noStroke();
    //WHITE BOX
    push();
    fill(231, 234, 225);
    rect(width / 2, height / 1.1, width / 4 + 6 * pix, pix * 5);
    rect(width / 2, height / 1.1, width / 4 + 4 * pix, pix * 7);
    pop();
    push();
    fill(20);
    textSize(50);
    textFont(vt323);
    textAlign(CENTER);
    text("KNIGHTS: " + (usersCount - 1), width / 2, height / 1.08);
    pop();
    //display the animated "rays" that show up at every successful swipe
    ray1.display();
    ray2.display();
    ray3.display();
    ray4.display();
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
    rocciaTop = image(rocciaTopImg, rocciaX, rocciaY + pix, 30 * pix, 30 * pix * 1.14);
    //Display sword
    spada.display();
    //Bottom area of the rock
    rocciaBottom = image(rocciaBottomImg, rocciaX, rocciaY, 30 * pix, 30 * pix * 1.14);
    //Display stars
    for (var i = 0; i < stelline.length; i++) {
      stelline[i].display();
      stelline[i].animate();
    }
    //Display white box of timer and swipe bar
    swipeBar.displayWhite();
    //Dysplay and animate the swipe bar when the timer reaches 0
    if (personalCountDown == 0) {
      swipeBar.display();
      barCursor.display();
      barCursor.animate();
    //Display the timer during the countdown and a message during the last second of the countdown
    } else if (personalCountDown > 0 && pullsCount < 1000) {
      if (personalCountDown >= 15) {
        timer = Math.round(personalCountDown / 30);
        var timerText = timer.toString();
        swipeBar.width = 5 * pix;
      } else {
        var timerText = "TRY TO WIN!";
        swipeBar.width = width / 1.5;
      }
      personalCountDown -= 1;
      fill(20);
      textSize(50);
      textFont(vt323);
      textAlign(CENTER);
      text(timerText, width / 2, height / 1.17);
    }
    //display the animated "rays" that show up at every successful swipe
    ray1.display();
    ray2.display();
    ray3.display();
    ray4.display();

    //User out of the area
    if (userswordDistance > 5000000) {
      //Box
      box.resize(0, window.innerHeight - 48);
      image(box, width / 2, height / 2);

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
  kingNameBox.display();
}

//STAR OBJECT
function Stellina(_x, _y, _opacity) {
  this.x = pix * _x;
  this.y = pix * _y;
  this.opacity = _opacity;

  this.animate = function() {
    this.opacity -= 10;
    if (this.opacity <= 0) {
      //randomly change position every time the opacity is 0
      this.x = pix * _x + random(1, 6) * pix;
      this.y = pix * _y + random(1, 6) * pix;
      this.opacity = 180;
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

//RAY OBJECT
function Ray(_direction, _yOffset) {
  this.direction = _direction;
  this.x = rocciaX + (_yOffset / 3 * pix * this.direction) + 12 * pix  * this.direction;
  this.y = rocciaY - 10 * pix - _yOffset * pix;
  //initial state of the animation: inactive
  this.animationProgress = 16;
  this.display = function() {
    noStroke();
    fill(rayColor);
    //animation created with p5 rectanges and if conditions based on the animationProgress value
    if (this.animationProgress <= 3) {
      rect(this.x, this.y, pix, pix);
      rect(this.x + pix * this.direction, this.y, pix, pix);
      rect(this.x, this.y - pix, pix, pix);
    } else if (this.animationProgress > 3 && this.animationProgress <= 6) {
      rect(this.x, this.y, pix, pix);
      rect(this.x + pix * this.direction, this.y, pix, pix);
      rect(this.x, this.y - pix, pix, pix);
      rect(this.x + pix * this.direction, this.y - pix, pix, pix);
    } else if (this.animationProgress > 6 && this.animationProgress <= 9) {
      rect(this.x + pix * this.direction, this.y, pix, pix);
      rect(this.x, this.y - pix, pix);
      rect(this.x + pix * this.direction, this.y - pix, pix, pix);
      rect(this.x + 2 * pix * this.direction, this.y - 2 * pix, pix, pix);
      rect(this.x + 3 * pix * this.direction, this.y - 3 * pix, pix, pix);
      rect(this.x + 4 * pix * this.direction, this.y - 4 * pix, pix, pix);
    } else if (this.animationProgress > 9 && this.animationProgress <= 12) {
      rect(this.x + 3 * pix * this.direction, this.y - 3 * pix, pix, pix);
      rect(this.x + 4 * pix * this.direction, this.y - 4 * pix, pix, pix);
    } else if (this.animationProgress > 12 && this.animationProgress <= 15) {
      rect(this.x + 4 * pix * this.direction, this.y - 4 * pix, pix, pix);
    }
    this.animationProgress++;
  };
}

//KING NAME BOX OBJECT
function KingName() {
  this.width = pix * 30;
  this.x = width / 10;
  this.y = height / 10;
  this.display = function() {
    push();
    noStroke();
    //WHITE BOX
    fill(231, 234, 225);
    rect(this.x + this.width / 2, this.y, this.width + 6 * pix, pix * 7);
    rect(this.x + this.width / 2, this.y, this.width + 4 * pix, pix * 9);
    pop();
    //CROWN IMAGE
    image(crownImg, this.x + pix * 3, this.y, pix * 8, pix * 8);
    //TEXT SHOWING THE KING'S NAME
    push();
    fill(40);
    textSize(20);
    textFont(vt323);
    textAlign(LEFT, CENTER);
    translate(pix * 10, 0);
    textLeading(28);
    text(king, this.x, this.y);
    pop();
  };
}

//SWIPE BAR AND WHITE CONTAINER OBJECT
function Bar(_x, _y, _width) {
  this.x = width / 2;
  this.y = height / 1.2;
  this.width = width / 1.5;
  //Display the white container
  this.displayWhite = function() {
    if (pullsCount < 1000) {
      push();
      noStroke();
      //WHITE BOX
      fill(231, 234, 225);
      rect(this.x, this.y, this.width + 6 * pix, pix * 5);
      rect(this.x, this.y, this.width + 4 * pix, pix * 7);
      pop();
    }
  };
  //Display the swipe bar
  this.display = function() {
    if (pullsCount < 1000) {
      noStroke();
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
    }
  };
}

//BAR CURSOR OBJECT
function BarCursor(_x, _y) {
  this.x = width / 2;
  this.y = height / 1.2;
  this.direction = 1;
  //Display the cursor as a rotated square
  this.display = function() {
    if (pullsCount < 1000) {
      push();
      translate(this.x, this.y);
      rotate(45);
      noFill();
      strokeWeight(pix);
      stroke(43, 115, 137);
      rect(0, 0, 1.5 * pix, 1.5 * pix);
      pop();
    }
  };
  //Animate the cursor sliding on the bar
  this.animate = function() {
    this.x += this.direction * pix;
    if (
      this.x >= swipeBar.x + swipeBar.width / 2 || this.x <= swipeBar.x - swipeBar.width / 2) {
      this.direction *= -1;
    }
  };
}

//SWORD OBJECT
function Spada(_x, _y) {
  this.x = rocciaX + pix;
  this.y = rocciaY - 10 * pix;

  this.display = function() {
    image(spadaImg, this.x, this.y - pix * pullsCount, 19 * pix, 19 * pix * 2.3);
  };
}

//HANDLES THE USER'S SWIPE
function swiped() {
  if (personalCountDown == 0) {
    if (barCursor.x >= swipeBar.x - swipeBar.width / 10 && barCursor.x <= swipeBar.x + swipeBar.width / 10) {
      //change the color of the animated rays and starts the animation
      rayColor = "Aquamarine";
      ray1.animationProgress = 0;
      ray2.animationProgress = 0;
      ray3.animationProgress = 0;
      ray4.animationProgress = 0;
      //sends the event to the server
      socket.emit("swordPull");
    }
  }
  //restart the count down
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
//LISTENS FOR A SWIPE FROM OTHER USERS
socket.on("enemyRay", displayEnemyRay);
//UPDATES THE NAME OF THE KING WITH THE DATA PROVIDED BY THE SERVER
socket.on("kingNameFromServer", function(name) {
  if (name === null || name === undefined) {
    king = "";
  } else {
    king = name;
  }
  console.log(king);
});

//FUNCTION CALLED WHEN YOU WIN
function youWon() {
  console.log("winner!!");
  window.open("you_win.html", "_self");
}
//FUNCTION CALLED WHEN SOMEONE ELSE WINS
function youLose() {
  console.log("loser!!");
  if (window.innerWidth > 575) {
    window.open("you_win-desktop.html", "_self");
  } else {
    window.open("you_lose.html", "_self");
  }
}
//CHANGES COLOR TO THE RAYS AND STARTS THE ANIMATION
function displayEnemyRay() {
  if (window.innerWidth > 575) {
   rayColor = [random(100,250), random(100,250), random(100,250)];
  } else {
   rayColor = "orange";
  }
  ray1.animationProgress = 0;
  ray2.animationProgress = 0;
  ray3.animationProgress = 0;
  ray4.animationProgress = 0;
}

//POSITION UPDATE FUNCTION
function changePos(position) {
  userPosition.latitude = position.coords.latitude;
  userPosition.longitude = position.coords.longitude;
}
