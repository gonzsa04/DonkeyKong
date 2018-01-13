//estado boot
var bootScene={
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);//inicializa las fisicas arcade
		game.state.start('load');//empieza el estado load
		game.load.spritesheet('barril', 'images/Barril.png', 30, 20, 9);//barril
	}	
};