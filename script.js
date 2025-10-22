const gameBoard = (function(){
     
     let a = ["x", "o", "x"];
     let b = ["", "o", ""];
     let c = ["", "", "o"];

     function addMarker (player, letter, index){
         letter[index] = "" + player + "";
     };
     
     return {a, b, c, addMarker}

})();