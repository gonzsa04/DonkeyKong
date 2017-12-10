//clase Mario, el jugador, hereda de GameObject
class Mario extends GameObject{
    //constructora de Mario
    constructor(x, y, nombre){
        super(x, y, nombre);//llama a constructora de GamObject
        this._jump=true;//indica si mario puede saltar
        this._limiteIzq = 70;//limites del mapa
        this._limiteDrcha = 530;
        this._sube=false;//indica si mario puede subir escaleras
        this._subiendo=false;//indica si mario esta subiendo escaleras
        this._inmovil=false;//indica si mario puede moverse en el eje x
        this._alturaSalto=-150;//altura a la que salta mario
        this._velMax = 125;
        this._velMin = 75;
    }

    //mueve a mario a la izquierda a una velocidad si puede hacerlo y si no se sale del mapa
    mueveIzquierda(){
        this._gameObject.scale.setTo(-1, 1);//se de la vuelta
        if(!this._inmovil && this._gameObject.x > this._limiteIzq)this._gameObject.body.velocity.x=-this._vel;
    }

    //mueve a mario a la derecha a una velocidad si puede hacerlo y si no se sale del mapa
    mueveDerecha(){
        this._gameObject.scale.setTo(1, 1);
        if(!this._inmovil && this._gameObject.x < this._limiteDrcha)this._gameObject.body.velocity.x=this._vel;
    }

    //hace saltar a mario a una altura, si no ha saltado ya
    saltar(){
        if(this._jump){
            this._gameObject.body.velocity.y=this._alturaSalto;
            this._jump=false;
        }
    }

    //hace subir o bajar a mario por una escalera, si puede
    escaleras(velEscalera){
        if(this._sube){
            this._subiendo=true;
            this._gameObject.body.velocity.y=velEscalera;
            this._inmovil=true;//no puede moverse en el eje x
            this._jump=false;
        }
    }

    //update del jugador, mira si mario choca con el suelo
    update(plataformas){
        //game.debug.body(this._gameObject);
        //mario colisiona con las plataformas si no puede atravesarlas
        if(!this._atraviesa)game.physics.arcade.collide(this._gameObject, plataformas);
        this._atraviesa = false;//reiniciamos atraviesa
        this._gameObject.body.velocity.x=0;//reiniciamos su velocidad
        // por si se hubiera dejado de pulsar las teclas
        if(!this._subiendo)this._gameObject.body.gravity.y=400;//lo mismo con su gravedad 
        //(si no esta subiendo una escalera)
        else {
            this._gameObject.body.gravity.y=0;//si esta subiendo tanto gravedad 
            this._gameObject.body.velocity.y=0;//como velocidad en y seran de 0
        }
        if(this._gameObject.body.onFloor()){
            if(this._gameObject.body.onWall())this._vel = this._velMax;
            else this._vel = this._velMin;
            this._jump=true;//cuando toca el suelo puede volver a saltar
            this._inmovil=false;//puede moverse en el eje x otra vez
            this._subiendo=false;//ya no esta subiendo
        }
    }

    //se llama cuando estas sobre una escalera, te permite subirla
    puedeSubir(){ 
      if (this._jump)//si no has saltado
        this._sube=true;
     }

    //se llama cuando sales de una escalera, ya no puedes subirla
    noPuedeSubir(){ 
        this._sube=false;
        this._subiendo=false;
        this._inmovil=false;
     }

     //permite atravesar muros si no has saltado antes y si estas subiendo
     atraviesa(){ if(this._subiendo)this._atraviesa = true; }
}