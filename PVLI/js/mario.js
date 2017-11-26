//clase Mario, el jugador
class Mario{
    //constructora de Mario
    constructor(){
        this._mario=game.add.sprite(100, 400, 'mario');//carga el sprite de Mario
        this._jump=true;//indica si mario puede saltar
        this._vel=100;//velocidad a la que se mueve mario
        this._alturaSalto=-200;//altura a la que salta mario
        game.physics.arcade.enable(this._mario);//habilitamos fisicas, gravedad, etc.
        this._mario.body.gravity.y=250;
        this._mario.body.colliderWorldBounds=true;
        this._mario.scale.setTo(0.25, 0.25);//lo escalamos a gusto
    }

    //mueve a mario a la izquierda a una velocidad
    mueveIzquierda(){
        this._mario.body.velocity.x=-this._vel;
    }

    //mueve a mario a la derecha a una velocidad
    mueveDerecha(){
        this._mario.body.velocity.x=this._vel;
    }

    //hace saltar a mario a una altura, si no ha saltado ya
    saltar(){
        if(this._jump){
            this._mario.body.velocity.y=this._alturaSalto;
            this._jump=false;
        }
    }

    //update del jugador, mira si mario choca con el suelo
    update(plataformas){
        //mario colisiona con las plataformas
        game.physics.arcade.collide(this._mario, plataformas);
        this._mario.body.velocity.x=0;//reiniciamos su velocidad por si se hubiera dejado de pulsar las teclas
        this._mario.body.gravity.y=250;//lo mismo con su gravedad
        if(this._mario.body.touching.down) this._jump=true;//cuando toca el suelo puede volver a saltar
    }

    //cuando mario pierde se destruye
    morir(){ this._mario.kill(); }

    //devuelven la posicion de mario
    get x(){ return this._mario.x; }
    get y(){ return this._mario.y; }

    //devuelven a mario
    get mario(){ return this._mario; }
}