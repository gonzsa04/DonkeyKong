//estado ganar
var ganarScene={
    create:function(){
        var ganar=game.add.text(100, 250, 'HAS GANADO!', {font: '50px Arial', fill: '#FFF'});
        var begin=game.add.text(100, 550, 'Presiona espacio para volver al menú', {font: '25px Arial', fill: '#FFF'});
        var space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.menu, this);
    },

    menu: function(){
        game.state.start('menu');
    }
};