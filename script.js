const gameBoard = (function(){
     let turn = 0;
     let a = ["", "", ""];
     let b = ["", "", ""];
     let c = ["", "", ""];

     function startGame(player1, player2){
          // displayManager.player1 = player1;
          // displayManager.player2 = player2;
          displayManager.playerDisplay(gameBoard.winner);
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
               
               gameBoard.turn++;
               displayManager.turn++;
               displayManager.playerDisplay(gameBoard.winner)
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

     function reset(){
          displayManager.nameSelection();
          gameBoard.restart();
          gameBoard.score1 = 0;
          gameBoard.score2 = 0;
     }

     function clear(){
          gameBoard.restart();
          gameBoard.score1 = 0;
          gameBoard.score2 = 0;
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
                    displayManager.playerDisplay(gameBoard.winner)
               }else{
                    gameBoard.score2++;
                    displayManager.playerDisplay(gameBoard.winner)
               }
               gameBoard.winner = "";
               gameBoard.restart();
          }
     };

     return {a, b, c, turn, score1, score2, winner, addMarker, restart, checkWin, startGame, reset, clear}

})();


const grid = document.querySelectorAll(".rowA, .rowB, .rowC");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear")


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

     let turn = 2;
     function playerDisplay(winner){
          //score
          const score1 = document.querySelector(".scoreX");
          const score2 = document.querySelector(".scoreO");
          score1.textContent = displayManager.player1 + " score is: " + gameBoard.score1;
          score2.textContent = displayManager.player2 + " score is: " + gameBoard.score2;


          //turn
          const playerLine = document.querySelector(".turnDisplay")
          if(displayManager.turn % 2 == 0){
               playerLine.textContent = "It's " + displayManager.player1 + " turn!";
          }else{
               playerLine.textContent = "It's " + displayManager.player2 + " turn!";
          }

          //winner
          const winnerAnnounce = document.querySelector(".winner");
          if(winner != ""){
               winnerAnnounce.textContent = winner + " won!"
          }else{
               winnerAnnounce.textContent = "";
          }
     }

     function markerRegister(){
          for(let i = 0; i <9; i++){
               grid[i].addEventListener("click", (item) => {
                    let id = item.target.id.split("");
                    gameBoard.addMarker(gameBoard[id[1]], id[0] - 1)});
                    displayManager.playerDisplay(gameBoard.winner)
          }
          reset.addEventListener( "click", () => {gameBoard.reset()});
          clear.addEventListener( "click", () => {gameBoard.clear(); displayManager.playerDisplay(gameBoard.winner)});
     }

     let player1 = "";
     let player2 = "";
    
     function nameSelection(){
          const start = document.querySelector(".start")
          const form = document.querySelector(".startForm")

          start.showModal();

          form.addEventListener("submit", (e) => {
               e.preventDefault(); 
               displayManager.player1 = document.querySelector("#player1").value;
               displayManager.player2 = document.querySelector("#player2").value;
               gameBoard.startGame(player1, player2)
               start.close();
          });
          
     }

     return {markerDisplay, playerDisplay, markerRegister, nameSelection, turn, player1, player2}
})();

displayManager.nameSelection();
displayManager.markerRegister();