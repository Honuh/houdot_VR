
const agents = [];
let sound;
let lowmid;
let fft;

function preload(){
  sound = loadSound('2.mp3');
}

function setup() {
    createCanvas(1000, 1000);
    for (var i = 0; i < 300; i++) {
      agents.push(new Agent (random(0,1000), random(0,1000), random(1,2)));
    }
    fft = new p5.FFT();
    sound.play();
  }
  
  function draw() {
    let spectrum = fft.analyze();
    lowmid = map(fft.getEnergy('lowMid'),0,255,1,5);
    background(255);

    
    for (var i = 0; i < agents.length; i++) {
      const agent = agents[i];
      
  
      for (var j = i + 1; j < agents.length; j++) {
        const other = agents[j];
  
        if(dist(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y) <= 150) {
          stroke(0);
          strokeWeight(map(dist(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y), 0,150,2,0));
          line(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y);
  
  
        }
  
      }
      
      // agents[i].vel.x *= lowmid;
      agents[i].vel.y *= lowmid;
      
      // agents[i].draw();
      agents[i].update();
      // agents[i].vel.x /= lowmid;
      agents[i].vel.y /= lowmid;
      agents[i].bounce(width, height);
      // agents[i].wrap(width, height);

    }
  }
  


function mousePressed() {
  if (sound.isPlaying()) {
    // .isPlaying() returns a boolean
    sound.stop();
    
  } else {
    sound.play();
    
  }
}
  



  const dist =(x,y,a,b) =>{
    const dx = a-x;
    const dy = b-y;
    return(Math.sqrt(dx*dx + dy*dy));
  
  };


  class Vector {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      
    }
  
  }
  
  class Agent { 
    constructor(x, y, z) {
      this.pos = new Vector(x,y,z);
      this.vel = new Vector(random(-3,3 )/(z*2),random(-3,3 )/(z*2));
      this.radius = map(z,1,2,15,5);
      this.z = z;
  
    }
  
    update() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  
    bounce(width, height) {
      if(this.pos.x - this.radius <= 0 ||this.pos.x + this.radius >= 1000) this.vel.x *= -1;
      if(this.pos.y - this.radius <= 0 ||this.pos.y + this.radius >= 1000) this.vel.y *= -1;
  
    }
  
    collision(other) {
      if(dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) <= this.radius+other.radius) {
        this.vel.x *=-1;
        this.vel.y *=-1;
      }
    }
  
    wrap(width, height) {
  
      const treshold = 50;
      if(this.pos.x > width + treshold){
        this.pos.x = -treshold; 
        this.vel.x = random(-3,3 )/(this.z*2);
        this.vel.y = random(-3,3 )/(this.z*2);
      }
      if(this.pos.x < -treshold){
        this.pos.x = width + treshold; 
        this.vel.x = random(-3,3 )/(this.z*2);
        this.vel.y = random(-3,3 )/(this.z*2);
      }
      
      if(this.pos.y > height + treshold) {
        this.pos.y = -treshold; 
        this.vel.x = random(-3,3 )/(this.z*2);
        this.vel.y = random(-3,3 )/(this.z*2);
      }

      if(this.pos.y < -treshold) { 
        this.pos.y = height + treshold; 
        this.vel.x = random(-3,3 )/(this.z*2);
        this.vel.y = random(-3,3 )/(this.z*2);
      }
    }
  
    draw() {
      fill(255,0,0);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.radius);
  
    }
  
  }