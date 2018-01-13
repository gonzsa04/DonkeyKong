//escena de controles
var controlsScene = {
    create: function(){
        //titulo del juego
        this.title = game.add.sprite(0, 50, 'titulo');
        this.title.animations.add('title', [0,1], 4, true);
        this.title.animations.play('title');
        this.title.x = game.width/2 - this.title.width/2;
        this.texto = game.add.text(0, 550, 'Press space to return to the menu', {font: '25px Arial', fill: '#FFF'});
        this.texto.x = game.width/2 - this.texto.width/2;

        //se muestran los controles
        this.controls = game.add.sprite(0, 350, 'menuControles');
        this.controls.x = game.width/2 - this.controls.width/2;

        //decoracion
        this.musica = game.add.audio('musicaControles', 1, true);
        this.musica.play();
        this.decorado = game.add.group();
        this.move = this.decorado.create(0, 0, 'marioAnim');
        this.move.animations.add('normal', [1, 0, 2], 20, true);
        this.stairs = this.decorado.create(0, 0, 'marioAnim');
        this.stairs.animations.add('normal', [3, 4], 8, true);
        this.jump = this.decorado.create(0, 0, 'marioAnim');
        this.jump.animations.add('normal', [0, 1, 2, 5, 5, 6], 8, true);

        for(i = 0; i<this.decorado.length; i++){
            this.decorado.children[i].scale.setTo(1.5, 1.5);
            this.decorado.children[i].x = this.controls.x - this.decorado.children[i].width;
            this.decorado.children[i].y = this.controls.y*10/11 + i*game.height/9;
            this.decorado.children[i].animations.play('normal');
        }

        //si pulsas espacio vuelves al menu
        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.menu, this);
    },

    menu: function(){
        this.musica.stop();
        game.state.start('menu');
    }
}