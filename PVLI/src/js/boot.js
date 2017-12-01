//estado boot
var bootScene={
	create:function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);//inicializa las fisicas
		game.state.start('load');//empieza el estado load
	}	
};