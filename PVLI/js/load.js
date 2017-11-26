//estado load
var loadScene={
	//preload es como awake en Unity, es usado para cargar assets normalmente
	preload:function(){
		//informamos de que esta cargando
		var loading=game.add.text(180, 250, 'Loading...', {font: '40px Courier', fill: '#FFF'})
		game.load.image('mario', 'images/mario.png');//sprite de Mario
		game.load.image('plataforma', 'images/plataforma.png');//sprite de la plataforma
	},
	//create es como Start en Unity
	create:function(){
		game.state.start('menu');//empieza el estado menu
	}
};