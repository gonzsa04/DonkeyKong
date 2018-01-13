//estado load
var loadScene={
	//preload es como awake en Unity, es usado para cargar assets normalmente
	preload:function(){
		//informamos de que esta cargando
		this.cargando = game.add.sprite(270, 280, 'barril');
        this.cargando.animations.add('rotate', [0,1, 2, 3], 8, true);
        this.cargando.animations.play('rotate');
		game.load.bitmapFont('gem', 'images/gem.png', 'images/gem.xml');//cargamos fuente del texto
		game.load.spritesheet('titulo', 'images/Titulo.png', 450, 240, 2);//sprite del titulo
		game.load.spritesheet('start', 'images/start.png', 76, 21, 2);//sprites de botones
		game.load.spritesheet('controls', 'images/controles.png', 120, 21, 2);
		game.load.image('menuControles', 'images/controls.png');//sprites del menu de controles
		game.load.image('howHigh', 'images/howhigh.png');//how high can you get?
		game.load.image('howHigh2', 'images/howhigh2.png');//how high can you get?
		game.load.image('howHigh3', 'images/howhigh3.png');//how high can you get?
		game.load.image('plataforma', 'images/plataforma.png');//sprite de la plataforma
		game.load.image('Plataforma', 'images/plataforma1.png');//sprite de la plataforma
		game.load.image('plataforma2', 'images/plataforma2.png');//sprite de la plataforma
		game.load.image('plataforma3', 'images/plataformalvl3.png');//sprite de la plataforma del nivel 3
		game.load.image('escaleras', 'images/escaleras.png');//sprite de las escaleras
		game.load.image('escalerasA', 'images/escalerasA.png');//sprite de las escaleras
		game.load.image('escalerasG', 'images/escalerasG.png');//sprite de las escaleras
		game.load.image('escalerasGG', 'images/escalerasGG.png');//sprite de las escaleras
		game.load.image('escalerasRotas', 'images/escalerasRotas.png');//sprite de las escaleras
		game.load.image('hud', 'images/hud.png');//hud del juego
		game.load.image('decoMart', 'images/martDecor.png');
		game.load.image('decoBarril', 'images/BarrilDecor.png');
		game.load.image('decoEscaleras', 'images/escalerasDecor.png');
		game.load.image('decoVidas', 'images/vidasDecor.png');
		game.load.image('decoMovil', 'images/PlatmovilDecor.png');
		game.load.tilemap('map', 'images/nivel1.json', null, Phaser.Tilemap.TILED_JSON);//mapa del nivel 1
		game.load.tilemap('map2', 'images/nivel2.json', null, Phaser.Tilemap.TILED_JSON);//mapa del nivel 2
		game.load.tilemap('map3', 'images/nivel3.json', null, Phaser.Tilemap.TILED_JSON);//mapa del nivel 3
		game.load.spritesheet('princesa', 'images/peachAnim.png', 92, 45, 5);//sprite de la princesa
		game.load.spritesheet('DK', 'images/DKAnim.png', 96, 72, 14)
		game.load.spritesheet('decoScore', 'images/scoreDecor.png', 34, 30, 3);
		game.load.spritesheet('drumOil', 'images/oilDrum.png', 30, 57, 2);
		game.load.spritesheet('barril', 'images/Barril.png', 30, 20, 9);//barril
		game.load.spritesheet('barrilAzul', 'images/BarrilAzul.png', 30, 20, 6);//barril azul
		game.load.spritesheet('Flama', 'images/llamaAnim.png', 32, 32, 8);//Flama
		game.load.spritesheet('Flama2', 'images/llamaAnim2.png', 32, 28, 8);//Flama
		game.load.spritesheet('marioAnim', 'images/marioAnim.png', 98, 52, 21);//mario
		game.load.image('youWin', 'images/youWin.png');//has ganado
		game.load.image('gameOver', 'images/gameOver.png');//has perdido
		game.load.audio('musicaMenu', 'audio/menuTheme.ogg');
		game.load.audio('musicaSalto', 'audio/jump.ogg');
		game.load.audio('musicaAndar', 'audio/walking.ogg');
		game.load.audio('musicaSaltarBarril', 'audio/jumpbar.ogg');
		game.load.audio('musicaMuerte', 'audio/death.ogg');
		game.load.audio('musicaMartillo', 'audio/hammer.ogg');
		game.load.audio('musicaMartilloAplastar', 'audio/hammerKill.ogg');
		game.load.audio('musicaGanar', 'audio/win1.ogg');
		game.load.audio('musicaItem', 'audio/itemget.ogg');
		game.load.audio('musicaHowHigh', 'audio/howhigh.ogg');
		game.load.audio('musicaFondo', 'audio/DonkeyKongBackgroundMusic.ogg');
		game.load.audio('musicaControles', 'audio/musicaControles.ogg');
	},
	//create es como Start en Unity
	create:function(){
		game.state.start('menu');//empieza el estado menu
	}
};