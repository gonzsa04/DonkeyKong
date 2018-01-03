//estado how high can you get
var howHighScene = {
    create:function(){
        this.dk = game.add.sprite(0, 0, 'howHigh');
        this.dk.x = game.width/2 - this.dk.width/2;
        this.dk.y = 3*game.height/4 - this.dk.height/2;
        this.tiempoEspera = 2;
        this.cont = 0;

        game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo
    },

    actualizaContador:function(){
        if(this.cont < this.tiempoEspera)this.cont++;
        else game.state.start('play');//se inicia el estado 'play'
    }
}