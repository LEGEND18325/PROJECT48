const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint;
const Render=Matter.Render

var ground;
var invisibleground,invisibleground1,invisibleground2,invisibleground3,invisibleground4,invisibleground5;
var player,playerimg,playerimg2,playerimg3,playerimg4,playerimg5;
var arrowGroup, arrowimg,arrow;
var fireballGroup, fireballimg,fireball;
var plantGroup, plantimg,plantCreatedFrame,plant;
var ninjaGroup, ninjaimg,ninja;
var swordimg,swordGroup,sword;
var p1;
var gameState=0;
var playerCount=0;
var playerHealth=3000;
var playerScore=0;
var playerRank=0;
var database;
var dragonimg,dragonimg1,dragon,dragonCreatedFrame;
var dracoimg,dracoGroup,draco;
var dragonchng=0;
var dragonh=5000;
var allPlayers=[];
var blockGroup, blockimg,blockCreatedFrame,block;
var   coinGroup, coinimg,coin,coinframecount;
var   breadGroup, breadimg,bread,breadframecount;
var   appleGroup, appleimg,apple,appleeatFrame;
function preload(){
   ground=loadImage("background.jpg");
  // playerimg=loadImage("Charctor.png");
   playerimg2=   loadAnimation("1.PNG","2.PNG","3.PNG","4.PNG","5.PNG","6.PNG","7.PNG","8.PNG");
   playerimg3=   loadAnimation("9.PNG","10.PNG","11.PNG","12.PNG","13.PNG","14.PNG","15.PNG","16.PNG");
   ninjaimg=   loadAnimation("v1.png","v2.png","v3 .png","v4.png","v5.png","v6.png","v7.png","v8 .png","v9.png","v10.png");
  playerimg=loadImage("8.PNG");
  playerimg4=loadImage("2.PNG");
  playerimg5=loadImage("16.PNG");
  arrowimg=loadImage("arrows.png");
  fireballimg=loadImage("fireballs.png");
  plantimg=loadImage("poison plant.png");
  swordimg=loadImage("sword.png");
  dragonimg=loadImage("DRAGON.png");
  dragonimg1=loadImage("DRAGON 2.png");
  dracoimg=loadImage("draco meteor.png");
  blockimg=loadImage("lucky blocks.jpg");
  coinimg=loadImage("coins.png");
  breadimg=loadImage("bread.png");
  appleimg=loadImage("golden enchanted apple.png");

}

function setup(){
    createCanvas(displayWidth*5, 300);
  
    engine = Engine.create();
    world = engine.world;
    player=createSprite(220,240,10,10)
player.addAnimation("stop",playerimg);
player.addAnimation("stop2",playerimg5);
player.addAnimation("jump",playerimg4)
 player.addAnimation("running",playerimg2);
 player.addAnimation("running2",playerimg3);
 //player.scale=0.2;
 player.scale=0.6;
 player.visible=false;



 dragon=createSprite(6260,-100,5,10)  
 dragon.addAnimation("dragon",dragonimg);
 dragon.addAnimation("dragon1",dragonimg1);
 dragon.debug = false;
 dragon.setCollider("rectangle",0,0,200,200);
   dragon.scale=1;
   dragonCreatedFrame=frameCount;





//invisibleground=createSprite(displayWidth/2,280,displayWidth*9,10)
invisibleground=createSprite(displayWidth/3,275,4970,10)
invisibleground.visible=false;
invisibleground1=createSprite(3230,275,320,10)
invisibleground1.visible=false;
 
invisibleground2=createSprite(3970,275,960,10)
invisibleground2.visible=false;

invisibleground3=createSprite(4700,275,320,10)
invisibleground3.visible=false;

invisibleground4=createSprite(5880,275,1900,10)
invisibleground4.visible=false;

invisibleground5=createSprite(6100,275,10,620)
  
  invisibleground5.visible=false;

//invisibleground5=createSprite(6100,275,10,620)
//invisibleground5.visible=false;



arrowGroup= new Group();
fireballGroup= new Group();
plantGroup= new Group();
ninjaGroup= new Group();
swordGroup= new Group();
dracoGroup= new Group();
blockGroup= new Group();
coinGroup= new Group();
breadGroup= new Group();
appleGroup= new Group();

database = firebase.database();


var gameStateref=database.ref('gameState')
gameStateref.on("value",(data)=>{

  gameState=data.val();

})
if(gameState===0){
  form=new Form();
  form.display();
  p1=new Player();
}



    Engine.run(engine);

}

function draw(){
 background("cyan");
  Engine.update(engine);
  var playerCountref=database.ref('playerCount')
playerCountref.on("value",(data)=>{

  playerCount=data.val();
})
player.bounceOff(invisibleground5);

/*var playerHealthref=database.ref('players/playerHealth')
playerHealthref.on("value",(data)=>{

  playerHealth=data.val();
})*/
Player.getPlayerInfo();



if(playerCount===2){
  gameState=1;
  database.ref('/').update({

    gameState:1
  })

}


if(gameState===1){
  form.hide();
  image(ground,0,0,displayWidth*5,300);
  player.visible=true;
textSize(20)
  fill("green")
  for(plr in allPlayers){
    //console.log(p1.name)
    if(allPlayers[plr].name===p1.name){
      text(p1.name+" 's Health : "+allPlayers[plr].health,player.x,80)
    }
    //text(p1.name+" 's Health : "+allPlayers[plr].health,player.x,80)
  }
    fill("yellow")
  for(plr in allPlayers){
    if(allPlayers[plr].name===p1.name){
      text(p1.name+" 's Score : "+allPlayers[plr].points,player.x,50)
    }
    //text(p1.name+" 's Score : "+allPlayers[plr].points,player.x,50)
  }

 // fill("yellow")
  //text(p1.name+" 's Score : "+playerScore,player.x,50)
 /* for(plr in allPlayers){
    
  }*/
  
  
  if(keyWentDown(RIGHT_ARROW)){

   player.x=player.x+5;
    p1.distance=p1.distance+20;
    player.velocityX=10;
    player.changeAnimation("running",playerimg2);
    p1.update();
}


if(keyWentUp(RIGHT_ARROW)){

     //player.x=player.x+20;
     player.velocityX=0;
    player.changeAnimation("stop",playerimg);
}

if(keyWentDown(LEFT_ARROW)){

  player.x=player.x-5;
  p1.distance=p1.distance-20;
     player.velocityX=-10;
     player.changeAnimation("running2",playerimg3);
     p1.update();
}



if(keyWentUp(LEFT_ARROW)){

     //player.x=player.x+20;
     player.velocityX=0;
     player.changeAnimation("stop2",playerimg5);
}


if(keyDown(UP_ARROW)&& player.y >= 159){

   
     player.velocityY=-12;
     player.changeAnimation("jump",playerimg4);
}

if(keyWentUp(UP_ARROW)){

    player.changeAnimation("stop",playerimg);
    
}


if(plantCreatedFrame+40===frameCount){
    plantGroup.destroyEach();
}


if(blockCreatedFrame+1000===frameCount){
  blockGroup.destroyEach();
}


/*if(dragonCreatedFrame+1500===frameCount){
  dragon.changeAnimation("dragon1",dragonimg1);
  dragon.scale=1.5;
  
}*/


if(dragonh<=2500){
  dragon.changeAnimation("dragon1",dragonimg1);
  dragon.scale=1.5;
  dragonchng=1;
  //player.x=5960;
  
//invisibleground5.visible=false;
}
if(dragonchng===1){

  spawndraco();
  
}
if(dragonCreatedFrame+2500===frameCount){
  dragonchng=0;
}


player.velocityY = player.velocityY + 0.8;  

 
player.collide(invisibleground);
player.collide(invisibleground1);
player.collide(invisibleground2);
player.collide(invisibleground3);
player.collide(invisibleground4);
//player.collide(invisibleground5);
dragon.collide(invisibleground4);


if(player.x>=5650){
  //dragon.visible=true;
  dragon.velocityY=10;
 textSize(30)
  fill("red")
  text("dragon health : "+dragonh,5800,50)
}

if(swordGroup.isTouching(dragon)){
  dragonh=dragonh-30
  swordGroup.destroyEach();
  }



if(keyDown("space"))
    {
      var  sword=spawnsword();
    }

    if(player.x>=1555){
      spawnarrows();
      spawnfireballs();
     spawnluckies();
    /* if(frameCount % 100===0) {
      var   block = createSprite(600,255,40,10);
        blockCreatedFrame=frameCount;
        block.x = Math.round(random(50,5000));
        block.y = Math.round(random(100,255));
   block.addImage(blockimg);
   block.scale = 0.2;

   blockGroup.add(block);
         }*/
        }


    if(player.x>=4055){
      spawnpoisons();
 spawnninjas();
    }


   /* if(player.x>=5650){
     
      dragon.velocityY=10;
    }*/
    
    //console.log(player.x)



//if(swordGroup.isTouching(arrowGroup)||swordGroup.isTouching(ninjaGroup)||swordGroup.isTouching(fireballGroup)){}



if(playerHealth<=0 || player.y>=300){
  gameState=2;
  database.ref('/').set({

    gameState:2
  })
  //console.log("hi")
    
}


if(dragonh<=0){
  gameState=3;
  database.ref('/').set({

    gameState:3
  })
 /* if(allPlayers[plr].name===p1.name){
//p1.rank=1;

p1.rank=p1.rank+1;
p1.update;
  }else{

    p1.rank=p1.rank+1;
    p1.update;
  }*/
  /*for(var plr in allPlayers){
    if(allPlayers[plr].name===p1.name){

      p1.rank=p1.rank+1;
    p1.update;

    }
    
  }*/
  p1.rank=p1.rank+1;
  Player.updateplayersatend(p1.rank);
  
  //console.log("hi")
    
  
}
    


if(arrowGroup.isTouching(swordGroup)){
  arrowGroup.destroyEach();
  swordGroup.destroyEach();
  spawncoin();
  if(coinGroup.isTouching(player)){
   // playerScore=playerScore+10;
    p1.points=p1.points+10
    console.log("hello")
    p1.update();

 
    }

}

/*if(coinGroup.isTouching(player)){
    
 // p1.points=p1.points+10
  //console.log("shdnfvn")
  p1.update();


  }*/

if(ninjaGroup.isTouching(swordGroup)){
  ninjaGroup.destroyEach();
  swordGroup.destroyEach();
  spawncoin();
  if(coinGroup.isTouching(player)){
   // playerScore=playerScore+60;
    p1.points=p1.points+60
    
    p1.update();

 
    }

}


if(fireballGroup.isTouching(swordGroup)){
  fireballGroup.destroyEach();
  swordGroup.destroyEach();
  spawncoin();
  if(coinGroup.isTouching(player)){
    //playerScore=playerScore+150;
    p1.points=p1.points+150
    
    p1.update();

 
    }

}


if(plantGroup.isTouching(swordGroup)){
  fireballGroup.destroyEach();
  swordGroup.destroyEach();
  spawncoin();
  if(coinGroup.isTouching(player)){
    //playerScore=playerScore+50;
    p1.points=p1.points+50
    
    p1.update();

 
    }

}



if(dracoGroup.isTouching(swordGroup)){
  fireballGroup.destroyEach();
  swordGroup.destroyEach();
  spawncoin();
  if(coinGroup.isTouching(player)){
    //playerScore=playerScore+200;
    p1.points=p1.points+200
    
    p1.update();

 
    }

}






   // || player.isTouching(poison)

    /*if( arrowGroup.isTouching(player) ||  ninjaGroup.isTouching(player)||  fireballGroup.isTouching(player)) {
      //poison.destroy();
      arrowGroup.destroyEach();
      fireballGroup.destroyEach();
      ninjaGroup.destroyEach();

      gameState=2;
  database.ref('/').set({

    gameState:2
  })
  console.log("hi")
    }*/



    
    
     
     

    if(arrowGroup.isTouching(player)){
      //playerHealth=playerHealth-10
      if(mortality===false){
        p1.health=p1.health-10}
     // p1.health=p1.health-10
      arrowGroup.destroyEach();
      p1.update();

      /*database.ref('/').update({

        playerHealth:playerHealth
      })*/
      }


      if(fireballGroup.isTouching(player)){
       // playerHealth=playerHealth-30
       if(mortality===false){
        p1.health=p1.health-30}
        //p1.health=p1.health-30
        fireballGroup.destroyEach();
        p1.update();
       /* database.ref('/').update({
  
          playerHealth:playerHealth
        })*/
        }



        if(ninjaGroup.isTouching(player)){
         // playerHealth=playerHealth-50
         if(mortality===false){
          p1.health=p1.health-50}
         // p1.health=p1.health-50
          ninjaGroup.destroyEach();
          p1.update();
         /* database.ref('/').update({
    
            playerHealth:playerHealth
          })*/
          }



          if(plantGroup.isTouching(player)){
           // playerHealth=playerHealth-20
           if(mortality===false){
            p1.health=p1.health-20}
            //p1.health=p1.health-20
            plantGroup.destroyEach();
            p1.update();
           /* database.ref('/').update({
      
              playerHealth:playerHealth
            })*/
            }



            if(dracoGroup.isTouching(player)){
             // playerHealth=playerHealth-40
              if(mortality===false){
                 p1.health=p1.health-200}
             // p1.health=p1.health-200
              dracoGroup.destroyEach();
              p1.update();
             /* database.ref('/').update({
        
                playerHealth:playerHealth
              })*/
              }

 //player.debug = true;
            }

  
  


  if(blockGroup.isTouching(player)) {
    blockGroup.destroyEach();
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: spawncoin();
      //console.log("coin")
              break;
      case 2: spawnbread();
     // console.log("bred")
              break;
      case 3: spawnapple();
              //console.log("apple")
              break;
    }
     }

     if(coinGroup.isTouching(player)){
       coinframecount=frameCount;

p1.points=p1.points+100
    
p1.update();

     }
if(coinframecount+5===frameCount){
  coinGroup.destroyEach();
}

     if(breadGroup.isTouching(player)){
      breadframecount=frameCount;
      breadGroup.destroyEach();
      p1.health=p1.health+100
      
      p1.update();
      
           }
           if(breadframecount+5===frameCount){
            breadGroup.destroyEach();
          }

           if(appleGroup.isTouching(player)){
           
             appleeatFrame=frameCount;
             
            p1.health=p1.health+100
            
            p1.update();
            
                 }
     
if(appleeatFrame+2000>frameCount ){
 mortality=true

}else{
  mortality=false
}
 
 
if(appleeatFrame+5===frameCount){
  appleGroup.destroyEach();
}






           
drawSprites();
if(gameState===2){

  textSize(50)
  fill(252,243,143)
  text("GAME OVER",displayWidth/2,40);
  text("YOU LOSE "+p1.name,displayWidth/2,90);

  arrowGroup.setVelocityXEach(0);
  arrowGroup.destroyEach();
  plantGroup.setVelocityXEach(0);
  plantGroup.destroyEach();
  fireballGroup.setVelocityXEach(0);
  fireballGroup.destroyEach();
  fireballGroup.setVelocityYEach(0);
   ninjaGroup.setVelocityXEach(0);
   ninjaGroup.destroyEach() ;  
   swordGroup.setVelocityXEach(0); 
   swordGroup.destroyEach(); 
   player.velocityX=0;
   player.velocityY=0;
   player.destroy();
}


if(gameState===3){

  textSize(50)
  fill(125,255,23)
  text("CONGRATS",displayWidth/2,40);
  text(" YOU FREED THE WORLD "+p1.name,displayWidth/2,90);

  arrowGroup.setVelocityXEach(0);
  arrowGroup.destroyEach();
  plantGroup.setVelocityXEach(0);
  plantGroup.destroyEach();
  fireballGroup.setVelocityXEach(0);
  fireballGroup.destroyEach();
  fireballGroup.setVelocityYEach(0);
   ninjaGroup.setVelocityXEach(0);
   ninjaGroup.destroyEach() ;  
   swordGroup.setVelocityXEach(0); 
   swordGroup.destroyEach(); 
   player.velocityX=0;
   player.velocityY=0;
   player.destroy();
   dragon.destroy();
}



} 




function spawnarrows() {
       
       if (frameCount % 30 === 0) {
         var arrow = createSprite(600,120,40,10);
         arrow.y = Math.round(random(0,255));
         arrow.x = Math.round(random(50,5000));
         arrow.addImage(arrowimg);
         arrow.scale = 0.2;
         arrow.velocityX = -15;
         
         
         arrow.lifetime = 900;
         
         
         
         
       
         arrowGroup.add(arrow);
       }
       
     }



     function spawnfireballs() {
       
       if (frameCount % 20 === 0) {
         var fireball = createSprite(600,10,40,10);
         
         fireball.x = Math.round(random(50,5000));
         fireball.addImage(fireballimg);
         fireball.scale = 0.2;
         fireball.velocityX = -10;
         fireball.velocityY = 15;
         
         fireball.lifetime = 200;
         
         
         
         
       
         fireballGroup.add(fireball);
       }
       
     }


     function spawnpoisons() {
       
       if(frameCount % 40===0) {
            var   plant = createSprite(600,255,40,10);
              plantCreatedFrame=frameCount;
              plant.x = Math.round(random(4055,5000));
         plant.addImage(plantimg);
         plant.scale = 0.2;

         plantGroup.add(plant);
               }
          
        
         
         
         
         
      
        
        
       
     }



     function spawnninjas() {
       
       if (frameCount % 50 === 0) {
         var ninja= createSprite(600,250,40,10);
         
         ninja.x = Math.round(random(4055,6000));
         ninja.addAnimation("running3",ninjaimg);
         ninja.scale = 0.4;
         ninja.velocityX = -15;
        
         
         ninja.lifetime = 900;
         
         
         
         
       
        ninjaGroup.add(ninja);
       }
       
     }


     function spawnsword()
{
    
    sword=createSprite(500,150,5,10)  
    sword.addImage(swordimg);
    sword.velocityX=10;
  
    sword.scale=0.3;
    sword.x=player.x;
    sword.y=player.y;
    sword.lifetime=130;
    swordGroup.add(sword);
}




function spawndraco() {
       
  if (frameCount % 10 === 0) {
    var draco = createSprite(600,-50,40,10);
    draco.x = Math.round(random(5650,5999));
    
    draco.addImage(dracoimg);
    draco.scale = 0.3;
    draco.velocityY = 20;
    
    
    draco.lifetime = 900;
    
    
    
    
  
    dracoGroup.add(draco);
  }
  
}



function spawnluckies() {
       
  if(frameCount % 100===0) {
         block = createSprite(600,255,40,10);
         blockCreatedFrame=frameCount;
         block.x = Math.round(random(50,5000));
         block.y = Math.round(random(100,255));
    block.addImage(blockimg);
    block.scale = 0.2;

    blockGroup.add(block);
          }
 }


 


 
 function spawncoin()
 {
  //console.log("inside coin")
     coin=createSprite(500,150,5,10)  
     coin.addImage(coinimg);
     
   
     coin.scale=0.1;
    coin.x=player.x+50;
     coin.y=player.y-20;
    
     coin.lifetime=130;
     coinGroup.add(coin);
    // console.log("inside coin2")
 }




 function spawnbread()
 {
  //if(frameCount % 100===0) {
  //  console.log("inside bread")
     bread=createSprite(500,150,10,10)  
     bread.addImage(breadimg);
     
   
    // bread.scale=0.3;
     bread.x=player.x+30;
     bread.y=player.y-30;
     bread.lifetime=130;
     breadGroup.add(bread);
// }
//console.log("inside bread2")
 }


 function spawnapple(x,y)
 {
 // if(frameCount % 100===0) {
 // console.log("inside apple")
     apple=createSprite(500,150,5,10)  
     apple.addImage(appleimg);
     
   
     apple.scale=0.1;
     apple.x=player.x+10;
     apple.y=player.y-20;
     apple.lifetime=130;
     appleGroup.add(apple);
//  }
//console.log("inside apple2")
}

