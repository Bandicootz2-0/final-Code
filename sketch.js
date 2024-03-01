var splashScreenimg;
var bg_img, bg2_img;
var playBtn, abtBtn;
var player_img, player;
var player2, player2_img;
var player360, player45, player90, player135, player180, player225, player270, player315; 
var enemy, enemyGroup;
var enemylvl2, enemylvl2Group;
var enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7;
var benefit1, benefit2, benefit3
var benefit, benefitGroup;
var bulletimg, bulletimgLeft, bulletUp, bulletDown
var bullet, bulletGroup;
var bullet2, bulletGroup2;
var score = 0;
var health = 100;
var maxHealth = 100;
var gameState = "wait";
var direction = "down";



function preload() {
    splashScreenimg = loadImage("assets/SplashScreen.gif");
    player_img = loadImage("assets/player.gif");
    player360 = loadImage("assets/player360.gif");
    player90 = loadImage("assets/player90.gif");
    player180 = loadImage("assets/player180.gif");
    player270 = loadImage("assets/player270.gif");
    bg_img = loadImage("assets/Bg1.png");
    bg2_img = loadImage("assets/Bg2.jpg");
    enemy1 = loadImage("assets/explodingzombie.gif")
    enemy2 = loadImage("assets/zombie.gif")
    enemy3 = loadImage("assets/regZom.gif")
    enemy4 = loadImage("assets/speedyZom.gif")
    enemy5 = loadImage("assets/happygreen.gif")
    enemy6 = loadImage("assets/redminizombie.gif")
    enemy7 = loadImage("assets/blackenemy.gif")
    benefit1 = loadImage("assets/key.png")
    benefit2 = loadImage("assets/laser.png")
    benefit3 = loadImage("assets/potion.png")
    bulletimg = loadImage("assets/bullet.png")
    bulletimgLeft = loadImage("assets/bulletLeft.png")
    bulletimgDown = loadImage("assets/bulletdown.png")
    bulletimgUp = loadImage("assets/bulletUp.png")
  }

function setup(){
    createCanvas(windowWidth,windowHeight);

    playBtn= createImg("assets/startbutton.png");
    playBtn.position(width/2-100,windowHeight/2+50);
    playBtn.size(100,100);
    playBtn.hide();
    
    abtBtn= createImg("assets/helpbutton.png");
    abtBtn.position(width/2+100,windowHeight/2+50);
    abtBtn.size(100,100);
    abtBtn.hide();

    player = createSprite(50,height-150)
    player.addImage(player_img)
    player.scale = 0.45
    player.visible = false

    player2 = createSprite(width/2,windowHeight-160)
    player2.addImage(player90)
    player2.scale = 0.45
    player2.visible = false 

    enemyGroup = new Group();
    benefitGroup = new Group();
    bulletGroup = new Group();
    enemylvl2Group = new Group();
    bulletGroup2 = new Group();
}

function draw(){
    if(gameState == "wait"){
        background(splashScreenimg);
        playBtn.show();
        abtBtn.show();
        score = 0;
        health = 100;
    }
    playBtn.mousePressed( () => {
        playBtn.hide();
        abtBtn.hide();
        gameState = "level1";
    })

    
    abtBtn.mousePressed( ()=> {
        playBtn.hide();
        abtBtn.hide();
        gameState = "about";
    })
    if(gameState == "level1"){
        background(bg_img);
        player.visible = true;
        movement();
        spawnEnemies();
        healthLevel();
        if(keyDown("space")){
          spawnBullets();
        }

      for(var i = 0; i<enemyGroup.length; i++){
          if(bulletGroup.isTouching(enemyGroup.get(i))){
              score +=10;
              enemyGroup.get(i).remove();
              bulletGroup.destroyEach();
            }
        }
        
    
    for(var i = 0; i<enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i))){
              health -=10;
              enemyGroup.get(i).remove();
              bulletGroup.destroyEach();
            }
        }

    if(health>0 && score== 100){
      gameState= "nextLevelInfo"
      bulletGroup.destroyEach();
      enemyGroup.destroyEach();
      benefitGroup.destroyEach();
      player.visible = false;
    }
    if(health ==0){
      gameState= "gameEnd"
      bulletGroup.destroyEach();
      enemyGroup.destroyEach();
      benefitGroup.destroyEach();
      player.visible = false;
    }   
    fill("red");
      textSize(20);
      text("Score: " + score, 600, 100);
    }

  
    
  if(gameState == "level2"){
      background(bg2_img);
      player2.visible = true;
      player2Movement();
      spawnEnemiesLvl2();
      spawnBenefits();
      healthLevel();
      if(keyDown("space")){
        spawnBullets2();
      }
      
      for(var i = 0; i<enemylvl2Group.length; i++){
        if(bulletGroup2.isTouching(enemylvl2Group.get(i))){
          
            score +=10;
            enemylvl2Group.get(i).remove();
            bulletGroup2.destroyEach();
          }
      }
      
  
      for(var i = 0; i<enemylvl2Group.length; i++){
          if(player2.isTouching(enemylvl2Group.get(i))){
            health -=10;
            enemylvl2Group.get(i).remove();
            bulletGroup2.destroyEach();
          }
      }
      for(var i = 0; i<benefitGroup.length; i++){
        if(player2.isTouching(benefitGroup.get(i))){
          if(health< 100){
            health +=10;
          }
          benefitGroup.destroyEach();
        }
    }

      if(health >0 && score==100){
        gameState= "win"
        bulletGroup2.destroyEach();
        enemylvl2Group.destroyEach();
        benefitGroup.destroyEach();
        player2.visible = false;
      }
      if(health ==0){
        gameState= "gameEnd"
        bulletGroup2.destroyEach();
        enemylvl2Group.destroyEach();
        benefitGroup.destroyEach();
        player2.visible = false;

      }    
  fill("red");
    textSize(40);
    text("Score: " + score, 300, 100);
  }


  if(gameState=="nextLevelInfo"){
    score = 0;
    health = 100;
    nextLevelInfoPopUp();
   }

  if(gameState == "gameEnd"){
    gameEnd();
  }

  if(gameState == "about"){
      AbtFunc();
  }
     
  if(gameState == "win"){
    win();
  }

  drawSprites();

  }



function AbtFunc(){
    swal({
        title: "About this game",
        text: "Zombies appear from all sides, aim your player to kill the zombies",
        textAlign: "CENTER",
        imageUrl: "assets/SplashScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Back to game",
        confirmButtonColor:"Red"
    },
    function () {
        gameState = "wait"
    })
}

function movement(){
  if(player.x >= 650){
    player.x = 650;
  }
  if(player.x <= 10){
    player.x = 10;
  }
  if(player.y <=10){
    player.y = 10
  }

  if(player.y >= 420){
    player.y = 420;
  }
 
  if(keyDown("up_arrow")){
    player.velocityY = -10;
  }
  player.velocityY = player.velocityY + 0.8;
  if(keyDown("left_arrow")){
    player.x -= 3;
  }
  if(keyDown("right_arrow")){
    player.x += 3;
  }
  
}

function spawnEnemies(){
  
  if(frameCount%100 == 0){
    var random = Math.round((Math.random()*3)+1);
  
    enemy = createSprite(windowWidth+200, windowHeight-160);
    
    switch(random){
      case 1: 
        enemy.addImage(enemy5)
        enemy.scale = 0.4;
        enemy.velocityX = -2;
        break;
      case 2:
        enemy.addImage(enemy6)
        enemy.scale = 0.4;
        enemy.velocityX = -2;
        break;
      case 3:
        enemy.addImage(enemy7)
        enemy.scale = 0.3;
        enemy.velocityX = -2;
        break;
      case 4:
        enemy.addImage(enemy4)
        enemy.scale = 0.3;
        enemy.velocityX = -5;
        break;
      default:
        break;

    }
    enemyGroup.add(enemy);
  }
}

function spawnBenefits(){
  
  if( frameCount % 30 == 0){
    var random = Math.round((Math.random()*1)+1);
    benefit = createSprite(windowWidth+200, windowHeight-160);
    
    switch(random){
      case 1: 
        benefit.addImage(benefit2)
        benefit.scale = 0.2;
        benefit.velocityX = -2;
        break;
      case 2:
        benefit.addImage(benefit3)
        benefit.scale = 1;
        benefit.velocityX = -2;
        break;  
      default:
        break;

    }
    benefitGroup.add(benefit);
  }
}

function spawnBullets(){
  bullet = createSprite(player.x + 20, player.y -10, 10,10);
  bullet.addImage(bulletimg);
  bullet.scale = 0.20;
  bullet.velocityX = 2;
  bullet.depth = player.depth;
  player.depth += 1;
  bulletGroup.add(bullet);
}

function healthLevel(){
  stroke("lightgreen");
  strokeWeight(10);
  noFill();
  rect(windowWidth/8,windowHeight/15, maxHealth, 20);

  noStroke();
  fill("green");
  rect(windowWidth/8,windowHeight/15, health, 20);
}

function nextLevelInfoPopUp(){
  swal({
    title: "Level 1 Win",
    text: "Zombies appear from all sides, aim your player to kill the zombies",
    textAlign: "CENTER",
    imageUrl: "assets/SplashScreen.gif",
    imageSize: "200x200",
    confirmButtonText: "Go to Level2",
    confirmButtonColor:"Green"
},
  function () {
    gameState = "level2"
  })
}


function gameEnd(){
  swal({
    title: "Game Over",
    text: "restart to play again",
    textAlign: "CENTER",
    imageUrl: "assets/SplashScreen.gif",
    imageSize: "200x200",
    confirmButtonText: "restart",
    confirmButtonColor:"green"
},
function () {
    gameState = "wait"
})
}


function spawnEnemiesLvl2(){
  
  if(frameCount%80 == 0){
    var random = Math.round((Math.random()*2)+1);
   // var randomX = Math.round((Math.random()*600));
    var randomY = Math.round((Math.random()*windowHeight));
  
    enemylvl2 = createSprite(windowWidth+100,randomY);
    
    switch(random){
      case 1: 
       enemylvl2.addImage(enemy1)
       enemylvl2.scale = 0.2;
       enemylvl2.velocityX = -2;
        break;
      case 2:
        enemylvl2.addImage(enemy2)
        enemylvl2.scale = 0.8;
        enemylvl2.velocityX = -2;
        break;
      case 3:
        enemylvl2.addImage(enemy3)
        enemylvl2.scale = 0.3;
        enemylvl2.velocityX = -2;
        break;
    }
    enemylvl2Group.add(enemylvl2);
  }
}

function player2Movement(){
  if(player2.y >= windowHeight-10){
    player2.y = windowHeight-10;
  }
  if(player2.y <= 10){
    player2.y = 10;
  }
  if(player2.x <= 10){
    player2.x = 10;
  }
  if(player2.x >= windowWidth-10){
    player2.x = windowWidth-10;
  }

  if(keyDown("down_arrow")){
    player2.y += 2;
    player2.addImage(player90)
    direction = "down";
    if(keyDown("space")){
      bullet.velocityY =2;
    }
    
  }
  if(keyDown("up_arrow")){
    player2.y -=  2;
    player2.addImage(player270)
    direction = "up"
    if(keyDown("space")){
      bullet.velocityY = -2;
    }
  }
  if(keyDown("left_arrow")){
    player2.addImage(player180)
    direction = "left"
    if(keyDown("space")){
      bullet.velocityX = -2;
    }
    player2.x -= 3;
  }
  if(keyDown("right_arrow")){
    player2.addImage(player360)
    direction = "right"
    if(keyDown("space")){
      bullet.velocityX = 2;
    }
    player2.x += 3;
  }
}

function win(){
  swal({
      title: "You win!!!",
      text: "great job, you completed both the levels!",
      textAlign: "CENTER",
      imageUrl: "assets/youWin.jpg",
      imageSize: "300x300",
      confirmButtonText: "Great!",
      confirmButtonColor:"green"
  },
  function () {
      gameState = "wait"
      window.location.reload();
  })
}

function spawnBullets2(){
 if(direction=="right"){
    bullet2 = createSprite(player2.x+20,player2.y+20,10,10);
    bullet2.velocityX = 4;
    bullet2.addImage(bulletimg);

 }
 if(direction=="left"){
    bullet2 = createSprite(player2.x-30,player2.y-20,10,10);
    bullet2.velocityX = -4;
    bullet2.addImage(bulletimgLeft);

 }
 if(direction=="up"){
    bullet2 = createSprite(player2.x+20,player2.y-30,10,10);
    bullet2.velocityY = -4;
    bullet2.addImage(bulletimgUp);

 }
 if(direction=="down"){
    bullet2 = createSprite(player2.x-20,player2.y+25,10,10);
    bullet2.velocityY = 4;
    bullet2.addImage(bulletimgDown);

 }
 bullet2.scale = 0.2;
 bullet2.depth = player2.depth;
 player2.depth += 1;
 bulletGroup2.add(bullet2);
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
