//variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;var jungleImage,jungle
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0;
var ground
var life=8
var gameOver;
//the things which should be preloaded 
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}
//the main scene of the game
function setup() {
  createCanvas(windowWidth,windowHeight);
  jungle =createSprite(width-900,height/2,20,20);
  jungle.addImage("junglebackground",jungleImage);
  monkey = createSprite(10,height-60,10,10);
  monkey.addAnimation("running",monkey_running);
  
  monkey.scale=0.1;
  ground =createSprite(width-280,height-50,900,10);
  ground.visible=false;
  ground.velocityX=-4;
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  monkey.setCollider("rectangle",0,0,600,monkey.height);
  monkey.debug = true
  score=0;
  gameOver = createSprite(width/2,height-400);
  gameOver.addImage(gameOverImg);
  
  
  
  gameOver.scale = 0.5;
  

  gameOver.visible = false;
  
  obstaclesGroup =new Group();
  FoodGroup= new Group();
}


function draw() {
   background(0);
   if (gameState === PLAY){
     jungle.velocityX = -4;
    if (jungle.x < 250){
      jungle.x=jungle.width/2;
      
    }
    
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
     
    monkey.velocityY =monkey.velocityY + 0.8
    monkey.collide(ground);
    spawnObstacles();
    spawnFood();
     if(obstaclesGroup.isTouching(monkey)){
      monkey.scale=0.1;       
      life=life-1;
       monkey.velocityY = -12;
     }
  if (life<1){
    gameState=END;
  }
     
     if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
    monkey.scale=monkey.scale+0.02;
  }
}
  
   else if (gameState===END){
     gameOver.visible = true;
    
     
     
     textSize(20);
     fill("white");
     text("GameOver", width/2,height/2);
      
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
     
     
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.destroy();
  
     
     
      
      
     
          
   }
     drawSprites();
  
  textSize(20);
  fill("white");
  text("Score: "+ score, width-100,50);
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,30,50);
  text("Life:"+life,30,100);
} 
function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(width-200,height-70,10,40);
   obstacle.velocityX = -(8 + score/100);
   obstacle.addImage("obstacle",obstacleImage);
    
             
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
  } 
}

function spawnFood(){
  if (frameCount  % 85 === 0){
    var banana = createSprite(width+50,height-120,10,40);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
    banana.lifetime = 200;
   
    FoodGroup.add(banana);
  }
}


