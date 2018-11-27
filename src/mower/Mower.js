function Mower(coords,inputs){
  this.x=parseInt(coords[0]);
  this.y=parseInt(coords[1]);
  this.card=coords[2];
  this.inputs=inputs;

  this.canMove = function(x,y,xLimit,yLimit,curCard,nextInput,mowers){
    var self = this;
    // the input is L or R, there is no movement so you can always move,
    if(/L|R/.test(nextInput)){
      return true;
    }
    // In case of F, it will require more checks
    switch(true){

      // we are on the left limit and facing West
      case x == 0 && curCard == "W":
        return false;
        break;
      // we are on the bottom limit and facing South
      case y == 0 && curCard == "S":
        return false;
        break;
      // we are on the right limit and facing East
      case x == xLimit && curCard == "E":
        return false;
        break;
      // we are on the top limit and facing North
      case y == yLimit && curCard == "N":
        return false;
        break;

      // every other display can move
      /*default:
      return true;*/
    }

    // we now need to check for collisions
    return mowers.reduce(function(acc,currMower,index){
      return acc && (!(currMower.x==(x+1)&&currMower.y==y&&curCard=="E")&&!(currMower.x==(x-1)&&currMower.y==y&&curCard=="W")&&!(currMower.y==(y+1)&&currMower.x==x&&curCard=="N")&&!(currMower.y==(y-1)&&currMower.y==y&&curCard=="S"));
    },true)
  };

  this.applyInputs = function(xLimit,yLimit, mowers){
    // binding problems, so we can have acces to the object function in reduce context
    var self = this;
    const finalCoords = this.inputs.reduce(function(accumulator,nextInput,index){

      // maybe not optimal (for readability) written like this but do the job
      return self.move(accumulator[0],accumulator[1],accumulator[2],nextInput,self.canMove(accumulator[0],accumulator[1],xLimit,yLimit,accumulator[2],nextInput,mowers));

    },[this.x,this.y,this.card]);

    return finalCoords;
    // we try to know if the mower can move
    // which means :
    // the mower isn't on the borders and facing the card corresponding to this border

  };



  this.move = function(curX,curY,curCard,inputToDo,movable){
    var nextX = curX,
        nextY = curY,
        nextCard = curCard;

    const cct = curCard+inputToDo;


    switch(cct){

      // these following cases change just the direction and not the position;

      // I'm little confused though since in the text, this phrase :
      // « R » and « L » make the mower rotate of 90° respectively to the left or to the right
      // associate R with left and L with right
      // but the expected output is reachable by doing the contrary
      case "SR" :
      case "NL" :
        nextCard ="W"; //"E";
        break;
      case "SL" :
      case "NR" :
        nextCard = "E";//"W";
        break;
      case "WL":
      case "ER" :
        nextCard = "S";//"N";
        break;
      case "WR":
      case "EL":
        nextCard = "N";//"S";
        break;

      //these following will handle the forward move

      case "NF":
        if(movable){
          nextY = curY +1;
        }
        break;
      case "WF":
        if(movable){
          nextX = curX - 1;
        }
        break;
      case "EF":
        if(movable){
          nextX = curX + 1;
        }
        break;
      case "SF":
      if(movable){
        nextY = curY - 1;
      }
    }
    return [nextX,nextY,nextCard];
  };



}

module.exports = {
  Mower: Mower
}