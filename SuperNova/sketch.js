let suiveur = [];
let meneurs = [];
var canDraw = false;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  var r = random(50,255);
  var b = random(50,255);
  var v = random(50,255);
  
  for (var i = 0; i < 5000; i++) {
    suiveur[i] = new Suiveur(r,v,b);
  }
  for (var j = 0; j < 15; j++) {
    meneurs[j] = new Meneur(random(width), random(height));
  }
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 0, 50);
  
  for (var j = 0; j < meneurs.length; j++) {
    meneurs[j].move();
   //meneurs[j].display();
  }

  for (var i = 0; i < suiveur.length; i++) {
    
    
    for (var a = 0; a < meneurs.length; a++) {
      if (suiveur[i].intersect(meneurs[a])) {
        suiveur[i].follow(meneurs[a]);
        canDraw = true;
      }
      else{
        canDraw = true;
      }
    }
    
    
    suiveur[i].move();
    
    if(canDraw)
      {
        suiveur[i].display();
      }
  }

}

class Suiveur {
  constructor(r,v,b) {
    this.width = random(0.4,0.8);
    this.r = this.width / 2 +10;
    this.stock = this.width;

    this.x = random(0, width);
    this.y = random(0, height);
    this.stockx = this.x;
    this.stocky = this.y;
    this.position = createVector(this.x, this.y);

    this.z = random(0.5, 1);
    this.speed = 2 * this.z;

    this.xoff = random(0, 2000);
    this.yoff = random(0, 2000);
    this.stockn = this.xoff;
    
    this.r = r;
    this.b = b;
    this.v = random(v,v+50);
  }

  display() {
    noStroke();
    fill(this.r,this.v,this.b);

    ellipse(this.position.x, this.position.y, this.width, this.width);
  }

  move() {
    var mapx = map(noise(this.xoff), 0, 1, -1, 1);
    var mapy = map(noise(this.yoff), 0, 1, -1, 1);
    this.position.add(mapx * 2, mapy * 2);
    this.xoff += 0.01;
    this.yoff += 0.01;

    var target = createVector(this.stockx, this.stocky);

    var distance = target.dist(this.position);
    var mappedDistance = map(distance, 100, 0, 3, 0);
    target.sub(this.position);
    target.normalize();
    target.mult(mappedDistance);
    this.position.add(target);
    
    
  }

  intersect(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    if (d < this.r + other.r) {
      return true;
    } else {
      return false;
    }
  }

  follow(other) {
    var target = createVector(other.position.x, other.position.y);

    var distance = target.dist(this.position);
    var mappedDistance = map(distance, 100, 0, 3, 4);
    target.sub(this.position);
    target.normalize();
    target.mult(mappedDistance);
    this.position.add(target);
  }

  restart() {
    if (this.position.y < 0) {
      this.position.y = height + 100;
      this.position.x = random(0, width);
      this.z = random(0.5, 1);
      this.xoff = random(0, 200);
    }
  }

  repel(other) {
    var target = createVector(other.position.x, other.position.y);
  
    var distance = target.dist(this.position);
    var mappedDistance = map(distance, 100, 0, 1, 1);
    target.sub(this.position);
    target.normalize();
    target.mult(mappedDistance);
    this.position.sub(target);
  }
  changeColor()
  {
    this.r = random(50,255);
    this.b = random(50,255);
    this.v = random(50,255);
  }
}

class Meneur {
  constructor(x, y) {
    this.diameter = random(6, 20);
    
    this.x = x;
    this.y = y;

    this.position = createVector(this.x, this.y);
    this.xoff = random(500);
    this.yoff = random(500);

    this.influence = random(50, 100);
    this.r = this.diameter / 2 +this.influence;
  }

  display() {
    noFill();
    stroke(255);
    strokeWeight(1);

    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }

  move() {
    //var mapx = map(noise(this.xoff), 0, 1, -1, 1);
    //var mapy = map(noise(this.yoff), 0, 1, -1, 1);
    //this.position.add(mapx * 20, mapy * 20);
    
    
    
    this.x = noise(this.xoff) * width ;
    this.y = noise(this.yoff) * height;
    this.position = createVector(this.x, this.y);
    
    this.xoff += 0.005;
    this.yoff += 0.005;
  }

  restart() {
    if (this.position.y > window.innerHeight + this.diameter / 2) {
      this.position.y -= window.innerHeight + this.diameter;
    }
    if (this.position.y < 0 - this.diameter / 2) {
      this.position.y += window.innerHeight + this.diameter;
    }
    if (this.position.x > window.innerWidth + this.diameter / 2) {
      this.position.x -= window.innerWidth + this.diameter;
    }
    if (this.positionx < 0 - this.diameter / 2) {
      this.position.x += window.innerWidth + this.diameter;
    }
  }
}
