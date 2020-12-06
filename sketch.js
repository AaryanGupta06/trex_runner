var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage,cloudGroup,obs_1,obs_2,obs_3,obs_4,obs_5,obs_6,obstacleGroup;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOver_image,restart,restart_Image;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudImage =  loadImage("cloud.png");
  
  obs_1 = loadImage("obstacle1.png");
  obs_2 = loadImage("obstacle2.png");
  obs_3 = loadImage("obstacle3.png");
  obs_4 = loadImage("obstacle4.png");
  obs_5 = loadImage("obstacle5.png");
  obs_6 = loadImage("obstacle6.png");
  
  gameOver_image = loadImage("gameOver.png");
  restart_Image = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   gameOver = createSprite(300,100);
   restart = createSprite(300,140);
   gameOver.addImage(gameOver_image);
   gameOver.scale = 0.5;
   restart.addImage(restart_Image);
   restart.scale = 0.5;

   gameOver.visible = false;
   restart.visible = false;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(180);
  text("Score : "+score, 500,50);
  trex.collide(invisibleGround);
  
  if(gameState === PLAY)
    {
      score = score + Math.round(getFrameRate()/60)
      
      if(keyDown("space") && trex.y >= 161.5) {
      trex.velocityY = -12 ;
      }
      trex.velocityY = trex.velocityY + 0.8;
      
      
      if (ground.x < 0){
       ground.x = ground.width/2;
      }
  
      
   
     spawnClouds();
     spawnObstacles();
      
      if(obstacleGroup.isTouching(trex))
        {
          gameState = END;
        }
      
    }
  else if(gameState === END)
    {
      gameOver.visible = true;
      restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
      
      
    
    }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  
  
  

   
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
      {
         case 1 : obstacle.addImage(obs_1);
         break;
         case 2 : obstacle.addImage(obs_2);
         break;
         case 3 : obstacle.addImage(obs_3);
         break;
         case 4 : obstacle.addImage(obs_4);
         break; 
         case 5 : obstacle.addImage(obs_5);
         break;
         case 6 : obstacle.addImage(obs_6);
         break;
         default : break;
      }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
