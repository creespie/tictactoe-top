const gameBoard = (function(){
     let turn = 0;
     let a = ["x", "", ""];
     let b = ["", "x", "o"];
     let c = ["x", "", "x"];

     function addMarker (player, letter, index){
          if(letter[index] == ""){
               letter[index] = "" + player + "";
               gameBoard.turn++;
               if(gameBoard.turn > 5){gameBoard.checkWin()}
          }
     };
     
     function restart(){
          gameBoard.a = ["", "", ""];
          gameBoard.b = ["", "", ""];
          gameBoard.c = ["", "", ""];
          gameBoard.turn = 0;
     }

     function checkWin(){
          //vertical wins
          for(let i = 0; i < 3; i++){
               if(gameBoard.a[i] != "" && gameBoard.a[i] === gameBoard.b[i] && gameBoard.b[i] === gameBoard.c[i]){
                    let winner = gameBoard.c[1];
                    gameBoard.restart();
                    return "player " + winner + " won!"
          }
          }
          //horizontal wins
          if(gameBoard.a[0] != "" && gameBoard.a.every(value => value == gameBoard.a[0])){
               let winner = gameBoard.a[0];
               gameBoard.restart();
               return "player " + winner + " won!"
          }
          if(gameBoard.b[0] != "" && gameBoard.b.every(value => value == gameBoard.b[0])){
               let winner = gameBoard.b[0];
               gameBoard.restart();
               return "player " + winner + " won!"
          }
          if(gameBoard.c[0] != "" && gameBoard.c.every(value => value == gameBoard.c[0])){
               let winner = gameBoard.c[0];
               gameBoard.restart();
               return "player " + winner + " won!"
          }
          //diagonal wins
          if(gameBoard.a[0] != "" && gameBoard.a[0] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[2]){
                    let winner = gameBoard.c[2];
                    gameBoard.restart();
                    return "player " + winner + " won!"
          }
          if(gameBoard.a[2] != "" && gameBoard.a[2] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[0]){
                    let winner = gameBoard.c[0];
                    gameBoard.restart();
                    return "player " + winner + " won!"
          }
     };

     return {a, b, c, turn, addMarker, restart, checkWin}

})();