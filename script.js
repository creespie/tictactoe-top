const gameBoard = (function(){
     let turn = 0;
     let a = ["", "", ""];
     let b = ["", "", ""];
     let c = ["", "", ""];

     function addMarker (letter, index){
          if(letter[index] == ""){
               if(gameBoard.turn % 2 == 0){
                    player = "x"
               }else{
                    player = "o"
               }
               letter[index] = player;
               gameBoard.turn++;
               
               
          }
          //gameBoard.checkWin();
     };
     
     function restart(){
          gameBoard.a = ["", "", ""];
          gameBoard.b = ["", "", ""];
          gameBoard.c = ["", "", ""];
          gameBoard.turn = 0;
     }

     function checkWin(){
          let winner = "";
          //vertical wins
          for(let i = 0; i < 3; i++){
               if(gameBoard.a[i] != "" && gameBoard.a[i] === gameBoard.b[i] && gameBoard.b[i] === gameBoard.c[i]){
                    winner = gameBoard.c[i];
               }
          }
          //horizontal wins
          if(gameBoard.a[0] != "" && gameBoard.a.every(value => value == gameBoard.a[0])){
               winner = gameBoard.a[0];
          }
          if(gameBoard.b[0] != "" && gameBoard.b.every(value => value == gameBoard.b[0])){
               winner = gameBoard.b[0];
          }
          if(gameBoard.c[0] != "" && gameBoard.c.every(value => value == gameBoard.c[0])){
               winner = gameBoard.c[0];  
          }
          //diagonal wins
          if(gameBoard.a[0] != "" && gameBoard.a[0] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[2]){
                    winner = gameBoard.c[2];
          }
          if(gameBoard.a[2] != "" && gameBoard.a[2] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[0]){
                    winner = gameBoard.c[0];
          }
          if(winner != ""){
               let announce = winner;
               winner = "";
               gameBoard.restart();
               return "player " + announce + " won!"
          }
     };

     return {a, b, c, turn, addMarker, restart, checkWin}

})();