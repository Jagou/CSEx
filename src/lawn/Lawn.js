function Lawn(){

  //we don't need to have an array, we just need to know the borders
  // which will be [0,y],[x,0],[xLimit,y], [x,yLimit]
  // where (x,y) are the coordinate of the point and must be
  // respectively between [0,xLimit] and [0,yLimit]
  this.xLimit = 0;
  this.yLimit = 0;

  this.mowers = [];

  this.init = function(coords){
    this.xLimit = coords[0];
    this.yLimit = coords[1];
  }

  this.add = function(mower){
    this.mowers.push(mower);
  }


}

module.exports = {
  Lawn: Lawn
}