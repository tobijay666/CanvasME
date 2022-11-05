var socket;
function setup() {
    createCanvas(300, 200);
    background(51);
    socket = socket.io.connect('http://localhost:3000')
  }
  
function draw() {
    noStroke();
    fill(255);
    // background(220);
    ellipse(mouseX,mouseY,30,30);
  }
