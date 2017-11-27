//estado perder
var perderScene={
    create:function(){
        var perder=game.add.text(100, 250, 'HAS PERDIDO', {font: '50px Arial', fill: '#FFF'});
        var begin=game.add.text(100, 550, 'Presiona espacio para volver al menú', {font: '25px Arial', fill: '#FFF'});
        var space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.menu, this);
    },

    menu: function(){
        game.state.start('menu');
    }
};