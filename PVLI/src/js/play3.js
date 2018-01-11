//estado play
var playScene3={
    create: function(){
        this.cursors = game.input.keyboard.createCursorKeys();//listener de los eventos de teclado (en cursores)
        this.SpaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //definimos la tecla espacio

        //ESCALERAS
        //metemos todas las escaleras en un mismo grupo,
        this.escaleras=game.add.physicsGroup();//asi tratamos todas a la vez y no una por una
        this.escalera1=this.escaleras.create(30, 479, 'escalerasA');
        this.escalera2=this.escaleras.create(291, 479, 'escalerasA');
        this.escalera3=this.escaleras.create(558, 479, 'escalerasA');
        this.escalera4=this.escaleras.create(60, 383, 'escalerasA');
        this.escalera5=this.escaleras.create(370, 383, 'escalerasA');
        this.escalera6=this.escaleras.create(212, 383, 'escalerasA');
        this.escalera7=this.escaleras.create(528, 383, 'escalerasA');
        this.escalera8=this.escaleras.create(95, 279, 'escalerasA');
        this.escalera8.scale.setTo(1,1.1);
        this.escalera9=this.escaleras.create(291, 279, 'escalerasA');
        this.escalera9.scale.setTo(1,1.1);
        this.escalera10=this.escaleras.create(495, 279, 'escalerasA');
        this.escalera10.scale.setTo(1,1.1);
        this.escalera11=this.escaleras.create(130, 169, 'escalerasA');
        this.escalera11.scale.setTo(1,1.11);
        this.escalera12=this.escaleras.create(370, 169, 'escalerasA');
        this.escalera12.scale.setTo(1,1.11);
        this.escalera13=this.escaleras.create(212, 169, 'escalerasA');
        this.escalera13.scale.setTo(1,1.11);
        this.escalera14=this.escaleras.create(460, 169, 'escalerasA');
        this.escalera14.scale.setTo(1,1.11);
        this.escaleras.setAll('body.inmovable', true);//las hacemos inmovibles

        //MAPA
        game.add.image(0, 0, 'hud');
        this.map=game.add.tilemap('map3');
        this.map.addTilesetImage('plataforma2');
        this.collidersF=this.map.createLayer('CollidersF');
        this.map.setCollisionBetween(1, 300, true, this.collidersF);
        this.collidersF.resizeWorld();
        //cargamos un mapa de tiled con las plataformas del nivel1
        this.plataformas=this.map.createLayer('Plataformas');
        this.map.setCollisionBetween(1, 300, true, this.plataformas);
        this.plataformas.resizeWorld();
        
        //DECORADO
        this.decoScore = game.add.physicsGroup();
        this.decoScore1 = this.decoScore.create(100, 140, 'decoScore', 1);
        this.decoScore2 = this.decoScore.create(200, 353, 'decoScore', 0);
        this.decoScore3 = this.decoScore.create(450, 353, 'decoScore', 2);

        //PLATAFORMAS QUE CAEN
        this.plats=[];
        this.plats.push(new platFall(155, 170, 'plataforma3'));
        this.plats.push(new platFall(155, 280, 'plataforma3'));
        this.plats.push(new platFall(155, 385, 'plataforma3'));
        this.plats.push(new platFall(155, 480, 'plataforma3'));
        this.plats.push(new platFall(420, 170, 'plataforma3'));
        this.plats.push(new platFall(420, 280, 'plataforma3'));
        this.plats.push(new platFall(420, 385, 'plataforma3'));
        this.plats.push(new platFall(420, 480, 'plataforma3'));
        this.todasCaidas = true;

        //TEXTO
        this.bonus = 7000;//puntuacion de bonus
        this.contB = 0;//contador de bonus
        this.textCont = 0;//contador de texto emergente cuando saltas un barril
        this.text = game.add.bitmapText(0, 0, 'gem', "", 12);//texto de puntuacion al saltar barriles
        this.scoreText = game.add.bitmapText(100, 6, 'gem', game.score.toString(), 20);//texto de puntuacion
        this.highScoreText = game.add.bitmapText(450, 25, 'gem', game.highScore.toString(), 20);//texto de maxima puntuacion
        this.bonusText = game.add.bitmapText(537, 118, 'gem', this.bonus.toString(), 16);//texto de bonus
        
        //PRINCESA
        //princesa a la que rescatar
        this.princesa=game.add.sprite(201, 60, 'princesa');
        this.princesa.animations.add('normal', [0,1,0,1,0,1,2,2,2], 6, true);
        this.princesa.animations.add('ganar', [3,4], 1, false);
        this.princesa.animations.play('normal');
        game.physics.arcade.enable(this.princesa);

        //DK
        //villano
        this.DK=game.add.sprite(251, 103, 'DK');
        this.DK.animations.add('normal', [0,1,2], 3, true);
        this.DK.animations.play('normal');
        game.physics.arcade.enable(this.DK);

       //FLAMAS 
       this.numFlamas = 5;//maximo de flamas que va a haber en pantalla
       this.frecuenciaFlamas = 10;//los flamas apareceran en un random entre 0 y esta variable
       this.posFlax = 50; this.posFlay = 380;//posicion inicial de las llamas
       this.flamas=[];//array de flamas, inicialmente todos inexistentes
       for(var i=0;i<this.numFlamas;i++){
           this.flamas.push(new Flama (this.posFlax, this.posFlay, 'Flama2', 125));
           this.flamas[i].morir();
       }
       this.countF = 1;
       this.randF = 2;
       this.GeneraObjetos(this.frecuenciaFlamas, this.countF);//genera las llamas aleatoriamente
       game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo

       //MARTILLOS
       this.martillos = game.add.physicsGroup();
       this.martillo1 = this.martillos.create(291, 225, 'decoMart');
       this.martillo2 = this.martillos.create(50, 330, 'decoMart');

       //MARIO
       //por ultimo el jugador, para que se pinte por encima de todo
       this.posInix = 30; this.posIniy = 558;//posicion inicial de mario
       this.mario=new Mario(this.posInix, this.posIniy, 'marioAnim', 20, 570);
    },


    //------------------------------------------BUCLE PRINCIPAL-----------------------------------------------------------
    update: function(){
        //game.debug.body(this.escalera11);//vemos en pantalla el collider de x gameobject (debug)
        this.todasCaidas = true;
        for(var i = 0; i < this.plats.length; i++) {
            if(this.plats[i].estaVivo()) {
                game.physics.arcade.collide(this.mario.gameObject, this.plats[i].gameObject);
                this.todasCaidas = false;
            }
        }
        if(this.todasCaidas)this.fin(true);
        this.mario.update(this.plataformas, this);//llamamos al update de mario
        for(var i = 0; i < this.flamas.length; i++) this.flamas[i].update(this.plataformas, this, this.mario, this.collidersF);//update de cada llama en la escena
        this.teclas();//llamamos al gestor del input
        this.colisiones();//comprobamos las colisiones
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
        //si mario choca con DK muere
        if(game.physics.arcade.overlap(this.mario.gameObject, this.DK)) this.mario.morirAnim(this);
        
        if(game.physics.arcade.overlap(this.mario.gameObject, this.martillos, this.recogeMartillo, null, this)) this.mario.activaMartillo();

        if(game.physics.arcade.overlap(this.mario.gameObject, this.decoScore, this.destruir)) this.hudSpawn(1000);

        for(var i = 0; i < this.plats.length; i++){
            if(game.physics.arcade.collide(this.mario.gameObject, this.plats[i].gameObject)) {
                this.plats[i].cae();
                game.score+=100;
                this.hudSpawn(100);
            }
        }

        //Para cada una de las flamas
        for(var i = 0; i < this.flamas.length; i++){
            //si una flama ha colisionado con una escalera decide si subir o no
            if(!game.physics.arcade.overlap(this.flamas[i].gameObject, this.escaleras, this.PuedeEscalarF, null, this))this.flamas[i].noPuedeSubir();
            //si mario choca con alguna flama
            if(game.physics.arcade.overlap(this.mario.gameObject, this.flamas[i].gameObject)){
                if(this.mario.llevaMartillo()) this.flamas[i].aplastado(game.score, this);//si lleva martillo la mata
                else this.mario.morirAnim(this);//si no muere y pierde una vida
            }
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

    destruir: function(mario, deco){
        deco.kill();
        game.score+=1000;
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

    //suma cada segundo uno al contador de texto si hay un texto activo
    actualizaTexto(){
        if(this.text.text != ""){
            this.textCont++;
            this.text.y-=5;//si hay un texto activo va subiendo en la y durante tres segundos
            if(this.textCont >= 3){
                this.textB = false;
                this.text.text = "";//despues desaparece
            }
        } 
    },
    //-----------------------------------------------------------------------------------------------------------------------


    //-------------------------------------------------AUXILIARES------------------------------------------------------------
    //hace al martillo con el que ha chocado mario desaparecer
    recogeMartillo: function(mario, martillo){
        martillo.kill();
    },

    GeneraObjetos: function(numRand, cont){
            if(this.countF == 0) this.randF = Math.random()*numRand + 10;//generamos un random entre 0 y numRand
            if(this.countF >= this.randF){//si el contador llega al random
                this.DKreset(this.flamas);
        }
    },

    DKreset: function (objeto){
        var i = 0;
        while(i<objeto.length && objeto[i].estaVivo())i++;//se busca el primer objeto inexistente
        if(i<objeto.length) {
            this.flamas[i].flamaSpawn(this.posFlax, this.posFlay);//lo spawneamos
            this.countF=0;//se reinicia el contador y se vuelve a hacer un random
            this.randF = Math.random()*this.frecuenciaFlamas + 3;
        }
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
        this.countF++;//contadores
        this.GeneraObjetos(this.frecuenciaFlamas, this.countF);//genera las llamas aleatoriamente
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
    ganar: function(){game.state.start('ganar');},

    //metodo llamado cuando ganamos (true) o perdemos (false)
    fin: function(ganar){
        //eliminamos a mario y a los barriles
        game.score += this.bonus;
        this.bonus = 0;
        this.mario.morir();
        for(var i = 0;i<this.flamas.length; i++)this.flamas[i].morir();
        //llamamos al menu de ganar o perder
        if(ganar){
            this.princesa.animations.play('ganar');
            this.princesa.animations.currentAnim.onComplete.add(this.ganar, this);//cuando termine
        }
        else game.state.start('perder');
    }
    //-------------------------------------------------------------------------------------------------------------------------
};