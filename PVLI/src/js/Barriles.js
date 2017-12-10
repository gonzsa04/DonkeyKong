//clase de los barriles, hereda de GameObject
class Barril extends GameObject{
    //constructora de los barriles
    constructor(x, y, nombre){
        super(x, y, nombre);//llama a constructora de GameObject
        this._velX = 20;//velocidades a las que cae de una plataforma a otra
        this._velY = 80;
        this._baja=-1;//variable que elige si baja o no por una escalera
        this._cambia = false;//indica si debe cambiar de velocidad
    }

    //mueve al barril
    muevete(){
        this._gameObject.body.velocity.x=this._vel;
    }

    //update del barril, hace que choque con el suelo
    update(plataformas){
        if(!this._atraviesa) {
            game.physics.arcade.collide(this._gameObject, plataformas);
            this.muevete();//lo mueve
        }
        //si ha caido de una plataforma a otra
        if(this._gameObject.body.velocity.y >= this._velY){
            this._cambia=true;//puede cambiar de direccion
            this._gameObject.body.velocity.y = this._velY;//hacemos que caiga en parabola
            if (this._gameObject.body.velocity.x != 0) this._gameObject.body.velocity.x = this._velX*(this._vel/Math.abs(this._vel));
        }
        //si toca el suelo
        if(this._gameObject.body.onFloor()){
            if (this._cambia){//si puede cambiar de direccion lo hace
            this._atraviesa=false;
            this._cambia=false;
            this._vel=-this._vel;
            }
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
                this._gameObject.body.velocity.x=0;
            }
        }
    }

    //deja de atravesar muros
    noAtravieses(){ this._atraviesa = false; }

    //marca a la variable que decide si se baja o no como no decidido
    noDecidido(){ this._baja = -1; }
}