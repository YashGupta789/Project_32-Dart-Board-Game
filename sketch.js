const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player;
var slingShot,ground;
var daybg,nightbg;
var dart,dartImage,stand;
var board,boardImage,dartboard,score=0;
var gameState="start";
var backgroundImg;
var bg = "daybg2.jpg";

function preload(){
   boardImage = loadImage("board.png");
   dartImage = loadImage("dart.png");
   player = loadImage("boy.png");
   getBackgroundImg();
}

function setup() {
  createCanvas(1100,700);
  createSprite(400, 200, 50, 50);
  engine = Engine.create();
  world = engine.world;

  board = new Board(150,280);
  dart = new Dart(982,415,150,100,PI/2);
  stand = new Stand(150,480);

  var option={
    isStatic:true
  }
           
  ground = Bodies.rectangle(550,690,1100,20,option);
  World.add(world,ground);

  slingShot = new SlingShot(dart.body,{x:982,y:415}); 
}

function draw() {
  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,1100,20);
  if(backgroundImg)
  background(backgroundImg);  
  Engine.update(engine);

  detectcollision(dart,board);

  textSize(35);
  fill("white");
  text("Score: "+score,800,50);

  textSize(30);
  fill("white");
  text("Press SPACE to Try Again!",60,120);

  imageMode(CENTER);
  image(player,920,510,160,300);
   
  stand.display();
  board.display();
  dart.display();
  slingShot.display();

  //drawSprites();
}

function mouseDragged(){
    Matter.Body.setPosition(dart.body,{x:mouseX,y:mouseY});
}

function mouseReleased(){
  slingShot.fly();
  gameState = "launched";
}

function keyPressed(){
  if(keyCode === 32){
     Matter.Body.setPosition(dart.body,{x:982,y:415}); 
     slingShot.reattach(dart.body);
     gameState = "start";
     Matter.Body.setMass(dart.body,7500);
     //Matter.Body.setStatic(dart.body,false);
  }
}

function detectcollision(dart,board){ 
  dartBodyPosition=dart.body.position 
  boardBodyPosition=board.body.position 
  var distance=dist(dart.body.position.x,dart.body.position.y,board.body.position.x,board.body.position.y); 
   
  /*comparing distance with half of the sum of dart and board width and also check the y position 
  of the dart so that it does stays only on the board when collision is detected Same you can try for x position of the dart*/
  if(gameState ==="launched"){
   if(distance<=325/2 && dart.body.position.y>=140 && dart.body.position.y<=350){ 
     Matter.Body.setStatic(dart.body,true);
     score =+20; 
     } 
    }
}

async function getBackgroundImg(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  if(hour>=06 && hour<=19){
    bg = "daybg2.jpg";
  }
  else{
    bg = "nightbg.jpg";
  }
  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}