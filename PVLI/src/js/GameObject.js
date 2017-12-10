//clase GameObject para las entidades del juego
class GameObject{
    //constructora de la clase
    constructor(x, y, nombre, frame){
        this._gameObject=game.add.sprite(x, y, nombre, frame);//carga el sprite
        this._vel = 125;//velocidad a la que se mueve
        this._atraviesa = false;//indica si puede atravesar muros
        game.physics.arcade.enable(this._gameObject);//habilitamos fisicas, gravedad, etc.
        this._gameObject.body.gravity.y=400;
        this._gameObject.body.setSize(this._gameObject.width, this._gameObject.height/5);//collider, solo en sus pies
        this._gameObject.anchor.setTo(0.5, 1);//establecemos su centro en sus pies
    }

    //cuando muere se destruye
    morir(){ this._gameObject.kill(); }

    //devuelven la posicion del gameObject
    get x(){ return this._gameObject.x; }
    get y(){ return this._gameObject.y; }

    //devuelven el gameObject
    get gameObject(){ return this._gameObject; }
}