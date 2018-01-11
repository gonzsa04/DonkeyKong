class platMovil{
    constructor(x, y, nombre, velocidad, iniX, iniY){
        this._gameObject=game.add.sprite(x, y, nombre);//carga el sprite
        this._posIniX = iniX;
        this._posIniY = iniY;
        this._vel = velocidad;//velocidad a la que se mueve
        game.physics.arcade.enable(this._gameObject);//habilitamos fisicas, gravedad, etc.
        this._gameObject.body.immovable = true;//lo hacemos inmovible
    }

    //-----------------------------Principales-----------------------------

    update(){
        this._gameObject.body.velocity.y = this._vel;
    }

    //------------------------------Auxiliares-----------------------------
    morir(){ this._gameObject.reset(this._posIniX, this._posIniY) }

    get x(){ return this._gameObject.x; }
    get y(){ return this._gameObject.y; }

    //devuelven el gameObject
    get gameObject(){ return this._gameObject; }
}