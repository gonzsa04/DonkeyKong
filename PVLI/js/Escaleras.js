//clase escalera
class Escalera{
    //constructora de la escalera
    constructor(){
        this._escalera=game.add.sprite(545, 445, 'escaleras');//carga el sprite de Mario
        game.physics.arcade.enable(this._escalera);
        this._escalera.scale.setTo(3,4);
        this._velEscalera=75;//velocidad a la que se mueve mario
    }

    getY(){return this._escalera.body.y;}
    getX(){return this._escalera.body.x;}
}