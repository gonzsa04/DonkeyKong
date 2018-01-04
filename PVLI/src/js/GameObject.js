//clase GameObject para las entidades del juego
class GameObject{
    //constructora de la clase
    constructor(x, y, nombre, frame){
        this._gameObject=game.add.sprite(x, y, nombre, frame);//carga el sprite
        this._vel = 125;//velocidad a la que se mueve
        this._atraviesa = false;//indica si puede atravesar muros
        this._muerto = false;//indica si el gameObject esta muerto o no
        game.physics.arcade.enable(this._gameObject);//habilitamos fisicas, gravedad, etc.
        this._gameObject.body.gravity.y=400;
        this._gameObject.body.setSize(this._gameObject.width, this._gameObject.height/5);//collider, solo en sus pies
        this._gameObject.anchor.setTo(0.5, 1);//establecemos su centro en sus pies
        this._gameObject.checkWorldBounds = true;//si se sale de los bordes de la pantalla muere
        this._gameObject.events.onOutOfBounds.add(this.morir, this);
        this._anim = this._gameObject.animations;//animaciones
    }

    //cuando muere se destruye
    morir(){ this._gameObject.kill(); }

    //devuelven la posicion del gameObject
    get x(){ return this._gameObject.x; }
    get y(){ return this._gameObject.y; }

    //devuelven el gameObject
    get gameObject(){ return this._gameObject; }
    
    //devuelve si esta vivo
    estaVivo(){ return this._gameObject.alive; }
    
    //lo spawnea en la posicion x, y
    spawn(x, y){ 
        this._atraviesa = false;
        this._gameObject.reset(x, y); 
    }
}