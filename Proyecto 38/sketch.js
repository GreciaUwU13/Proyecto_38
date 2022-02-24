/*Hola maestra buenas tardes, intenté hacer la camara pero me faltaba el valor que va en la base de datos
en el caso de la carrera de autos es allPlayers, lo cual no supe exactamente como acomodarlo en este programa
pues no es nescesario usar una base de datos que almacene la entrada de los jugadores, ya que solo es un jugador 
pero aún así funciona el programa, el único inconveniente es que se congela después de cierto tiempo :3 */
var path,mainCyclist;
var player1,player2,player3, players;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG, colorsC; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(displayWidth, displayHeight);
// Fondo en movimiento
path=createSprite(displayWidth, displayHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(100,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//establece el colisionador para el mainCyclist
mainCyclist.setCollider("circle", 150, 20, 500);
  mainCyclist.debug = false;
  
gameOver = createSprite(displayWidth/2, displayHeight/4);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false; 

players = [player1, player2, player3]; //matriz
colorsC = [pinkCG, yellowCG, redCG];
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distance, displayWidth/2,40);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    var index = 0;
    var x = 175;
    var y;

    if (select_oppPlayer == 1) {
      index = index + 1;
      x = x + 200;
      y = displayHeight - colorsC.distance;
      players[index-1].x = x;
      players[index].y = y;

      if(index === mainCyclist.index){
        camera.position.x = displayWidth;
        camera.position.y = players[index].y;
      }
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  //si el ciclista choca con alguno de los jugadores se acaba el juego
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
  //Agrega aquí el código para mostrar la instrucción de            reinicio del juego, en forma de texto
  textSize(20)
  fill(255);
  text("Presiona la flecha de hacia arriba para reiniciar el juego", displayWidth/3, displayHeight/3);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    //escribe la condición para llamar reset( )
  if(keyDown("UP_ARROW"))
    reset();
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//crea aquí la función de reinicio

function reset(){
  gameState = PLAY;
  redCG.destroyEach();
  yellowCG.destroyEach();
  pinkCG.destroyEach();
  gameOver.visible = false;
  if(keyDown("UP_ARROW")){
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);}
  distance = 0
}




