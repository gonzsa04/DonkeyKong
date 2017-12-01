//estado load
var loadScene={
	//preload es como awake en Unity, es usado para cargar assets normalmente
	preload:function(){
		//informamos de que esta cargando
		this.game.load.baseURL = "https://github.com/gonzsa04/DonkeyKong/tree/master/PVLI/src/images";
		this.game.load.crossOrigin = 'anonymous';
		var loading=game.add.text(180, 250, 'Loading...', {font: '40px Courier', fill: '#FFF'})
		game.load.image('mario', 'images/mario.png');//sprite de Mario
		game.load.image('plataforma', 'images/plataforma.png');//sprite de la plataforma
		game.load.image('escaleras', 'images/escaleras.png');//sprite de las escaleras
		game.load.image('princesa', 'images/princesa.png');//sprite de la princesa
	},
	//create es como Start en Unity
	create:function(){
		game.state.start('menu');//empieza el estado menu
	}
};
