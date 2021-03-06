//clase Mario, el jugador, hereda de GameObject
class Mario extends GameObject{

    //--------------------------------------CONSTRUCTORA-------------------------------------
    //constructora de Mario
    constructor(x, y, nombre, limitIzq, limitDrch){
        super(x, y, nombre);//llama a constructora de GamObject
        this._jump=true;//indica si mario puede saltar
        this._limiteIzq = limitIzq;//limites del mapa
        this._limiteDrcha = limitDrch;
        this._yProv = 600;//variable donde guardamos la altura provisional
        this._alturaCaida = 50;//altura maxima desde la que caer   
        this._volando = false;//indica si esta en el aire o no
        this._sube=false;//indica si mario puede subir escaleras
        this._subiendo=false;//indica si mario esta subiendo escaleras
        this._inmovil=false;//indica si mario puede moverse en el eje x
        this._alturaSalto=-150;//altura a la que salta mario
        this._saltado = false;//indica si ha saltado un barril
        this._velMax = 125;//velocidad a la que sube las rampas
        this._velMin = 75;//velocidad normal a la que camina
        this._corriendo = false;//indica si mario esta corriendo (para las animaciones)
        this._parado = true;//indica si mario esta parado
        this._martillo = false;//indica si mario ha cogido un martillo
        this._maxTimeMartillo = 18;//tiempo maximo que puedes permanecer con el martillo
        this._musicaAndar = false;
        //redimensionamos su collider
        this._gameObject.body.setSize(this._gameObject.width*2/9, this._gameObject.height/6);

        ///AUDIO
        this.musicaSaltar = game.add.audio('musicaSalto');
        this.musicaAndar = game.add.audio('musicaAndar', 1, true);
        this.musicaMuerte = game.add.audio('musicaMuerte');
        this.musicaMartillo = game.add.audio('musicaMartillo', 4);

        //ANIMACIONES
        //todas se guardaran en anim
        this._anim.add('stop', [0], null);//parado
        this._anim.add('walk', [1,0,2], 20, true);//andando
        this._anim.add('saltar', [5], null);//salto
        this._anim.add('escalera', [3,4], 8, true);//en una escalera
        this._anim.add('escaleraStop', [3], null);//parado en una escalera
        this._anim.add('morir', [10, 10, 10, 10,11,12,13,14, 14, 14, 14, 14, 14, 14, 14, 14, 14], 4, null);//muerto
        this._anim.add('stopMart', [15, 16], 10, true);//parado con el martillo
        this._anim.add('walkMart', [17, 18, 19, 20], 10, true);//andando con el martillo
        this._anim.play('stop');
    }
    //--------------------------------------------------------------------------------------


    //----------------------------------MOVIMIENTO------------------------------------------

    //mueve a mario a la izquierda a una velocidad si puede hacerlo y si no se sale del mapa
    mueveIzquierda(){
        if(!this._inmovil && this._gameObject.x > this._limiteIzq && !this._muerto && this._jump){
            this._gameObject.scale.setTo(-1, 1);//se de la vuelta
            this._parado = false;
            if(!this._corriendo){
                this._corriendo=true;//si esta corriendo y no saltando
                if(!this._martillo) this._anim.play('walk');
                else this._anim.play("walkMart");
            }
            this._gameObject.body.velocity.x=-this._vel;
        }
    }

    //mueve a mario a la derecha a una velocidad si puede hacerlo y si no se sale del mapa
    mueveDerecha(){
        if(!this._inmovil && this._gameObject.x < this._limiteDrcha && !this._muerto && this._jump){
            this._gameObject.scale.setTo(1, 1);
            this._parado = false;
            if(!this._corriendo){
                this._corriendo=true;
                if(!this._martillo) this._anim.play('walk');
                else this._anim.play("walkMart");
            }
            this._gameObject.body.velocity.x=this._vel;
        }
    }

    //hace saltar a mario a una altura, si no ha saltado ya
    saltar(){
        if(this._jump && !this._muerto && !this._martillo){
            this._jump=false;
            this.musicaAndar.stop();
            this._musicaAndar = false;
            this.musicaSaltar.play();
            this._anim.play("saltar");//anim de saltar
            this._gameObject.body.velocity.y=this._alturaSalto;
        }
    }

    //hace subir o bajar a mario por una escalera, si puede
    escaleras(velEscalera){
        if(this._sube && !this._muerto){
            this._subiendo=true;
            this._yProv = this.y;
            this._gameObject.body.velocity.y=velEscalera;
            this._inmovil=true;//no puede moverse en el eje x
            this._jump=false;//no puede saltar
            this._anim.play("escalera");
        }
    }
    //-----------------------------------------------------------------------------


    //--------------------------------UPDATE---------------------------------------

    //update del jugador, mira si mario choca con el suelo
    update(plataformas, self){
        this.musica();//musica de caminar, saltar, etc.
        //mario colisiona con las plataformas si no puede atravesarlas
        if(!this._atraviesa)game.physics.arcade.collide(this._gameObject, plataformas);
        this._atraviesa = false;//reiniciamos atraviesa
        this._gameObject.body.velocity.x=0;//reiniciamos su velocidad
        // por si se hubiera dejado de pulsar las teclas
        if(!this._subiendo)this._gameObject.body.gravity.y=400;//lo mismo con su gravedad 
        //(si no esta subiendo una escalera)
        else {
            this._corriendo = false;
            this._gameObject.body.gravity.y=0;//si esta subiendo tanto gravedad
            this._gameObject.body.velocity.y=0;//como velocidad se reinician
        }
        //si ha saltado y se estaba moviendo en una direccion, salta en esa direccion
        if(this._corriendo && !this._jump && !this._subiendo &&
            this._gameObject.x < this._limiteDrcha && this._gameObject.x > this._limiteIzq) {
            if(this._gameObject.scale.x == 1) this._gameObject.body.velocity.x=this._velMin;
            else this._gameObject.body.velocity.x=-this._velMin;
        }
        this.tocaSuelo(self);//mira si choca con el suelo y realiza la accion correspondiente
        if(this._contador == this._maxTimeMartillo) this.desactivaMartillo();
    }
    //----------------------------------------------------------------------

    
    //-----------------------------AUXILIARES-------------------------------

    //se llama cuando estas sobre una escalera, te permite subirla
    puedeSubir(){ 
        if (this._jump && !this._martillo){//si no has saltado y no llevas un martillo
        this._sube=true;    
        this._corriendo = false;
        }
     }

    //se llama cuando sales de una escalera, ya no puedes subirla
    noPuedeSubir(){ 
        this._sube=false;
        this._subiendo=false;
        this._inmovil=false;
     }

    //mira si ha chocado con el suelo y hace la accion correspondiente
    tocaSuelo(self){
        //si toca el suelo
        if(this._gameObject.body.onFloor() || this._gameObject.body.touching.down){
            this._saltado = false;
            //si es una pared (rampas) aumentamos la velocidad para que pueda subirlas
            if(this._alturaCaida < this.y - this._yProv)this.morirAnim(self);
            if (!this._muerto)this._yProv = this.y;
            else this._yProv = 600;
            if(this._gameObject.body.onWall())this._vel = this._velMax;
            else this._vel = this._velMin;//si no, vuelve a su velocidad normal
            this._jump=true;//cuando toca el suelo puede volver a saltar
            this._inmovil=false;//puede moverse en el eje x otra vez
            this._subiendo=false;//ya no esta subiendo
            this.volando = false;
            if(!this._muerto) {
                if(!this._parado){
                    if(!this._martillo) this._anim.play("walk");
                    else this._anim.play("walkMart");
                }
                else{
                    if(!this._martillo) this._anim.play("stop");
                    else this._anim.play("stopMart");
                }
            }
        }
        //si esta en el aire
        else if(!this._volando){
            this._yProv = this._gameObject.y;
            this._volando = true;
        }
    }

    //permite atravesar muros si no has saltado antes y si estas subiendo
    atraviesa(){ if(this._subiendo)this._atraviesa = true; }

     //llamado cuando se sueltan las teclas, anim de parado
    noCorras(){ 
        if(this._jump && !this._subiendo && !this._muerto){
            this._corriendo=false;
            if(!this._parado){
                this._parado = true;
                if(!this._martillo) this._anim.play("stop");
                else this._anim.play("stopMart");
            }
        }
    }

    //llamado cuando dejas de subir por una escalera
    noEscales(){ 
        if(this._sube && this._subiendo && !this._muerto){
            this.musicaAndar.stop();
            this._musicaAndar = false;
            this._anim.play("escaleraStop");
        }
    }

    //cuando mario ha cogido un martillo
    activaMartillo(){ 
        this._martillo = true;
        this.musicaAndar.stop();
        this.musicaMartillo.play();
        game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo
    }

    //cuando el efecto del martillo ha desaparecido
    desactivaMartillo(){ 
        this._contador = 0;
        this._martillo = false;
        this.musicaMartillo.stop();
    }

    //indica si mario tiene el martillo o no
    llevaMartillo(){ return this._martillo; }

    //gestiona la aparicion de los efectos de sonido
    musica(){
        if((this._corriendo && this._jump && !this._muerto || this._subiendo) && !this._musicaAndar){
            this._musicaAndar = true; 
            if(!this._martillo) this.musicaAndar.play();
        }
        else if((!this._corriendo && !this._subiendo) && this._musicaAndar){
            this._musicaAndar = false;
            if(!this._martillo) this.musicaAndar.stop();
        }
    }

    actualizaContador(){ if(this._martillo) this._contador++; }

    noMuerto(){ this._muerto = false; }//"revive" a mario

    //llamado cuando te golpea un barril
    morirAnim(self){
        if(!this._muerto){
            game.vidas--;
            game.score = 0;
            this.musicaAndar.stop();//paramos todos los efectos y suena la musica de morir
            this.musicaMartillo.stop();
            this.musicaSaltar.stop();
            this.musicaMuerte.play();
            this._anim.play('morir');//mueres
            this._muerto = true;
            this._anim.currentAnim.onComplete.add(self.ResetLevel, self);//se llama a reset level de play.js
        }
    }

    //indica que mario ha saltado un barril
    haSaltado(){ this._saltado = true; }
    //devuelve si mario ha saltado un barril
    get saltado(){ return this._saltado; }
    //devuelve si mario ha muerto
    get muerto(){ return this._muerto; }
    //-----------------------------------------------------------------------
}