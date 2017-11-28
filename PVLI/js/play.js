//estado play
var playScene={
    create: function(){
        this.cursors=game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)

        this.map=game.add.tilemap('nivel1');
        this.map.addTilesetImage('tiles', 'gameTiles');
        this.backgroundLayer=this.map.createLayer('backgroundLayer');
        this.blockedLayer=this.map.createLayer('blockedLayer');
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
        this.backgroundLayer.resizeWorld();
        /*//PLATAFORMAS
        //metemos todas las plataformas en un mismo grupo,
        this.plataformas=game.add.group();//asi tratamos todas a la vez y no una por una
        this.plataformas.enableBody=true;//añadimos fisicas a las plataformas

        //metemos en el grupo de plataformas la primera planta del juego
        this.planta1=this.plataformas.create(0, 550, 'plataforma');
        this.planta1.scale.setTo(2, 2);//la escalamos
        this.planta1.body.immovable=true;//la hacemos inmovible
        //lo mismo con las demas plantas
        this.planta2=this.plataformas.create(25, 450, 'plataforma');
        this.planta2.scale.setTo(1.4, 0.0250);//la escalamos
        this.planta2.body.immovable=true;//la hacemos inmovible
        this.planta3=this.plataformas.create(25, 350, 'plataforma');
        this.planta3.scale.setTo(1.4, 0.0250);//la escalamos
        this.planta3.body.immovable=true;//la hacemos inmovible
        this.planta4=this.plataformas.create(25, 250, 'plataforma');
        this.planta4.scale.setTo(1.4, 0.0250);//la escalamos
        this.planta4.body.immovable=true;//la hacemos inmovible
        this.planta5=this.plataformas.create(25, 150, 'plataforma');
        this.planta5.scale.setTo(1.4, 0.0250);//la escalamos
        this.planta5.body.immovable=true;//la hacemos inmovible
        this.planta6=this.plataformas.create(25, 50, 'plataforma');
        this.planta6.scale.setTo(1.4, 0.0250);//la escalamos
        this.planta6.body.immovable=true;//la hacemos inmovible

        //ESCALERAS
        //hacemos lo mismo con las escaleras
        this.escaleras=game.add.group();
        this.escaleras.enableBody=true;

        this.escalera1=this.escaleras.create(545, 445, 'escaleras');
        this.escalera1.scale.setTo(3,4);
        this.escalera1.body.immovable=true;
        this.escalera2=this.escaleras.create(30, 345, 'escaleras');
        this.escalera2.scale.setTo(3,4);
        this.escalera3=this.escaleras.create(545, 245, 'escaleras');
        this.escalera3.scale.setTo(3,4);
        this.escalera4=this.escaleras.create(30, 145, 'escaleras');
        this.escalera4.scale.setTo(3,4);
        this.escalera5=this.escaleras.create(545, 45, 'escaleras');
        this.escalera5.scale.setTo(3,4);*/

        //PRINCESA
        this.princesa=game.add.group();
        this.princesa.enableBody=true;
        this.princesa1=this.princesa.create(50, 0, 'princesa');
        this.princesa1.scale.setTo(0.1, 0.1);

        //MARIO
        //por ultimo el jugador, para que se pinte por encima de todo
        this.mario=new Mario();

        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //definimos la tecla espacio
    },

    update: function(){
        this.mario.update(this.plataformas);//llamamos al update de mario
        this.teclas();//llamamos al gestor del input
        this.colisiones();//comprobamos las colisiones
    },

    //gestiona el input
    teclas: function(){
        //si se pulsa izquierda mario se mueve en esa direccion
        if(this.cursors.left.isDown)this.mario.mueveIzquierda();
        //lo mismo con derecha
        else if(this.cursors.right.isDown)this.mario.mueveDerecha();
        //si se pulsa espacio mario salta
        if(this.SpaceKey.isDown)this.mario.saltar();
        //si se pulsa arriba o abajo mario sube o baja por las escaleras
        if(this.cursors.up.isDown)this.mario.escaleras(-75);
        else if(this.cursors.down.isDown)this.mario.escaleras(75);
    },

    //gestiona las colisiones
    colisiones: function(){
        //si mario esta sobre una escalera, llama al metodo puedeSubir de este
        if(game.physics.arcade.overlap(this.mario.mario, this.escaleras))this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        //si mario llega hasta la princesa gana
        if(game.physics.arcade.overlap(this.mario.mario, this.princesa)) this.ganar();
    },

    //metodo llamado cuando ganamos
    ganar: function(){
        this.mario.morir();
        game.state.start('ganar');
    },

    //metodo llamado cuando perdemos
    perder: function(){
        this.mario.morir();
        game.state.start('perder');
    }
};