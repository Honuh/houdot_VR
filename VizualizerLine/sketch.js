
const agents = [];
let sound;
let highs;
let lows;
let test;
let fft;

function preload(){
  sound = loadSound('drums.mp3');
}

function setup() {
    createCanvas(1000, 1000);
    for (var i = 0; i < 150; i++) {
      agents.push(new Agent (random(0,1000), random(0,1000), random(1,2)));
    }
    fft = new p5.FFT();
    sound.play();
  }
  
  function draw() {
    let spectrum = fft.analyze();
    
    highs = map(fft.getEnergy(12000, 15000),0,255,1,2);
    let high = highs**5;
    lows = map(fft.getEnergy(160),0,255,1,2);
    test = fft.getEnergy(map(mouseX,0,width,0,10000));
    let low = lows**5;
    background(255);
    console.log(test);

    // for (let i = 0; i < spectrum.length; i++) {
    //   var amp = spectrum[i];
    //   var y = map(amp,0,255,500,0);
    //   fill(0);
    //   rect(i,y,1,height-y);
    // }
    
    for (var i = 0; i < agents.length; i++) {
      const agent = agents[i];
      
  
      for (var j = i + 1; j < agents.length; j++) {
        const other = agents[j];
  
        if(dist(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y) <= 150) {
          stroke(0);
          //strokeWeight(highs);
          strokeWeight(map(dist(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y), 0,150,2,0)*highs**4*2);
          line(agent.pos.x, agent.pos.y, other.pos.x, other.pos.y);
  
  
        }
  
      }
      
      // agents[i].vel.x *= highs;
      let oldX = agents[i].vel.x;
      let oldY = agents[i].vel.y;
      agents[i].vel.y *= high;
      agents[i].vel.x *= low/2 ;
      
      // agents[i].draw();
      agents[i].update();
      agents[i].vel.x = oldX;
      agents[i].vel.y = oldY;
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
