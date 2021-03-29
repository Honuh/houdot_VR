//Creating animations
// doc : https://molleindustria.github.io/p5.play/docs/classes/Animation.html

var explosion;
var boite;
var grenade;

var mouche;
var alerte;
var rest;
var balle;
var gratte;

var son = [];

var img;
var selecteur;
var repetition;

function preload() {

  //  Animation (fileName1, fileName2, fileNameN)
	explosion = loadAnimation('Image/explosion/explosion0000.png','Image/explosion/explosion0050.png',);
	boite = loadAnimation('Image/boite/boite0000.png','Image/boite/boite0050.png',);
	grenade = loadAnimation('Image/grenade/grenade0000.png','Image/grenade/grenade0030.png',);
	gratte = loadAnimation('Image/gratte/gratte0000.png','Image/gratte/gratte0004.png',);
	balle = loadAnimation('Image/balle/balle0000.png','Image/balle/balle0050.png',);
	mouche = loadAnimation('Image/mouche/mouche0000.png','Image/mouche/mouche0013.png',);
	alerte = loadAnimation('Image/alerte/alerte0000.png','Image/alerte/alerte0035.png',);
	rest = loadAnimation('Image/rest/rest0000.png','Image/rest/rest0036.png',);	

	img = loadImage('Image/background.png',);


}

function setup() {
  createCanvas(1280,720);
  background(0);
  explosion.frameDelay = 2;
  grenade.frameDelay = 4;
  boite.frameDelay = 2;
  selecteur = random(5);
  repetition = int(selecteur);


   son[0] = loadSound('son/gratte2.mp3');
   son[1] = loadSound('son/rest.mp3');
   son[2] = loadSound('son/mouche.mp3');
   son[3] = loadSound('son/alerte.mp3');
   son[4] = loadSound('son/balle.mp3');
   son[5] = loadSound('son/explosion.mp3');
   son[6] = loadSound('son/grenade.mp3');
   son[7] = loadSound('son/boite.mp3');






}

function draw() {
	
	
	
	switch(int(selecteur))
	{
		case 0 : 
		background(255);
		scale(2/5);
		animation (gratte, width*1.45, 1200);
		

		scale(5/2);
	
		break;
		
		case 1 :
		background(255);
		scale(2/5);
		animation (rest, width*1.45, 1200);
		scale(5/2);
		
		break;
		
		case 2 : 
		background(255);
		scale(2/5);
		animation (mouche, width*1.35, 1080);
		scale(5/2);
		
		break;
		
		case 3 : 
		background(255);
		scale(2/5);
		animation (alerte, width*1.45, 1200);
		scale(5/2);
		
		break;
		
		case 4 :
		scale (8/9); 
		background(255);
		animation (balle, 750, 410);
		scale(9/8);
		
		break;
		
		case 5 : 
		
		background(255);
			animation (explosion, width/2, 345);
			explosion.play();
			if(explosion.getFrame()==explosion.getLastFrame()){
			explosion.goToFrame(explosion.getLastFrame());}	  
		
		break;

		case 6 : 
		
		background(255);
			animation (grenade, width/2, 345);
			grenade.play();
			if(grenade.getFrame()==grenade.getLastFrame()){
			grenade.goToFrame(grenade.getLastFrame());}	  
		
		break;

		case 7 : 
		
		background(255);
			animation (boite, width/2, 345);
			boite.play();
			if(boite.getFrame()==boite.getLastFrame()){
			boite.goToFrame(boite.getLastFrame());}	  
		
		break;

	
	
		
	
	}
		
	image(img,0,0);
	
	
}

function mouseClicked() {
	
	if(selecteur < 5) {

		gratte.changeFrame(1);
		rest.changeFrame(1);
		mouche.changeFrame(1);
		alerte.changeFrame(1);
		balle.changeFrame(1);
		explosion.changeFrame(1);
		grenade.changeFrame(1);
		boite.changeFrame(1);

		son[repetition].stop();



		while (int(selecteur) == repetition) {
			selecteur = random(8);
		}
		repetition = int(selecteur);



		son[int(selecteur)].loop();


	}
  
  	else {

  		 setTimeout(recommencer, 5000); 

  	}
  
  }
//animation (explosion, width/2, height/2);

function recommencer() {
    selecteur = random(5);
    son[int(selecteur)].loop();
    repetition = int(selecteur);
}