const fs = require('fs');
const mowerMod = require('./mower/Mower');
const lawnMod = require('./lawn/Lawn');

let Mower = mowerMod.Mower;
let Lawn = lawnMod.Lawn;

var lawn = new Lawn();


//const file = fs.readFileSync('../inputFiles/sequence.txt');
function App(){


// Main
this.main = function(param){
  try{
    const file = fs.readFileSync(__dirname+'/inputFiles/'+param);
    // \r\n because i'm on windows
    const inputsArray = file.toString().split("\r\n");

    // we start the check & build
    this.validityCheckAndBuild(inputsArray);

    //we will apply the inputs of each mowers
    lawn.mowers.map(function(mower,index){
      console.log(mower.applyInputs(lawn.xLimit,lawn.yLimit,lawn.mowers));
    })
  }catch(e){
    throw new Error("Problème avec la lecture du fichier "+param+ "\n "+e);
  }

}







// this function will check the validity of the file and
// build the basic setup at the same time
// because parsing files can take a long time for big files
// so the less we need to parse the better it is

this.validityCheckAndBuild = function(array){
  // First element of the array must be :
  // two positive numbers separated with a whitespace

  if(!/^\d+\s\d+$/.test(array[0])){
    throw new Error('There is a problem with lawn top right coordinates');
  }
  const lawnParams = array[0].split(" ");

  lawn.init(lawnParams);


  // remaining elements should go by pair, so array.length-1 %2 should be 0


  if(!((array.length-1)%2==0)){
    throw new Error('One Pair lines of mower inputs is incomplete')
  }

  // for all the tests under,
  // with the index of the array we can find the number of the line which cause problems

  for(var i = 1;i<array.length; i=i+2){
    // we need to do a check similar to the first one but the line should finish with a letter
    // N/S/E/W;
    if(!/^\d+\s\d+\s[NSEW]$/.test(array[i])){
      throw new Error("Line "+(i+1)+" have a problem : wrong mower coordinate format");
    }
    const mowerCoords = array[i].split(" ");

    // the following line must be a suit of L|F|F only, we take empty line (no inputs) as error
    if(!/^[LFR]+$/.test(array[i+1])){
      throw new Error("Line "+(i+2)+" have a problem : wrong mower inputs format");
    }
    const mowerInputs = array[i+1].split('');

    lawn.add(new Mower(mowerCoords,mowerInputs));
  }
}

}

module.exports = {
  App:App
}