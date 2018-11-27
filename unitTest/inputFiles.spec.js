const AppMod = require("../src/App");
const App = AppMod.App;

var app = new App();


describe('InputFile UT ',function(){
  test('no file input should throw error',function(){
    function test(){
      app.main()
    }
    expect(test).toThrowError(/Problème avec la lecture du fichier/)
  })

  test('first line incomplete should throw error',function(){
    function test(){
      app.main('wrong1stLine.txt')
    }
    expect(test).toThrowError(/There is a problem with lawn top right coordinates/)
  })

  test('first line negative number should throw error',function(){
    function test(){
      app.main('wrong1stLine2.txt')
    }
    expect(test).toThrowError(/There is a problem with lawn top right coordinates/)
  })

  test('wrong number of lines should throw error',function(){
    function test(){
      app.main('wrongNumberOfLines.txt')
    }
    expect(test).toThrowError(/One Pair lines of mower inputs is incomplete/)
  })

  test('wrong mower coord should throw error',function(){
    function test(){
      app.main('wrongMowerCoord.txt')
    }
    expect(test).toThrowError(/wrong mower coordinate format/)
  })

  test('wrong mower inputs should throw error',function(){
    function test(){
      app.main('wrongMowerInputs.txt')
    }
    expect(test).toThrowError(/wrong mower inputs format/)
  })
})