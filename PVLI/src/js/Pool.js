//pool para los grupos de objetos
function Pool(game, entities, number) {
    this._group = game.add.group();//añade un grupo al juego
    this._group.createMultiple(number, entities);//añade a ese grupo las entidades
    this._group.callAll('kill');//las pone a "no existente"
 }
 
 //al llamar a spawn
 Pool.prototype.spawn = function (x, y) {
    var entity = this._group.getFirstExists(false);//coge el primer objeto que no exista
    if (this.entity) {//y hace que exista en la posicion x, y
       this.entity.reset(x, y);
    }
    return this.entity;
 }