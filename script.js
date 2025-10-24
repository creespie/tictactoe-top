const gameBoard = (function(){
     let turn = 0;
     let a = ["", "", ""];
     let b = ["", "", ""];
     let c = ["", "", ""];

     function startGame(player1, player2, winner){
          displayManager.playerDisplay(player1, player2, winner);
          

     }

     function addMarker (letter, index){
          if(letter[index] == ""){
               if(gameBoard.turn % 2 == 0){
                    player = "x"
               }else{
                    player = "o"
               }
               letter[index] = player;
               displayManager.markerDisplay()
               displayManager.playerDisplay(displayManager.player1, displayManager.player2, gameBoard.winner)
               gameBoard.turn++;
               displayManager.turn++;
               gameBoard.checkWin();
          } 
     };
     
     function restart(){
          gameBoard.a = ["", "", ""];
          gameBoard.b = ["", "", ""];
          gameBoard.c = ["", "", ""];
          gameBoard.turn = 0;
          displayManager.turn = 0;
          displayManager.playerDisplay(displayManager.player1, displayManager.player2, gameBoard.winner)
     }

     let score1 = 0;
     let score2 = 0;
     let winner = "";
     

     function checkWin(){
          //draws
          if(gameBoard.turn == 9){
               gameBoard.restart();
               const winnerAnnounce = document.querySelector(".winner");
               winnerAnnounce.textContent = "it's a draw!";
          };
          
          //vertical wins
          for(let i = 0; i < 3; i++){
               if(gameBoard.a[i] != "" && gameBoard.a[i] === gameBoard.b[i] && gameBoard.b[i] === gameBoard.c[i]){
                    gameBoard.winner = gameBoard.c[i];
               }
          }
          //horizontal wins
          if(gameBoard.a[0] != "" && gameBoard.a.every(value => value == gameBoard.a[0])){
               gameBoard.winner = gameBoard.a[0];
          }
          if(gameBoard.b[0] != "" && gameBoard.b.every(value => value == gameBoard.b[0])){
               gameBoard.winner = gameBoard.b[0];
          }
          if(gameBoard.c[0] != "" && gameBoard.c.every(value => value == gameBoard.c[0])){
               gameBoard.winner = gameBoard.c[0];  
          }
          //diagonal wins
          if(gameBoard.a[0] != "" && gameBoard.a[0] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[2]){
                    gameBoard.winner = gameBoard.c[2];
          }
          if(gameBoard.a[2] != "" && gameBoard.a[2] === gameBoard.b[1] && gameBoard.b[1] === gameBoard.c[0]){
                    gameBoard.winner = gameBoard.c[0];
          }
          if(gameBoard.winner != ""){
               if(gameBoard.winner == "x"){
                    gameBoard.score1++;
                    displayManager.playerDisplay(displayManager.player1, displayManager.player2, gameBoard.winner)
               }else{
                    gameBoard.score2++;
                    displayManager.playerDisplay(displayManager.player1, displayManager.player2, gameBoard.winner)
               }
               gameBoard.winner = "";
               gameBoard.restart();
          }
     };

     return {a, b, c, turn, score1, score2, winner, addMarker, restart, checkWin, startGame}

})();


const grid = document.querySelectorAll(".rowA, .rowB, .rowC");

const displayManager = (function(){
     function markerDisplay(){
          for(let i = 0; i <9; i++){
               if(i<3){
                    grid[i].textContent = gameBoard.a[i]
               }else if(i>2 && i<6){
                    grid[i].textContent = gameBoard.b[i-3]
               }else{
                    grid[i].textContent = gameBoard.c[i-6]
               }
          }
     };

     let turn = 0;
     function playerDisplay(player1, player2, winner){
          //score
          const score1 = document.querySelector(".scoreX");
          const score2 = document.querySelector(".scoreO");
          score1.textContent = player1 + " score is: " + gameBoard.score1;
          score2.textContent = player2 + " score is: " + gameBoard.score2;


          //turn
          const playerLine = document.querySelector(".turnDisplay")
          if(turn % 2 == 0){
               playerLine.textContent = "It's " + player1 + " turn!";
          }else{
               playerLine.textContent = "It's " + player2 + " turn!";
          }

          //winner
          const winnerAnnounce = document.querySelector(".winner");
          if(winner != undefined){
               winnerAnnounce.textContent = winner + " won!"
          }
     }

     function markerRegister(){
          for(let i = 0; i <9; i++){
               grid[i].addEventListener("click", (item) => {
                    let id = item.target.id.split("");
                    gameBoard.addMarker(gameBoard[id[1]], id[0] - 1)});
                    displayManager.playerDisplay();
          }
     }

     function nameSelection(){
          const start = document.querySelector(".start")
          const form = document.querySelector(".startForm")

          start.showModal();

          form.addEventListener("submit", (e) => {
               e.preventDefault(); 
               const player1 = document.querySelector("#player1").value;
               const player2 = document.querySelector("#player2").value;
               gameBoard.startGame(player1, player2, gameBoard.winner)
               start.close();
               return player1, player2;
          })

     }

     return {markerDisplay, playerDisplay, markerRegister, nameSelection, turn, player1, player2}
})();

displayManager.nameSelection();
displayManager.markerRegister();