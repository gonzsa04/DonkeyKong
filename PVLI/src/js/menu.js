//estado del menu
var menuScene={
    create: function(){
        //titulo del juego
        var title=game.add.text(100, 250, 'DONKEY KONG', {font: '50px Arial', fill: '#FFF'});
        //instrucciones de como empezar
        var begin=game.add.text(120, 550, 'Presiona espacio para jugar', {font: '25px Arial', fill: '#FFF'});
        //definimos la tecla espacio
        var space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //cuando la tecla espacio, antes definida, se pulse se llamara a la funcion start (una sola vez)
        space.onDown.addOnce(this.start, this);//start es una funcion del estado menu
    },

    start: function(){//llamada al pulsar espacio
        game.state.start('play');//se inicia el estado 'play'
    }
};