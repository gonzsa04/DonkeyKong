//estado play
var playScene={
    create: function(){
        this.cursors = game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)
        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //definimos la tecla espacio

        //ESCALERAS
        //metemos todas las escaleras en un mismo grupo,
        this.escaleras=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una
        this.escalerasRotas=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una

        this.escalera1=this.escaleras.create(445, 501, 'escaleras');
        this.escalera2=this.escaleras.create(140, 407, 'escaleras');
        this.escalera3=this.escaleras.create(310, 403, 'escaleras');
        this.escalera3.scale.setTo(1, 1.15);
        this.escalera4=this.escaleras.create(350, 325, 'escaleras');
        this.escalera5=this.escaleras.create(445, 331, 'escaleras');
        this.escalera6=this.escaleras.create(140, 250, 'escaleras');
        this.escalera7=this.escaleras.create(237, 245, 'escaleras');
        this.escalera8=this.escaleras.create(445, 175, 'escaleras');
        this.escalera9=this.escaleras.create(310, 80, 'escaleras');
        this.escalera9.scale.setTo(1, 1.1);
        this.escalera10=this.escalerasRotas.create(273, 505, 'escalerasRotas');
        this.escalera11=this.escalerasRotas.create(195, 340, 'escalerasRotas');
        this.escalera12=this.escalerasRotas.create(400, 260, 'escalerasRotas');
        this.escalera13=this.escalerasRotas.create(270, 180, 'escalerasRotas');
        this.escaleras.setAll('body.inmovable', true);//las hacemos inmovibles
        this.escalerasRotas.setAll('body.inmovable', true);//las hacemos inmovibles

        //MAPA
        game.add.image(0, 0, 'hud');
        //cargamos un mapa de tiled con las plataformas del nivel1
        this.map=game.add.tilemap('map');
        this.map.addTilesetImage('plataforma');
        this.layer=this.map.createLayer('Capa de Patrones 1');
        this.map.setCollisionBetween(1, 300, true, this.layer);
        this.layer.resizeWorld();

        //DECORADO
        game.add.image(30, 107, 'decoBarril');
        game.add.image(165, 40, 'decoEscaleras');
        this.oilDrum = game.add.sprite(50, 520, 'drumOil');
        this.oilDrum.animations.add('normal', [0,1], 2, true);
        this.oilDrum.animations.play('normal');

        //PRINCESA
        //princesa a la que rescatar
        this.princesa=game.add.sprite(220, 40, 'princesa');
        this.princesa.animations.add('normal', [0,1,0,1,0,1,2,2,2], 6, true);
        this.princesa.animations.add('ganar', [3,4], 1, false);
        this.princesa.animations.play('normal');
        game.physics.arcade.enable(this.princesa);

        //DK
        //villano
        this.DK=game.add.sprite(70, 103, 'DK');
        this.DK.animations.add('normal', [0,1,2], 3, true);
        this.DK.animations.add('barril', [3,4,5], 3, false);
        this.DK.animations.add('flama',[6,7], 4, false);
        this.DK.animations.play('normal');
        game.physics.arcade.enable(this.DK);

       //BARRILES
       this.numBarriles = 10;//maximo de barriles que va a haber en pantalla
       this.frecuenciaBarriles = 5;//los barriles apareceran en un random entre 0 y esta variable
       this.posBarx = 150; this.posBary = 175;//posicion inicial de los barriles
       this.barriles=[];//array de barriles, inicialmente todos inexistentes
       for(var i=0;i<this.numBarriles;i++){
           this.barriles.push(new Barril(this.posBarx, this.posBary, 'barril'));
           this.barriles[i].morir();
       }
       this.count = 0;
       this.rand = 0;
       this.GeneraBarriles(this.frecuenciaBarriles);//genera los barriles aleatoriamente
       game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo

       //FLAMAS 
       this.numFlamas = 3;//maximo de flamas que va a haber en pantalla
       this.frecuenciaFlamas = 25;//los flamas apareceran en un random entre 0 y esta variable
       this.posFlax = 80; this.posFlay = 580;//posicion inicial de los barriles
       this.flamas=[];//array de flamas, inicialmente todos inexistentes
       for(var i=0;i<this.numFlamas;i++){
           this.flamas.push(new Flama (this.posFlax, this.posFlay, 'Flama', 70, 530, 175));
           this.flamas[i].morir();
       }
       this.countF = 1;
       this.randF = 2;
       this.GeneraFlamas(this.frecuenciaFlamas);//genera los barriles aleatoriamente
       game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContadorF, this);//suma al contador 1 cada segundo

       //MARTILLOS
       this.martillos = game.add.physicsGroup();
       this.martillo1 = this.martillos.create(100, 210, 'decoMart');
       this.martillo2 = this.martillos.create(400, 450, 'decoMart');


       //MARIO
       //por ultimo el jugador, para que se pinte por encima de todo
       this.rotas = false;
       this.posInix = 150; this.posIniy = 555;//posicion inicial de mario
       this.mario=new Mario(this.posInix, this.posIniy, 'marioAnim');
    },


    //------------------------------------------BUCLE PRINCIPAL-----------------------------------------------------------
    update: function(){
        //game.debug.body(this.escalera13);//vemos en pantalla el collider de x gameobject (debug)
        this.mario.update(this.layer, this);//llamamos al update de mario
        for(var i = 0; i < this.barriles.length; i++) this.barriles[i].update(this.layer);//update de cada barril en la escena
        for(var i = 0; i < this.flamas.length; i++) this.flamas[i].update(this.layer, this, this.mario);//update de cada barril en la escena
        this.teclas();//llamamos al gestor del input
        this.colisiones();//comprobamos las colisiones
        this.renderHud();
    },

    //gestiona el input
    teclas: function(){
        //si se pulsa izquierda mario se mueve en esa direccion
        if(this.cursors.left.isDown)this.mario.mueveIzquierda();
        //lo mismo con derecha
        else if(this.cursors.right.isDown)this.mario.mueveDerecha();
        //si no se pulsa ninguna se queda parado (animacion)
        else this.mario.noCorras();
        //si se pulsa espacio mario salta
        if(this.SpaceKey.isDown)this.mario.saltar();
        //si se pulsa arriba o abajo mario sube o baja por las escaleras
        if(this.cursors.up.isDown && !this.rotas)this.mario.escaleras(-50);
        else if(this.cursors.down.isDown)this.mario.escaleras(50);
        else this.mario.noEscales();
    },
    //----------------------------------------------------------------------------------------------------------------------


    //----------------------------------------------------COLISIONES--------------------------------------------------------
    //gestiona las colisiones
    colisiones: function(){
        //si mario esta sobre una escalera, llama al metodo PuedeSubir (callback). Si no, llama a noPuedeSubir de mario
        if(!game.physics.arcade.overlap(this.mario.gameObject, this.escaleras, this.PuedeSubir, null, this)){
            if(!game.physics.arcade.overlap(this.mario.gameObject, this.escalerasRotas, this.PuedeSubirRotas, null, this)){
                this.mario.noPuedeSubir();
                this.rotas = false;
            }
        }
        //si mario llega hasta la princesa gana (true)
        if(game.physics.arcade.overlap(this.mario.gameObject, this.princesa)) this.fin(true);
        //si mario colisiona con un martillo lo coge
        game.physics.arcade.overlap(this.mario.gameObject, this.martillos, this.recogeMartillo, null, this);

        //Para cada una de las flamas
        for(var i = 0; i < this.flamas.length; i++){
            //si una flama ha colisionado con una escalera decide si subir o no
            if(!game.physics.arcade.overlap(this.flamas[i].gameObject, this.escaleras, this.PuedeEscalarF, null, this))this.flamas[i].noPuedeSubir();
            //si mario choca con alguna flama muere y pierde una vida
            if(game.physics.arcade.overlap(this.mario.gameObject, this.flamas[i].gameObject))
                this.mario.morirAnim(this);
        }

        //para cada uno de los barriles
        for(var i = 0; i < this.barriles.length; i++){
            //si un barril esta sobre una escalera se llama al metodo PuedeBajar (callback). Si no, llama a noDecidido del barril
            if(!game.physics.arcade.overlap(this.barriles[i].gameObject, this.escaleras, this.PuedeBajar, null, this)) this.barriles[i].noDecidido();
            //si mario choca con algun barril muere y pierde una vida
            if(game.physics.arcade.overlap(this.mario.gameObject, this.barriles[i].gameObject))
                this.mario.morirAnim(this);
        }
    },

    renderHud: function(){
        var posx = 15;
        var posy = 30;
        for (var i = 0; i < game.vidas; i++){
            game.add.image(posx+i*14, posy, 'decoVidas');
        }
    },
    //-----------------------------------------------------------------------------------------------------------------------

    PuedeEscalarF: function(flama, escalera){
        var i = 0;
        while(i<this.flamas.length && this.flamas[i].gameObject != flama)i++;
        this.flamas[i].escaleras(escalera);
    },

    //-------------------------------------------------AUXILIARES------------------------------------------------------------
    //si un barril esta justo sobre una escalera de bajada puede bajarla o no (random)
    PuedeBajar: function(barril, escaleras){
        if(barril.x >= escaleras.x + escaleras.width*2/5 && barril.x <= escaleras.x + escaleras.width*4/5){
            var i = 0;
            while(i<this.barriles.length && this.barriles[i].gameObject != barril)i++;
            if(barril.y < (escaleras.y-escaleras.anchor.y*escaleras.height) + escaleras.height*3/4) this.barriles[i].bajaOno();
            else this.barriles[i].noAtravieses();//si esta mas abajo de la escalera no puede atravesar mas muros
        }
    },

    //si mario esta justo sobre la escalera puede subirla, si no no
    //si se encuentra en las dos terceras partes de la escalera que esta subiendo podrá atravesar el muro de encima
    PuedeSubir: function(mario, escaleras){
        if(mario.x < escaleras.x + escaleras.width*4/5 && mario.x > escaleras.x)this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        if(mario.y < (escaleras.y-escaleras.anchor.y*escaleras.height) + escaleras.height*3/4) this.mario.atraviesa();
    },

    PuedeSubirRotas: function(mario, escaleras){
        if(mario.x < escaleras.x + escaleras.width*4/5 && mario.x > escaleras.x)this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        if(mario.y <= (escaleras.y-escaleras.anchor.y*escaleras.height) + escaleras.height*2/3) this.rotas = true;
        else this.rotas = false;
    },

    recogeMartillo: function(mario, martillos){
        martillos.kill();
    },

    //genera barriles de forma aleatoria
    GeneraBarriles: function(numRand){
        if(this.count == 0) this.rand = Math.random()*numRand + 3;//generamos un random entre 0 y numRand
        if(this.count >= this.rand){//si el contador llega al random
            this.DK.animations.play('barril');//animacion al soltar barril
            this.DK.animations.currentAnim.onComplete.add(this.DKreset, this);//cuando termine
        }
    },

     //genera barriles de forma aleatoria
     GeneraFlamas: function(numRand){
        if(this.countF == 0) this.randF = Math.random()*numRand + 10;//generamos un random entre 0 y numRand
        if(this.countF >= this.randF){//si el contador llega al random
            this.DK.animations.play('flama');//animacion al soltar barril
            this.DK.animations.currentAnim.onComplete.add(this.DKresetF, this);//cuando termine
        }
    },

    //llamado cuando termina la animacion, se encarga de soltar un barril
    DKreset: function (){
        var i = 0;
        while(i<this.barriles.length && this.barriles[i].estaVivo())i++;//se busca el primer barril inexistente
        if(i<this.barriles.length) {
            this.barriles[i].barrilSpawn(this.posBarx, this.posBary);//lo spawneamos
            this.count=0;//se reinicia el contador y se vuelve a hacer un random
            this.rand = Math.random()*this.frecuenciaBarriles;
         }
         this.DK.animations.play('normal');//reiniciamos la animacion
    },

    DKresetF: function (){
        var i = 0;
        while(i<this.flamas.length && this.flamas[i].estaVivo())i++;//se busca la primera flama inexistente
        if(i<this.flamas.length) {
            this.flamas[i].flamaSpawn(this.posFlax, this.posFlay);//lo spawneamos
            this.countF=0;//se reinicia el contador y se vuelve a hacer un random
            this.randF = Math.random()*this.frecuenciaFlamas + 3;
         }
         else {
            this.flamas[0].morir();
            this.flamas[0].flamaSpawn(this.posFlax, this.posFlay);//lo spawneamos
            this.countF=0;//se reinicia el contador y se vuelve a hacer un random
            this.randF = Math.random()*this.frecuenciaFlamas + 10;
         }
         this.DK.animations.play('normal');//reiniciamos la animacion
    },

    //suma cada segundo uno al contador, es el encargado de llamar a GeneraBarriles una vez por segundo
    actualizaContador: function(){ this.count++; this.GeneraBarriles(this.frecuenciaBarriles);},
    actualizaContadorF: function(){this.countF++; this.GeneraFlamas(this.frecuenciaFlamas);},

    //llamado desde mario cuando este pierde una vida
    ResetLevel(){
        if(game.vidas > 0){//si aun le quedan vidas spawneamos todo de nuevo
            for(var i = 0;i<this.barriles.length; i++)this.barriles[i].morir();
            this.mario.morir();
            game.state.start('howHigh');
        }
        else this.fin(false);//si no le quedan vidas pierde
    },

    //llamado cuando la princesa deja de hacer la animacion de haber sido rescatada
    ganar: function(){game.state.start('ganar');},

    //metodo llamado cuando ganamos (true) o perdemos (false)
    fin: function(ganar){
        //eliminamos a mario y a los barriles
        this.mario.morir();
        for(var i = 0;i<this.barriles.length; i++)this.barriles[i].morir();
        game.vidas = 3;//reestablecemos las vidas
        //llamamos al menu de ganar o perder
        if(ganar){
            this.princesa.animations.play('ganar');
            this.princesa.animations.currentAnim.onComplete.add(this.ganar, this);//cuando termine
        }
        else game.state.start('perder');
    }
    //-------------------------------------------------------------------------------------------------------------------------
};