//plataformas que se caen en el nivel 3
class platFall{
    constructor(x, y, nombre){
        this._gameObject=game.add.sprite(x, y, nombre);//carga el sprite
        game.physics.arcade.enable(this._gameObject);//habilitamos fisicas, gravedad, etc.
        this._gameObject.body.gravity.y = 0;
        this._velCaida = 150;
        this._gameObject.events.onOutOfBounds.add(this.morir, this);
    }

    //------------------------------Auxiliares-----------------------------
    morir(){ this._gameObject.kill(); }

    //devuelve si esta vivo
    estaVivo(){ return this._gameObject.alive; }

    //la hace caer
    cae(){ this._gameObject.body.gravity.y = this._velCaida; }

    gameObject(){ return this._gameObject; }
}