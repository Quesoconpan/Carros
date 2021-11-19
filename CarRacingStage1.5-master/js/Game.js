class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState'); // la referencia de gamestate a la base de datos
    gameStateRef.on("value",function(data){ //cra un oyente hacia la base de datos
       gameState = data.val(); //obtiene el valor del gamestate
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage("car1",car1IMG);
    car2.addImage("car2",car2IMG);
    car3.addImage("car3",car3IMG);
    car4.addImage("car4",car4IMG);
  
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd();
   
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      background("blue");
      image(trackIMG,0,-displayHeight*4,displayWidth,displayHeight*5);


      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10); //marca el grosor para el identificador
          fill("green"); //es el color del identificador
          ellipse(x,y,60,60); //es la forma del identificador
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10 //le va aumentando 10 puntos de distancia al jugador
      player.update();
    }

    if(player.distance>4400){ // esa es la distancia de los coches a meta
      gameState=2; //este actualiza el gamestate
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    console.log("ranking", player.rank);
    }

    drawSprites();
  }
}
