//estado play
var playScene={
    create: function(){
        this.cursors=game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)

        //ESCALERAS
        //metemos todas las escaleras en un mismo grupo,
        this.escaleras=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una

        this.escalera1=this.escaleras.create(545, 448, 'escaleras');
        this.escalera2=this.escaleras.create(30, 345, 'escaleras');
        this.escalera3=this.escaleras.create(545, 245, 'escaleras');
        this.escalera4=this.escaleras.create(30, 145, 'escaleras');
        this.escalera5=this.escaleras.create(545, 45, 'escaleras');
        this.escaleras.setAll('scale.x', 3);//escalamos las escaleras
        this.escaleras.setAll('scale.y', 4);
        this.escaleras.setAll('body.inmovable', true);//las hacemos inmovibles

        //PLATAFORMAS
        //lo mismo con las plataformas
        this.plataformas=game.add.physicsGroup();

        //metemos en el grupo de plataformas la primera planta del juego
        this.planta1=this.plataformas.create(0, 550, 'plataforma');
        this.planta1.scale.setTo(9, 2);//la escalamos
        this.planta1.body.immovable=true;//la hacemos inmovible
        //lo mismo con las demas plantas
        this.planta2=this.plataformas.create(0, 450, 'plataforma');
        this.planta2.scale.setTo(9, 2);//la escalamos
        this.planta2.body.immovable=true;//la hacemos inmovible
        this.planta3=this.plataformas.create(0, 350, 'plataforma');
        this.planta3.scale.setTo(9, 2);//la escalamos
        this.planta3.body.immovable=true;//la hacemos inmovible
        this.planta4=this.plataformas.create(0, 250, 'plataforma');
        this.planta4.scale.setTo(9, 2);//la escalamos
        this.planta4.body.immovable=true;//la hacemos inmovible
        this.planta5=this.plataformas.create(0, 150, 'plataforma');
        this.planta5.scale.setTo(9, 2);//la escalamos
        this.planta5.body.immovable=true;//la hacemos inmovible
        this.planta6=this.plataformas.create(0, 50, 'plataforma');
        this.planta6.scale.setTo(9, 2);//la escalamos
        this.planta6.body.immovable=true;//la hacemos inmovible

        //PRINCESA
        //princesa a la que rescatar
        this.princesa=game.add.sprite(50, 0, 'princesa');
        game.physics.arcade.enable(this.princesa);

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
        //si mario esta sobre una escalera, llama al metodo PuedeSubir (callback). Si no, llama a noPuedeSubir de mario
        if(!game.physics.arcade.overlap(this.mario.mario, this.escaleras, this.PuedeSubir, null, this))this.mario.noPuedeSubir();
        //si mario llega hasta la princesa gana (true)
        if(game.physics.arcade.overlap(this.mario.mario, this.princesa)) this.fin(true);
    },

    //si mario esta justo sobre la escalera puede subirla, si no no
    //si se encuentra en las dos terceras partes de la escalera que esta subiendo podrá atravesar el muro de encima
    PuedeSubir: function(mario, escaleras){
        if(mario.x < escaleras.x + escaleras.width*4/5 && mario.x > escaleras.x)this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        if(mario.y < escaleras.y + escaleras.height*2/3) this.mario.atraviesa();
    },

    //metodo llamado cuando ganamos (true) o perdemos (false)
    fin: function(ganar){
        //eliminamos todas las entidades
        this.escaleras.callAll('kill');
        this.plataformas.callAll('kill');
        this.princesa.kill();
        this.mario.morir();
        //llamamos al menu de ganar o perder
        if(ganar) game.state.start('ganar');
        else game.state.start('perder');
    }
};