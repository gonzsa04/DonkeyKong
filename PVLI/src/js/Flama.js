//clase Flama, un enemigo, hereda de GameObject
class Flama extends GameObject{
    
        //--------------------------------------CONSTRUCTORA-------------------------------------
        //constructora de la Flama
        constructor(x, y, nombre, Rango){
            super(x, y, nombre);//llama a constructora de GamObject
            this._inRange = false;
            this._persigue = -1;
            this._rango = Rango;
            this._yObjetivo;
            this._elige = 1;
            this._sube=true;//indica si la Flama puede subir escaleras
            this._subiendo=false;//indica si la Flama esta subiendo escaleras
            this._velMax = 125;//velocidad a la que sube las rampas
            this._velMin = 50;//velocidad normal a la que camina
            this._gameObject.body.setSize(this._gameObject.width*3/4, this._gameObject.height/2);
            //redimensionamos su collider
    
            //ANIMACIONES
            //todas se guardaran en anim
            this._anim.add('normal', [0,1], 6, true);//parado
            this._anim.add('martillo', [2,3], 6, true);
            this._anim.add('aplastado', [4,5,6,7], 8, false);
            this._anim.play('normal');
            game.time.events.loop(Phaser.Timer.SECOND, this.actualizaContador, this);//suma al contador 1 cada segundo
        }
        //--------------------------------------------------------------------------------------
    
    
        //----------------------------------MOVIMIENTO------------------------------------------
    
        //mueve a la Flama a una velocidad si puede hacerlo y si no se sale del mapa
        mueveIzquierda(){
           
            if(!this._inmovil && !this._muerto){
                this._vel = -this._velMin;
                this._velMax = -125;
                this._gameObject.scale.setTo(1, 1);
            }
        }

        mueveDerecha(){
            if(!this._inmovil && !this._muerto){
                this._vel = this._velMin;
                this._velMax = 125;
                this._gameObject.scale.setTo(-1, 1);
            }
        }

        FueraDeRango(mario){
            if(this._inRange){ this._contador = 0; this._inRange = false;}
            if(this._gameObject.body.onWall())this._gameObject.body.velocity.x = this._velMax;
            else this._gameObject.body.velocity.x = this._vel;//si no, vuelve a su velocidad normal
            if(this._contador == this._elige){
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
        }

        DentroDeRango(mario){
            if(!this._inRange){ this._contador = 0; this._inRange = true;}
            if(this._gameObject.body.onWall())this._gameObject.body.velocity.x = this._velMax;
            else this._gameObject.body.velocity.x = this._vel;//si no, vuelve a su velocidad normal
            if(this._contador == this._elige*2){
                this._contador = 0;
                if(mario.x > this._gameObject.x)this.mueveDerecha();
                else this.mueveIzquierda();
            }
        }
    
        //hace subir o bajar a la Flama por una escalera, si puede
        escaleras(escalera){
            if(!this._muerto && !this._sube && this._gameObject.x < escalera.x + escalera.width*3/5 && this._gameObject.x > escalera.x + escalera.width*2/5){
                this._persigue = Math.floor(Math.random()*2);
                this._sube = true;
                if (this._persigue >= 1){
                    this._atraviesa = true;
                    if(!this._subiendo){
                        this._subiendo = true;
                        if(this._gameObject.y < escalera.y + escalera.height/2){
                            this._gameObject.body.velocity.y = this._velMin;
                            this._yObjetivo = this._gameObject.y + escalera.height*escalera.scale.y;
                        }
                        else{
                            this._gameObject.body.velocity.y = -this._velMin;
                            this._yObjetivo = this._gameObject.y - escalera.height*escalera.scale.y;
                        } 
                    }
                }
            }
        }
        //-----------------------------------------------------------------------------
    
    
        //--------------------------------UPDATE---------------------------------------
    
        //update de la Flama, mira si la Flama choca con el suelo
        update(plataformas, self, mario, collidersF){
            if(!this._muerto){
            //la Flama colisiona con las plataformas si no puede atravesarlas
            if(!this._atraviesa)game.physics.arcade.collide(this._gameObject, plataformas);
            if(!this._subiendo){
                game.physics.arcade.collide(this._gameObject, collidersF);
                if(game.physics.arcade.distanceToXY(this._gameObject, mario.x, mario.y) <= this._rango)this.DentroDeRango(mario);
                else this.FueraDeRango(mario);
                this._gameObject.body.velocity.y=0;
            }
            
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
            if (mario.llevaMartillo())this._anim.play('martillo');
            else this._anim.play('normal');
        }
        }
        //----------------------------------------------------------------------
    
        
        //-----------------------------AUXILIARES-------------------------------
    
        actualizaContador(){
            if(!this._muerto)
                this._contador++;
        }

        //se llama cuando sales de una escalera, ya no puedes subirla
        noPuedeSubir(){ 
            if(!this._muerto){
            this._sube=false;
            this._gameObject.body.gravity.y=400;
            this._atraviesa = false;
            }
         }

        flamaSpawn(posX,posY){
            this.spawn(posX,posY);
            this._vel = 0;
            this._muerto = false;
            this._anim.play('normal');
            this._atraviesa = false;
        }
    
         //permite atravesar muros si no has saltado antes y si estas subiendo
        atraviesa(){ if(this._subiendo)this._atraviesa = true; }

        aplastado(score, self){
            if(!this._muerto){
                this._muerto = true;
                this._gameObject.body.velocity.x =  this._gameObject.body.velocity.y = 0;
                game.score+=300;
                self.hudSpawn(300);
                this._vel = 0;
                this._anim.play('aplastado');
                this._anim.currentAnim.onComplete.add(this.morir, this);
            }
        }
        //-----------------------------------------------------------------------
    }