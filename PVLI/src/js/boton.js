//clase boton (para el menu)
class Button{
    constructor(x, y, nombre){
        this._gameObject = game.add.sprite(x, y, nombre);//crea un sprite y lo posiciona
        this._gameObject.x = game.width/2 - this._gameObject.width/2;
        this._anim = this._gameObject.animations;//le añade estados de seleccionado y no seleccionado
        this._anim.add('noSelec', [0], null);
        this._anim.add('selec', [1], null);
        this._activado;
    }

    //metodos que permiten seleccionar o deseleccionar el boton
    seleccionado(){ 
        this._anim.play('selec');
        this._activado = true;
     }
    noSeleccionado(){ 
        this._anim.play('noSelec');
        this._activado = false;
     }
     //dice si un boton esta activo o no
    activado(){ return this._activado; }
}