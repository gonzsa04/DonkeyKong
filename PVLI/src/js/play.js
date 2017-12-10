//estado play
var playScene={
    create: function(){
        this.cursors=game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)

        //ESCALERAS
        //metemos todas las escaleras en un mismo grupo,
        this.escaleras=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una

        this.escalera1=this.escaleras.create(445, 501, 'escaleras');
        this.escalera1.scale.setTo(2.3, 3);
        this.escalera2=this.escaleras.create(140, 407, 'escaleras');
        this.escalera2.scale.setTo(2.3, 3);
        this.escalera3=this.escaleras.create(310, 403, 'escaleras');
        this.escalera3.scale.setTo(2.3, 3.5);
        this.escalera4=this.escaleras.create(350, 325, 'escaleras');
        this.escalera4.scale.setTo(2.3, 3.2);
        this.escalera5=this.escaleras.create(445, 331, 'escaleras');
        this.escalera5.scale.setTo(2.3, 3);
        this.escalera6=this.escaleras.create(140, 250, 'escaleras');
        this.escalera6.scale.setTo(2.3, 3);
        this.escalera7=this.escaleras.create(237, 245, 'escaleras');
        this.escalera7.scale.setTo(2.3, 3);
        this.escalera8=this.escaleras.create(445, 175, 'escaleras');
        this.escalera8.scale.setTo(2.3, 3);
        this.escalera9=this.escaleras.create(310, 80, 'escaleras')
        this.escalera9.scale.setTo(2.3, 3.5);
        this.escaleras.setAll('body.inmovable', true);//las hacemos inmovibles

        //MAPA
        //cargamos un mapa de tiled con las plataformas del nivel1
        this.map=game.add.tilemap('map');
        this.map.addTilesetImage('plataforma');
        this.layer=this.map.createLayer('Capa de Patrones 1');
        this.map.setCollisionBetween(1, 300, true, this.layer);
        this.layer.resizeWorld();

        //PRINCESA
        //princesa a la que rescatar
        this.princesa=game.add.sprite(220, 30, 'princesa');
        game.physics.arcade.enable(this.princesa);

        this.barril=new Barril(150, 154, 'barril');

        //MARIO
        //por ultimo el jugador, para que se pinte por encima de todo
        this.mario=new Mario(200, 520, 'mario');

        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //definimos la tecla espacio
    },

    update: function(){
        //game.debug.body(this.mario.mario);//vemos en pantalla el collider de mario (debug)
        this.mario.update(this.layer);//llamamos al update de mario
        this.barril.update(this.layer);
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
        if(!game.physics.arcade.overlap(this.mario.gameObject, this.escaleras, this.PuedeSubir, null, this))this.mario.noPuedeSubir();
        //si un barril esta sobre una escalera se llama al metodo PuedeBajar (callback). Si no, llama a noDecidido del barril
        if(!game.physics.arcade.overlap(this.barril.gameObject, this.escaleras, this.PuedeBajar, null, this)) this.barril.noDecidido();
        //si mario llega hasta la princesa gana (true)
        if(game.physics.arcade.overlap(this.mario.gameObject, this.princesa)) this.fin(true);
        //si mario choca con algun barril pierde
        if(game.physics.arcade.overlap(this.mario.gameObject, this.barril.gameObject)) this.fin(false);
    },

    //si un barril esta justo sobre una escalera de bajada puede bajarla o no (random)
    PuedeBajar: function(barril, escaleras){
        if(barril.x >= escaleras.x + escaleras.width*2/5 && barril.x <= escaleras.x + escaleras.width*4/5){
            if(barril.y < escaleras.y + escaleras.height*3/4)this.barril.bajaOno();
            else this.barril.noAtravieses();//si esta mas abajo de la escalera no puede atravesar mas muros
        }
    },

    //si mario esta justo sobre la escalera puede subirla, si no no
    //si se encuentra en las dos terceras partes de la escalera que esta subiendo podrá atravesar el muro de encima
    PuedeSubir: function(mario, escaleras){
        if(mario.x < escaleras.x + escaleras.width*4/5 && mario.x > escaleras.x)this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        if(mario.y < escaleras.y + escaleras.height*3/4) this.mario.atraviesa();
    },

    //metodo llamado cuando ganamos (true) o perdemos (false)
    fin: function(ganar){
        //eliminamos a mario
        this.mario.morir();
        //llamamos al menu de ganar o perder
        if(ganar) game.state.start('ganar');
        else game.state.start('perder');
    }
};