let playing = false;
let videoWin;
let button;

function preload() {
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  noCanvas();
  videoWin = createVideo("assets/video/you_win-animation.mp4");
  videoWin.size(windowWidth);
  videoWin.position(0,-windowHeight);
  videoWin.loop();
  button = createButton('play');
  button.mousePressed(toggleVid);
}

function draw() {
}

function toggleVid() {
  if (playing) {
    videoWin.pause();
    button.html('play');
  } else {
    videoWin.loop();
    button.html('pause');
  }
  playing = !playing;
}
