var socket;

function preload(){

}

function setup() {
  // Create a new connection using socket.io (imported in index.html)
  socket = io();
  createCanvas(windowWidth,windowHeight,WEBGL);
  background(200, 50, 50);
}

function draw() {

}
