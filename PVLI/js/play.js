//estado play
var playScene={
    create: function(){
        this.cursors=game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)
        this.mario=new Mario();//jugador

        //metemos todas las plataformas en un mismo grupo,
        this.plataformas=game.add.group();//asi tratamos todas a la vez y no una por una
        this.plataformas.enableBody=true;//añadimos fisicas a las plataformas

        //metemos en el grupo de plataformas la primera planta del juego
        this.planta1=this.plataformas.create(0, 550, 'plataforma');
        this.planta1.scale.setTo(2, 2);//la escalamos
        this.planta1.body.immovable=true;//la hacemos inmovible
    },

    update: function(){
        this.mario.update(this.plataformas);//llamamos al update de mario
        this.input;//llamamos al gestor del input
    },

    //gestiona el input
    input: function(){
        //si se pulsa izquierda mario se mueve en esa direccion
        if(this.cursors.left.isDown)this.mario.mueveIzquierda();
        //lo mismo con derecha
        else if(this.cursors.right.isDown)this.mario.mueveDerecha();
        //si se pulsa arriba mario salta
        else if(this.cursors.up.isDown)this.mario.saltar();
    }
};