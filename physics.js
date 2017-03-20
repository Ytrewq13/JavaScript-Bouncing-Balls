var col_black = "0,0,0,";
var col_white = "255,255,255,";
var col_red = "255,0,0,";
var col_green = "0,255,0,";
var col_blue = "0,0,255,";
var col_aqua = "0,255,255,";
var col_magenta = "255,0,255,";
var col_yellow = "255,255,0,";
var canvas = document.querySelector("canvas");
var body = document.body;
var html = document.documentElement;
var height = Math.min( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
canvas.width = screen.width;
canvas.height = height;
var context = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");
var animationFrameTime = 20;


var gravity = [0, 0.1];


function randomColor() {
  var colStr = "";
  for (var i = 0; i < 3; i++) {
    colStr += Math.ceil(Math.random() * 255);
    colStr += ","
  }
  return colStr;
}

function randomHue() {
  var colStr = "hsl(";
  colStr += Math.ceil(Math.random() * 360);
  colStr += ", 50%, 50%)";
  return colStr;
}

// Function to create a Particle.
function Particle(x, y) {
  this.pos = [x, y];
  this.vel = [0, 0];
  this.acc = [0, 0];
  this.radius = Math.floor(Math.random() * width/50 + width/150);
  this.color = randomColor();
  this.hueCol = randomHue();
  this.vel[0] = Math.ceil(Math.random() * 4 - 2);
  this.vel[1] = Math.ceil(Math.random() * 4 - 2);

  this.mass = Math.PI * this.radius * this.radius;

  this.applyForce = function(force) {
    this.acc[0] += force[0] / this.mass;
    this.acc[1] += force[1] / this.mass;
  }
  this.applyAcceleration = function(accel) {
    this.acc[0] += accel[0];
    this.acc[1] += accel[1];
  }
  this.update = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.acc = [0, 0];
  }
  this.display = function() {
    hue = Math.floor(this.pos[0]/width*360)
    //hue -= Math.floor(this.pos[1]/height*360)
    hue *= 2;
    this.hueCol = "hsl("+hue+",50%,50%)"
    context.beginPath();
    context.arc(this.pos[0],this.pos[1],this.radius,0,2*Math.PI,true);
    context.fillStyle = this.hueCol;
    context.strokeStyle = "white";
    context.lineWidth = 3;
    context.fill();
    //context.stroke()
  }
  this.getCollision = function() {
    if (this.pos[0] + this.radius >= width) {
      this.vel[0] = -(Math.random() * 0.2 + 0.9) * Math.abs(this.vel[0]);
    }
    if (this.pos[0] - this.radius <= 0) {
      this.vel[0] = (Math.random() * 0.2 + 0.9) * Math.abs(this.vel[0]);
    }
    if (this.pos[1] + this.radius >= height) {
      this.vel[1] = -(Math.random() * 0.2 + 0.9) * Math.abs(this.vel[1]);
    } else if (this.pos[1] - this.radius <= 0 && this.vel[1] < 0) {
      this.vel[1] = 0;
    }
  }
}

function clearCanv() {
  context.fillStyle = "rgba(" + col_black + "1" + ")";
  context.fillRect(0, 0, width, height);
}

function show(particles) {
  clearCanv();
  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
  }
}

function applyForces(particles, force) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].applyForce(force);
  }
}
function applyAccels(particles, acc) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].applyAcceleration(acc);
  }
}

function animate() {
  for (var i = 0; i < parts.length; i++) {
    parts[i].applyAcceleration(gravity);
    parts[i].getCollision();
    parts[i].update();
  }
  show(parts);
  setTimeout(animate, animationFrameTime);
}

function keyPressed(event) {
  if (event.keyCode == 37) {
    console.log("Left arrow pressed.");
    applyForces(parts, [-50, 0]);
  }
  if (event.keyCode == 38) {
    console.log("Up arrow pressed.");
    applyForces(parts, [0, -1500]);
  }
  if (event.keyCode == 39) {
    console.log("Right arrow pressed.");
    applyForces(parts, [50, 0]);
  }
  if (event.keyCode == 40) {
    console.log("Down arrow pressed.");
    applyForces(parts, [0, 250]);
  }
}

var parts = [];
var numParts = 128;
function generate() {
  for (var i = 0; i < numParts; i++) {
    xpos = Math.floor(Math.random() * (width - 20) + 10);
    ypos = Math.floor(Math.random() * (height - 80) + 40);
    parts.push(new Particle(xpos, ypos));
    console.log("new Particle");
  }
}
generate();
setTimeout(animate, animationFrameTime);