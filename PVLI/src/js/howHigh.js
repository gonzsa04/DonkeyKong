//estado how high can you get
var howHighScene = {
    create:function(){
        //HUD
        game.add.image(0, 0, 'hud');
        var posx = 15;
        var posy = 30;//pintamos las vidas que le quedan a mario
        for (var i = 0; i < game.vidas; i++) game.add.image(posx+i*14, posy, 'decoVidas');
        this.highScoreText = game.add.bitmapText(450, 25, 'gem', game.highScore.toString(), 20);//texto de maxima puntuacion
        //DK
        if(game.nivel == 1)this.dk = game.add.sprite(0, 0, 'howHigh');//se inicia el estado 'play'
        else if(game.nivel == 2)this.dk = game.add.sprite(0, 0, 'howHigh2');
        else if(game.nivel == 3)this.dk = game.add.sprite(0, 0, 'howHigh3');
        this.dk.x = game.width/2 - this.dk.width/2;
        this.dk.y = 3*game.height/4 - this.dk.height/2;
        this.tiempoEspera = 2;
        this.cont = 0;

        game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo
    },

    actualizaContador:function(){
        if(this.cont < this.tiempoEspera)this.cont++;
        else {
            if(game.nivel == 1)game.state.start('play');//se inicia el estado 'play'
            else if(game.nivel == 2)game.state.start('play2');
            else if(game.nivel == 3)game.state.start('play3');
        }
    }
}