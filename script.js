const gameBoard = (function(){
     
     let a = ["x", "o", "x"];
     let b = ["", "o", ""];
     let c = ["", "", "o"];

     function addMarker (player, letter, index){
          if(letter[index] == ""){
               letter[index] = "" + player + "";
          }
     };
     
     function restart(){
          gameBoard.a = ["", "", ""];
          gameBoard.b = ["", "", ""];
          gameBoard.c = ["", "", ""];
     }

     return {a, b, c, addMarker, restart}

})();