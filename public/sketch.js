var socket;

function setup() {
  // put setup code here
  createCanvas(400,400);
  background(51);

  socket =io.connect('http://localhost:3000');
}

function mouseDragged(){
  console.log('Sending'+mouseX+','+mouseY);

  var data = {
    x:mouseX,
    y:mouseY
  }
  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX,mouseY,60,60);
}

function draw() {
  // put drawing code here
  // background(51);
  // noStroke();
  // fill(255);
  // ellipse(mouseX,mouseY,60,60);

}
