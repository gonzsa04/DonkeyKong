//estado del menu
var menuScene={
    create: function(){
        //titulo del juego
        this.title = game.add.sprite(0, 50, 'titulo');
        this.title.animations.add('title', [0,1], 4, true);
        this.title.animations.play('title');
        this.title.x = game.width/2 - this.title.width/2;

        //boton start
        this.start = new Button(0, 450, 'start');
        this.start.seleccionado();

        //boton de controles
        this.controls = new Button(0, 500, 'controls');
        this.controls.noSeleccionado()

        //decorado
        this.decorado = game.add.group();
        this.oilDrum1 = this.decorado.create(0, 0, 'drumOil');
        this.oilDrum1.animations.add('normal', [0,1], 2, true);
        this.DK=this.decorado.create(0, 0, 'DK');
        this.DK.animations.add('normal', [0,1,2], 3, true);
        this.oilDrum2 = this.decorado.create(0, 0, 'drumOil');
        this.oilDrum2.animations.add('normal', [0,1], 2, true);
        this.mario = this.decorado.create(0, 0, 'animMart');
        this.mario.animations.add('normal', [1], 1, false);

        for(i = 0; i < this.decorado.length; i++){
            this.decorado.children[i].x = game.width/4 + i*game.width/4 - this.decorado.children[i].width/2;
            this.decorado.children[i].y = 3*game.height/5 - this.decorado.children[i].height/2;
            this.decorado.children[i].animations.play('normal');
        }

        //definimos teclas
        this.cursors = game.input.keyboard.createCursorKeys();
        this.space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    //controla el input para seleccionar jugar o salir
    update: function(){
        if(this.start.activado()){
            this.mario.x = this.start.x - this.mario.width;
            this.mario.y = this.start.y - this.mario.height/2;
        }
        else{
            this.mario.x = this.controls.x - this.mario.width;
            this.mario.y = this.controls.y - this.mario.height/2;
        }
        if(this.cursors.up.isDown){
            this.start.seleccionado();
            this.controls.noSeleccionado()
        }
        else if(this.cursors.down.isDown){
            this.start.noSeleccionado();
            this.controls.seleccionado()
        }
        if(this.space.isDown){
            if(this.start.activado())this.play();
            else this.controlsMenu();
        }
    },

    play: function(){//llamada al pulsar espacio
        game.state.start('howHigh');//se inicia el estado 'howHigh'
    },

    controlsMenu: function(){//llamada al pulsar espacio
        game.state.start('controls');//se inicia el estado 'controls'
    }
};