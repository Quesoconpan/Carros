class Form {

  constructor() {
    this.input = createInput("Name"); //creacion del registro de jugador
    this.button = createButton('Play'); //creacion del boton de play
    this.greeting = createElement('h2'); //creacion del saludo
    this.title = createElement('h2'); //creacion del titulo del juego
    this.reset = createButton("Reset"); //creacion del boton para resetear
  }
  hide(){
    this.greeting.hide(); //aqui se esconde el saludo
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0); //se pone la posicion del titulo

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20); //posicion del boton
    2
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1; //aqui le decimos al PlayerCount que agrege al jugador cuando ponga su nombre
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

    this.reset.mousePressed(()=>{ //reseteo del realtime firebase
    player.updateCount(0);
    game.update(0);
    
  })

  }
}