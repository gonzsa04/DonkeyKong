//estado ganar
var ganarScene={
    create:function(){
        game.vidas = 3;
        game.score = 0;
        game.nivel = 1;
        var youWin = game.add.sprite(100, 250, 'youWin');
        youWin.x = game.width/2 - youWin.width/2;
        youWin.y = game.height/2 - youWin.height/2;
        var begin=game.add.text(0, 550, 'Press space to continue', {font: '25px Arial', fill: '#FFF'});
        begin.x = game.width/2 - begin.width/2;
        var space=game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.addOnce(this.menu, this);
    },

    menu: function(){
        game.state.start('menu');
    }
};