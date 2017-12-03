var game=new Phaser.Game(600, 600, Phaser.AUTO);//variable del juego, con una ventana de 600x600

//añadimos los estados
game.state.add('boot', bootScene);
game.state.add('load', loadScene);
game.state.add('menu', menuScene);
game.state.add('play', playScene);
game.state.add('ganar', ganarScene);
game.state.add('perder', perderScene);

game.state.start('boot');//iniciamos el estado boot