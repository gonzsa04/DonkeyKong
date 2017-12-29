//estado load
var loadScene={
	//preload es como awake en Unity, es usado para cargar assets normalmente
	preload:function(){
		//informamos de que esta cargando
		var loading=game.add.text(180, 250, 'Loading...', {font: '40px Courier', fill: '#FFF'})
		game.load.image('titulo', 'images/Titulo.png');//sprite del titulo
		game.load.spritesheet('start', 'images/start.png', 75, 21, 2);//sprites de botones
		game.load.spritesheet('exit', 'images/exit.png', 63, 21, 2);
		game.load.image('howHigh', 'images/howhigh.png');//how high can you get?
		game.load.image('plataforma', 'images/plataforma.png');//sprite de la plataforma
		game.load.image('escaleras', 'images/escaleras.png');//sprite de las escaleras
		game.load.image('hud', 'images/hud.png');//hud del juego
		game.load.image('decoMart', 'images/martDecor.png');
		game.load.image('decoBarril', 'images/BarrilDecor.png');
		game.load.image('decoEscaleras', 'images/escalerasDecor.png');
		game.load.tilemap('map', 'images/nivel1.json', null, Phaser.Tilemap.TILED_JSON);//mapa del nivel 1
		game.load.spritesheet('princesa', 'images/peachAnim.png', 92, 45, 5);//sprite de la princesa
		game.load.spritesheet('DK', 'images/DKAnim.png', 96, 72, 14)
		game.load.spritesheet('drumOil', 'images/oilDrum.png', 30, 57, 2);
		game.load.spritesheet('barril', 'images/Barril.png', 30, 20, 6);//barril
		game.load.spritesheet('marioAnim', 'images/marioAnim.png', 36, 32, 15);//mario
	},
	//create es como Start en Unity
	create:function(){
		game.state.start('menu');//empieza el estado menu
	}
};