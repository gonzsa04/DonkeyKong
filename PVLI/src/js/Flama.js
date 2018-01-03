//clase Flama, un enemigo, hereda de GameObject
class Flama extends GameObject{
    
        //--------------------------------------CONSTRUCTORA-------------------------------------
        //constructora de la Flama
        constructor(x, y, nombre, limitizq, limitdrch, Rango){
            super(x, y, nombre);//llama a constructora de GamObject
            this._limiteIzq = limitizq;//limites del mapa
            this._limiteDrcha = limitdrch; 
            this._persigue = -1;
            this._rango = Rango;
            this._yObjetivo;
            this._contador = 0;
            this._elije = 3;
            this._sube=true;//indica si la Flama puede subir escaleras
            this._subiendo=false;//indica si la Flama esta subiendo escaleras
            this._velMax = 125;//velocidad a la que sube las rampas
            this._velMin = 50;//velocidad normal a la que camina
            this._muerto=false;//indica si la Flama ha muerto
            this._gameObject.body.setSize(this._gameObject.width*3/4, this._gameObject.height/2);
            //redimensionamos su collider
    
            //ANIMACIONES
            //todas se guardaran en anim
            this._anim.add('normal', [0,1], 6, true);//parado
            this._anim.play('normal');
            game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo
        }
        //--------------------------------------------------------------------------------------
    
    
        //----------------------------------MOVIMIENTO------------------------------------------
    
        //mueve a la Flamaa una velocidad si puede hacerlo y si no se sale del mapa
        mueveIzquierda(){
           
            if(!this._inmovil && this._gameObject.x > this._limiteIzq && !this._muerto){
                this._gameObject.body.velocity.x=-this._vel;
                this._gameObject.scale.setTo(1, 1);
            }
        }

        mueveDerecha(){
            if(!this._inmovil && this._gameObject.x < this._limiteDrcha && !this._muerto){
                this._gameObject.body.velocity.x=this._vel;
                this._gameObject.scale.setTo(-1, 1);
            }
        }

        FueraDeRango(mario){
            if(this._contador == this._elije){
                this._contador = 0;
                this._persigue = Math.floor(Math.random()*3);
                if(this._persigue >= 1){
                    if(mario.x > this._gameObject.x)this.mueveDerecha();
                    else this.mueveIzquierda();
                }
                else{
                    if(mario.x > this._gameObject.x)this.mueveIzquierda();
                    else this.mueveDerecha();
                }
            }
            else if(this._gameObject.x + 5 > this._limiteDrcha || this._gameObject.x - 5 < this._limiteIzq) this._gameObject.body.velocity.x = 0;
        }

        DentroDeRango(mario){
            this._contador = 0;
            if(mario.x > this._gameObject.x)this.mueveDerecha();
            else this.mueveIzquierda();
        }
    
        //hace subir o bajar a la Flama por una escalera, si puede
        escaleras(escalera){
            if(!this._muerto && !this._sube && this._gameObject.x < escalera.x + escalera.width*3/5 && this._gameObject.x > escalera.x + escalera.width*2/5){
                this._persigue = Math.floor(Math.random()*2);
                if (this._persigue >= 1){
                    this._sube = true;
                    this._atraviesa = true;
                    if(!this._subiendo){
                        this._subiendo = true;
                        if(this._gameObject.y < escalera.y + escalera.height/2){
                            this._gameObject.body.velocity.y = this._velMin;
                            this._yObjetivo = this._gameObject.y + escalera.height*5/6*escalera.scale.y;
                        }
                        else{
                            this._gameObject.body.velocity.y = -this._velMin;
                            this._yObjetivo = this._gameObject.y - escalera.height*4.7/6*escalera.scale.y;
                        } 
                    }
                }
                else{
                    this._sube = true; 
                }
            }
        }

        
        //-----------------------------------------------------------------------------
    
    
        //--------------------------------UPDATE---------------------------------------
    
        //update del jugador, mira si la Flama choca con el suelo
        update(plataformas, self, mario){
            //la Flama colisiona con las plataformas si no puede atravesarlas
            if(!this._atraviesa)game.physics.arcade.collide(this._gameObject, plataformas);
            if(!this._subiendo){
            if(game.physics.arcade.distanceToXY(this._gameObject, mario.x, mario.y) <= this._rango)this.DentroDeRango(mario);
            else this.FueraDeRango(mario);
            this._gameObject.body.velocity.y=0;
            }
            // por si se hubiera dejado de pulsar las teclas
            //(si no esta subiendo una escalera)
            else {
                this._gameObject.body.velocity.x = 0;
                this._gameObject.body.gravity.y=0;//si esta subiendo la gravedad se reinicia
                if(this._gameObject.body.velocity.y < 0) {
                    if(this._gameObject.y <= this._yObjetivo)this._subiendo = false;
                }
                else if (this._gameObject.y >= this._yObjetivo) this._subiendo = false;
            }
            //si toca el suelo
            if(this._gameObject.body.onFloor()){
                if(this._gameObject.body.onWall())this._vel = this._velMax;
                else this._vel = this._velMin;//si no, vuelve a su velocidad normal
            }
        }
        //----------------------------------------------------------------------
    
        
        //-----------------------------AUXILIARES-------------------------------
    
        actualizaContador(){
            this._contador++;
        }

        //se llama cuando sales de una escalera, ya no puedes subirla
        noPuedeSubir(){ 
            this._sube=false;
            this._gameObject.body.gravity.y=400;
            this._atraviesa = false;
         }

        flamaSpawn(posX,posY){
            this.spawn(posX,posY);
            this._gameObject.body.velocity.x = 0;
            this._atraviesa = false;
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