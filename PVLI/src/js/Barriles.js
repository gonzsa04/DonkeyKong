//clase de los barriles, hereda de GameObject
class Barril extends GameObject{

    //-----------------------------------CONSTRUCTORA---------------------------------------------
    //constructora de los barriles
    constructor(x, y, nombre){
        super(x, y, nombre);//llama a constructora de GameObject
        this._velX = 20;//velocidades a las que cae de una plataforma a otra
        this._velY = 80;
        this._baja=-1;//variable que elige si baja o no por una escalera
        this._cambia = false;//indica si debe cambiar de velocidad
        this._rotaAnim = false;
        this._escaleraAnim = false;
        //redimensionamos su collider
        this._gameObject.body.setSize(this._gameObject.width*4/5, this._gameObject.height*3/5);

        //ANIMACIONES
        //todas se guardaran en anim
        this._anim.add('rotate', [0,1,2,3], 8, true);//rotar
        this._anim.add('escalera', [4,5], 6, true);//bajar escaleras
        this._anim.add('aplastado', [6, 7, 8], 8, false);//aplastado por el martillo
        this._anim.play('rotate');
    }
    //--------------------------------------------------------------------------------------------


    //--------------------------------------MOVIMIENTO--------------------------------------------
    //mueve al barril
    muevete(){
        this._gameObject.body.velocity.x=this._vel;
        if(this._vel < 0) this._gameObject.scale.setTo(-1, 1);
        else this._gameObject.scale.setTo(1, 1);
    }
    //--------------------------------------------------------------------------------------------


    //--------------------------------------UPDATE------------------------------------------------
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
                this._escaleraAnim = false;
                if(!this._rotaAnim){ //Si puede rotar y no esta en una escalera
                    this._anim.play("rotate");//se pone la animacion de rotar
                    this._rotaAnim = true;
                }
            }
        }
    }
    //---------------------------------------------------------------------------------------------


    //------------------------------------------AUXILIARES-----------------------------------------
    //decide si baja por una escalera o no
    bajaOno(){
        //si aun no se ha decidido, se elige si baja o no (cuando deje de colisionar con una escalera se volvera
        //a marcar como no decidido para futuras escaleras)
        if(this._baja == -1){
            this._baja = Math.floor(Math.random()*2);
            if(this._baja == 1){
                this._atraviesa=true;
                this._gameObject.body.velocity.x=0;
                if(!this._escaleraAnim){//si puede bajar y esta en una escalera
                    this._anim.play("escalera");//se pone la animacion de escalera
                    this._escaleraAnim = true;
                    this._rotaAnim = false;
                }
            }
        }
    }

    //al spawnearlo reinciamos todos sus atributos para evitar bugs
    barrilSpawn(posX,posY){
        this.spawn(posX,posY);
        this._vel = Math.abs(this._vel)
        this._gameObject.body.velocity.x = this._vel;
        this._atraviesa = false;
        this._baja=-1;
        this._cambia = false;
        this._rotaAnim = false;
        this._escaleraAnim = false;
    }

    //deja de atravesar muros
    noAtravieses(){ this._atraviesa = false; }

    //marca a la variable que decide si se baja o no como no decidido
    noDecidido(){ this._baja = -1; }

    //llamado al ser aplastado por un martillo
    aplastado(){
        if(!this._muerto){
            this.muerto = true;
            this._vel = 0;
            this._anim.play('aplastado');
            this._anim.currentAnim.onComplete.add(this.morir, this);
        }
    }
    //----------------------------------------------------------------------------------------------
}