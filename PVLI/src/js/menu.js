//estado del menu
var menuScene={
    create: function(){
        //titulo del juego
        this.title = game.add.sprite(0, 100, 'titulo');
        this.title.x = game.width/2 - this.title.width/2;
        //boton start
        this.start = new Button(0, 450, 'start');
        this.start.seleccionado();
        //boton exit
        this.exit = new Button(0, 500, 'exit');
        this.exit.noSeleccionado()
        //definimos teclas
        this.cursors = game.input.keyboard.createCursorKeys();
        this.space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    //controla el input para seleccionar jugar o salir
    update: function(){
        if(this.cursors.up.isDown){
            this.start.seleccionado();
            this.exit.noSeleccionado()
        }
        else if(this.cursors.down.isDown){
            this.start.noSeleccionado();
            this.exit.seleccionado()
        }
        if(this.space.isDown){
            if(this.start.activado())this.play();
        }
    },

    play: function(){//llamada al pulsar espacio
        game.state.start('howHigh');//se inicia el estado 'howHigh'
    }
};