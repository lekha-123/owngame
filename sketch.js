var Robot,RobotImages;
var LaserBall,BallImages;
var ground;
var BallGroup;
var GameOver,GameContinue,yes,no;
var GameOverI,GameContinueI,yesI,noI;
var score=0;
var play=1;
var end=0;
var Gamestate=play;
var invisground


function preload(){
RobotImages=loadImage("robot floating.png");
BallImages=loadImage("Laser Ball.png");
GameOverI=loadImage("GameOver.png");
GameContinueI=loadImage("do u want to continue.png");
yesI=loadImage("yesImage.png");
noI=loadImage("noImage.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    GameOver = createSprite(width/2,height/2-100,50,100);
    GameOver.visible=false;
    GameOver.addImage(GameOverI);

    GameContinue = createSprite(width/2,height/2,100,20);   
    GameContinue.addImage(GameContinueI);
    GameContinue.visible=false;

    yes = createSprite(width/2-100,height/2+20,50,50);
    yes.addImage(yesI);
    yes.visible=false;

    no= createSprite(width/2+100,height/2+20,50,50);
    no.addImage(noI);
    no.visible=false;

    Robot = createSprite(100,height-120,25,25);
    Robot.addImage(RobotImages);
    Robot.scale=0.5;
    Robot.setCollider("rectangle",0,0,25,25);
    

    ground=createSprite(width,height-10,width*2,10);
    ground.velocityX=-9;

    invisground=createSprite(width/2,height-120,width*2,10);
    invisground.visible=false
    
    //groups
    BallGroup=new Group();
    
}

function draw() {
    background("black");

    //score
    fill ("white");
    textSize(25);
    text("Score:"+score,width-200,50);

    if(Gamestate===play){

        ground.velocityX=-(8+score/100);

    if(ground.x<0){
        ground.x=width/2;
        }

        if(keyDown("Space")&&Robot.y>height-175){
            Robot.velocityY= -20;
        }
      
        Robot.velocityY=Robot.velocityY+0.75;
      
        CreateBalls();
      
      if(BallGroup.isTouching(Robot)){
          Gamestate=end;
      }
      
      //score increase
      score=score+Math.round(getFrameRate()/60)

      if(BallGroup.isTouching(Robot)){
        GameOver.visible=true;
        GameContinue.visible=true;
        yes.visible=true;
        no.visible=true;
    }

   
    }

      if(Gamestate===end){
          ground.velocityX=0;
         BallGroup.setVelocityXEach(0);
         BallGroup.setLifetimeEach(-1);
          GameContinue.visible=true;
          GameOver.visible=true;
          yes.visible=true;
          no.visible=true;
        
          Robot.velocityY=0;


          if(mousePressedOver(yes)){
            reset();
          }
        }
   

 
   

   


    Robot.collide(invisground);
    drawSprites();

    
}

function CreateBalls(){
    if(frameCount%80==0){
        LaserBall=createSprite(width,height-100,50,50);
        LaserBall.velocityX=Math.round(random(-7,-15));
        LaserBall.y=Math.round(random(height-50,height-300));
        LaserBall.addImage(BallImages);
        LaserBall.scale=0.2;

        LaserBall.lifeTime=width/LaserBall.velocityX;
        BallGroup.add(LaserBall);
    }
}
function reset(){
    Gamestate=play;
    GameOver.visible=false;
    yes.visible=false;
    no.visible=false
    GameContinue.visible=false
    BallGroup.destroyEach();
    score=0;
  }

