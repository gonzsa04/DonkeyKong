//estado play
var playScene2={
    create: function(){
        this.cursors = game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)
        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //definimos la tecla espacio

        this.map=game.add.tilemap('map2');
        this.map.addTilesetImage('plataforma');
        this.collidersF=this.map.createLayer('CollidersF');
        this.map.setCollisionBetween(1, 300, true, this.collidersF);
        this.collidersF.resizeWorld();
        this.deadZone=this.map.createLayer('DeadZone');
        this.map.setCollisionBetween(1, 300, true, this.deadZone);
        this.deadZone.resizeWorld();

        //ESCALERAS
        //metemos todas las escaleras en un mismo grupo,
        this.escaleras=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una
        this.escalera1=this.escaleras.create(30, 420, 'escalerasG');
        this.escalera2=this.escaleras.create(70, 279, 'escalerasG');
        this.escalera2.scale.setTo(1, 1.1);
        this.escalera3=this.escaleras.create(283, 278, 'escalerasGG');
        this.escalera4=this.escaleras.create(225, 278, 'escalerasGG');
        this.escalera5=this.escaleras.create(560, 395, 'escaleras');
        this.escalera5.scale.setTo(1,1.1);
        this.escalera6=this.escaleras.create(515, 303, 'escaleras');
        this.escalera7=this.escaleras.create(400, 259, 'escaleras');
        this.escalera7.scale.setTo(1,1.15);
        this.escalera8=this.escaleras.create(578, 223, 'escaleras');
        this.escalera9=this.escaleras.create(450, 168, 'escaleras');
        this.escalera10=this.escaleras.create(380, 82, 'escaleras');
        this.escalera10.scale.setTo(1,1.1);
        this.escaleras.setAll('body.inmovable', true);//las hacemos inmovibles

        //MAPA
        game.add.image(0, 0, 'hud');
        //cargamos un mapa de tiled con las plataformas del nivel1
        this.plataformas=this.map.createLayer('Plataformas');
        this.map.setCollisionBetween(1, 300, true, this.plataformas);
        this.plataformas.resizeWorld();

        //DECORADO
        game.add.image(195, 40, 'decoEscaleras');
        game.add.image(136, 171, 'decoMovil');
        game.add.image(316, 171, 'decoMovil');

        //PLATAFORMAS MOVILES
        /*this.numPlats = 3;//maximo de flamas que va a haber en pantalla
        this.frecuenciaPlats = 40;//los flamas apareceran en un random entre 0 y esta variable
        this.posPlax = 140; this.posPlay = 550;//posicion inicial de las llamas
        this.platsArriba=[];//array de flamas, inicialmente todos inexistentes
        for(var i=0;i<this.numPlats;i++){
            this.platsArriba.push(game.add.sprite(140, 550, 'plataforma'));
            this.platsArriba[i].kill();
        }
        this.countF = 1;
        this.randF = 2;
        this.GeneraObjetos(this.frecuenciaFlamas, this.countF);//genera las llamas aleatoriamente
        game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo*/
        this.platMov = game.add.sprite(140, 550, 'plataforma');
        game.physics.arcade.enable(this.platMov);
        this.platMov.body.immovable = true;

        //TEXTO
        this.bonus = 6000;//puntuacion de bonus
        this.contB = 0;//contador de bonus
        this.scoreText = game.add.bitmapText(100, 6, 'gem', game.score.toString(), 20);//texto de puntuacion
        this.highScoreText = game.add.bitmapText(450, 25, 'gem', game.highScore.toString(), 20);//texto de maxima puntuacion
        this.bonusText = game.add.bitmapText(537, 118, 'gem', this.bonus.toString(), 16);//texto de bonus
        
        //PRINCESA
        //princesa a la que rescatar
        this.princesa=game.add.sprite(245, 39, 'princesa');
        this.princesa.animations.add('normal', [0,1,0,1,0,1,2,2,2], 6, true);
        this.princesa.animations.add('ganar', [3,4], 1, false);
        this.princesa.animations.play('normal');
        game.physics.arcade.enable(this.princesa);

        //DK
        //villano
        this.DK=game.add.sprite(113, 103, 'DK');
        this.DK.animations.add('normal', [0,1,2], 3, true);
        this.DK.animations.play('normal');
        game.physics.arcade.enable(this.DK);

       //FLAMAS 
       this.flamas=[];//array de flamas, inicialmente todos inexistentes
       this.flama1 = new Flama (220, 475, 'Flama', 125);
       this.flama2 = new Flama (550, 300, 'Flama', 125)
       this.flamas.push(this.flama1);
       this.flamas.push(this.flama2);

       //MARIO
       //por ultimo el jugador, para que se pinte por encima de todo
       this.posInix = 30; this.posIniy = 520;//posicion inicial de mario
       this.mario=new Mario(this.posInix, this.posIniy, 'marioAnim', 20, 600);
    },


    //------------------------------------------BUCLE PRINCIPAL-----------------------------------------------------------
    update: function(){
        //game.debug.body(this.escalera3);//vemos en pantalla el collider de x gameobject (debug)
        this.plataformasMoviles();
        this.mario.update(this.plataformas, this);//llamamos al update de mario
        for(var i = 0; i < this.flamas.length; i++)
            this.flamas[i].update(this.plataformas, this, this.mario, this.collidersF);//update de cada llama en la escena
        this.colisiones();//comprobamos las colisiones
        this.teclas();//llamamos al gestor del input
        this.renderHud();//pintamos el hud
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
        if(!game.physics.arcade.overlap(this.mario.gameObject, this.escaleras, this.PuedeSubir, null, this)) this.mario.noPuedeSubir();
        //si mario llega hasta la princesa gana (true)
        if(game.physics.arcade.overlap(this.mario.gameObject, this.princesa)) this.fin(true);
        //si mario choca con DK muere
        if(game.physics.arcade.overlap(this.mario.gameObject, this.DK) || game.physics.arcade.overlap(this.mario.gameObject, this.deadZone)) 
        this.mario.morirAnim(this);
        //Para cada una de las flamas
        for(var i = 0; i < this.flamas.length; i++){
            //si una flama ha colisionado con una escalera decide si subir o no
            if(!game.physics.arcade.overlap(this.flamas[i].gameObject, this.escaleras, this.PuedeEscalarF, null, this))this.flamas[i].noPuedeSubir();
            //si mario choca con alguna flama
            if(game.physics.arcade.overlap(this.mario.gameObject, this.flamas[i].gameObject)) this.mario.morirAnim(this);//muere y pierde una vida
        }
    },
    //-----------------------------------------------------------------------------------------------------------------------


    //---------------------------------------------------HUD-----------------------------------------------------------------
    //dibuja el hud del juego
    renderHud: function(){
        var posx = 15;
        var posy = 30;//pintamos las vidas que le quedan a mario
        for (var i = 0; i < game.vidas; i++) game.add.image(posx+i*14, posy, 'decoVidas');
        this.scoreText.text = game.score.toString();//escribimos la puntuacion
        //si la puntuacion es mayor que la puntuacion maxima, actualizamos la maxima
        if(game.score > game.highScore){
            game.highScore = game.score;
            this.highScoreText.text = game.highScore.toString();
        } 
    },

    //suma cada segundo uno al contador de bonus, y actualiza este si fuera necesario
    actualizaBonus: function(){
        this.contB++;//si han pasado 4 segundos y bonus sigue siendo mayor que 0
        if(this.contB >= 4 && this.bonus > 0){
            this.contB = 0;//se reinicia el contador de bonus
            this.bonus-=100;//se resta 100 al bonus y se escribe
            this.bonusText.text = this.bonus.toString();
        }
    },

    //escribe en la posicion de mario una puntuacion dada (llamado cuando salta barriles)
    hudSpawn(score){
        this.textCont = 0;//reiniciamos contador
        this.text.x = this.mario.x;
        this.text.y = this.mario.y;
        this.text.text = score.toString();
    },
    //-----------------------------------------------------------------------------------------------------------------------


    //-------------------------------------------------AUXILIARES------------------------------------------------------------

    plataformasMoviles: function(){
        this.platMov.body.velocity.y = -50;
        game.physics.arcade.collide(this.mario.gameObject, this.platMov);
    },

    PuedeEscalarF: function(flama, escalera){
        var i = 0;
        while(i<this.flamas.length && this.flamas[i].gameObject != flama)i++;
        this.flamas[i].escaleras(escalera);
    },

    //si mario esta justo sobre la escalera puede subirla, si no no
    //si se encuentra en las dos terceras partes de la escalera que esta subiendo podrá atravesar el muro de encima
    PuedeSubir: function(mario, escaleras){
        if(mario.x < escaleras.x + escaleras.width*4/5 && mario.x > escaleras.x)this.mario.puedeSubir();
        else this.mario.noPuedeSubir();
        if(mario.y < (escaleras.y-escaleras.anchor.y*escaleras.height) + escaleras.height*3/4) this.mario.atraviesa();
    },

    //suma cada segundo uno al contador
    actualizaContador: function(){ 
        this.actualizaTexto();//actualizamos los textos que salen al saltar sobre un barril
        this.actualizaBonus();//actualizamos el bonus
    },

    //llamado desde mario cuando este pierde una vida
    ResetLevel(){
        if(game.vidas > 0){//si aun le quedan vidas spawneamos todo de nuevo
            this.mario.morir();
            game.state.start('howHigh');
        }
        else this.fin(false);//si no le quedan vidas pierde
    },

    //llamado cuando la princesa deja de hacer la animacion de haber sido rescatada
    ganar: function(){game.state.start('howHigh');},

    //metodo llamado cuando ganamos (true) o perdemos (false)
    fin: function(ganar){
        //eliminamos a mario y a los barriles
        game.score += this.bonus;
        this.bonus = 0;
        this.mario.morir();
        for(var i = 0;i<this.flamas.length; i++)this.flamas[i].morir();
        //llamamos al menu de ganar o perder
        if(ganar){
            game.nivel++;
            this.princesa.animations.play('ganar');
            this.princesa.animations.currentAnim.onComplete.add(this.ganar, this);//cuando termine
        }
        else game.state.start('perder');
    }
    //-------------------------------------------------------------------------------------------------------------------------
};