//clase de los barriles
class Barril{
    //constructora de los barriles
    constructor(x, y){
        this._barril=game.add.sprite(x, y, 'barril');//carga el sprite de barril
        this._vel = 50;//velocidad del barril
        this._atraviesa=false;//le permite atravesar muros
        this._baja=-1;//variable que elige si baja o no por una escalera
        this._cambia = false;//indica si debe cambiar de velocidad
        game.physics.arcade.enable(this._barril);//habilitamos fisicas, gravedad, etc.
        this._barril.body.gravity.y=400;
        this._barril.body.setSize(this._barril.width, this._barril.height/5);//collider del barril, solo en sus pies
        this._barril.anchor.setTo(0.5, 1);//establecemos su centro
    }

    //mueve al barril
    muevete(){
        this._barril.body.velocity.x=this._vel;
    }

    //update del barril, hace que choque con el suelo
    update(plataformas){
        if(!this._atraviesa) {
            game.physics.arcade.collide(this._barril, plataformas);
            this.muevete();//lo mueve
        }
        //si ha caido de una plataforma a otra cambia de direccion
        if(this._barril.body.velocity.y >= 100)this._cambia=true;
        if(this._barril.body.onFloor() && this._cambia){
            this._atraviesa=false;
            this._cambia=false;
            this._vel=-this._vel;
        }
    }

    //decide si baja por una escalera o no
    bajaOno(){
        //si aun no se ha decidido, se elige si baja o no (cuando deje de colisionar con una escalera se volvera
        //a marcar como no decidido para futuras escaleras)
        if(this._baja == -1){
            this._baja = Math.floor(Math.random()*2);
            if(this._baja == 1){
                this._atraviesa=true;
                this._barril.body.velocity.x=0;
            }
        }
    }

    //deja de atravesar muros
    noAtravieses(){ this._atraviesa = false; }

    //marca a la variable que decide si se baja o no como no decidido
    noDecidido(){ this._baja = -1; }

    //devuelve el barril
    get barril(){ return this._barril; }
}