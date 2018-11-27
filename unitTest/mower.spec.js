const MowerMod = require("../src/mower/Mower");
const Mower = MowerMod.Mower;
const mower1 = new Mower([1,1,"N"],["F"]);


 describe("Mower Unit Tests", function(){
   test("Mower.canMove should return false if Mower is on border with associated Cardinal",function(){

     // repeat this test for all the borders (and one valid case)
     expect(mower1.canMove(mower1.x,mower1.y,0,1,mower1.card,mower1.inputs[0],[mower1])).toEqual(false);
   })

   test("Mower.applyInputs should return expected coordinates",function(){
     // replicate for each kind of inputs to see if the function behave well
     expect(mower1.applyInputs(10,10,[mower1])).toEqual([ 1, 2, 'N']);
   })

 })