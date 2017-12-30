//clase Flama, un enemigo, hereda de GameObject
class Flama extends GameObject{
    
        //--------------------------------------CONSTRUCTORA-------------------------------------
        //constructora de la Flama
        constructor(x, y, nombre){
            super(x, y, nombre);//llama a constructora de GamObject
            this._limiteIzq = 70;//limites del mapa
            this._limiteDrcha = 530; 
            this._sube=false;//indica si la Flama puede subir escaleras
            this._subiendo=false;//indica si la Flama esta subiendo escaleras
            this._inmovil=false;//indica si la Flama puede moverse en el eje x
            this._velMax = 125;//velocidad a la que sube las rampas
            this._velMin = 50;//velocidad normal a la que camina
            this._muerto=false;//indica si la Flama ha muerto
            this._gameObject.body.setSize(this._gameObject.width*3/4, this._gameObject.height/2);
            //redimensionamos su collider
    
            //ANIMACIONES
            //todas se guardaran en anim
            this._anim.add('normal', [0,1], 6, true);//parado
            this._anim.play('normal');
        }
        //--------------------------------------------------------------------------------------
    
    
        //----------------------------------MOVIMIENTO------------------------------------------
    
        //mueve a la Flamaa una velocidad si puede hacerlo y si no se sale del mapa
        mueveIzquierda(){
           
            if(!this._inmovil && this._gameObject.x > this._limiteIzq && !this._muerto){
                this._gameObject.scale.setTo(-1, 1);//se de la vuelta
                this._gameObject.body.velocity.x=-this._vel;
            }
        }

        mueveDerecha(){
            if(!this._inmovil && this._gameObject.x < this._limiteDrcha && !this._muerto){
                this._gameObject.scale.setTo(1, 1);
                this._gameObject.body.velocity.x=this._vel;
            }
        }
    
        //hace subir o bajar a la Flama por una escalera, si puede
        escaleras(velEscalera){
            if(this._sube && !this._muerto){
                this._subiendo=true;
                this._gameObject.body.velocity.y=velEscalera;
                this._inmovil=true;//no puede moverse en el eje x
            }
        }
        //-----------------------------------------------------------------------------
    
    
        //--------------------------------UPDATE---------------------------------------
    
        //update del jugador, mira si la Flama choca con el suelo
        update(plataformas, self){
            //la Flama colisiona con las plataformas si no puede atravesarlas
            if(!this._atraviesa)game.physics.arcade.collide(this._gameObject, plataformas);
            this._atraviesa = false;//reiniciamos atraviesa
            this._gameObject.body.velocity.x=0;//reiniciamos su velocidad
            this.mueveDerecha();
            // por si se hubiera dejado de pulsar las teclas
            if(!this._subiendo)this._gameObject.body.gravity.y=400;//lo mismo con su gravedad 
            //(si no esta subiendo una escalera)
            else {
                this._corriendo = false;
                this._gameObject.body.gravity.y=0;//si esta subiendo tanto gravedad
                this._gameObject.body.velocity.y=0;//como velocidad se reinician
            }
            //si toca el suelo
            if(this._gameObject.body.onFloor()){
                if(this._gameObject.body.onWall())this._vel = this._velMax;
                else this._vel = this._velMin;//si no, vuelve a su velocidad normal
                this._inmovil=false;//puede moverse en el eje x otra vez
                this._subiendo=false;//ya no esta subiendo
            }
        }
        //----------------------------------------------------------------------
    
        
        //-----------------------------AUXILIARES-------------------------------
    
        //se llama cuando estas sobre una escalera, te permite subirla
        puedeSubir(){
            this._sube=true;    
         }
    
        //se llama cuando sales de una escalera, ya no puedes subirla
        noPuedeSubir(){ 
            this._sube=false;
            this._subiendo=false;
            this._inmovil=false;
         }
    
         //permite atravesar muros si no has saltado antes y si estas subiendo
         atraviesa(){ if(this._subiendo)this._atraviesa = true; }
    
        //llamado cuando te golpea un barril
        morirAnim(self){
            if(!this._muerto){
            this._anim.play('morir');//mueres
            this._muerto = true;
            this._vidas--;//se restan vidas
            this._anim.currentAnim.onComplete.add(self.ResetLevel, self);//se llama a reset level de play.js
            }
        }
        //-----------------------------------------------------------------------
    }