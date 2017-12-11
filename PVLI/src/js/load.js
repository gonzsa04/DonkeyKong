//estado load
var loadScene={
	//preload es como awake en Unity, es usado para cargar assets normalmente
	preload:function(){
		//informamos de que esta cargando
		var loading=game.add.text(180, 250, 'Loading...', {font: '40px Courier', fill: '#FFF'})
		game.load.image('plataforma', 'images/plataforma.png');//sprite de la plataforma
		game.load.image('escaleras', 'images/escaleras.png');//sprite de las escaleras
		game.load.image('princesa', 'images/princesa.png');//sprite de la princesa
		game.load.tilemap('map', 'images/nivel1.json', null, Phaser.Tilemap.TILED_JSON);//mapa del nivel 1
		game.load.spritesheet('barril', 'images/Barril.png', 30, 20, 6);//barril
		game.load.spritesheet('marioAnim', 'images/marioAnim.png', 36, 32, 21);//mario
	},
	//create es como Start en Unity
	create:function(){
		game.state.start('menu');//empieza el estado menu
	}
};