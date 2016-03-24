var btn = document.createElement('BUTTON');
var t = document.createTextNode('Start Game');
btn.appendChild(t);
document.body.appendChild(btn);
var text;
btn.addEventListener('click', function(){

  var players = [];
  btn.parentNode.removeChild(btn);
  text = document.createElement('INPUT');
  text.type = 'text';
  document.body.appendChild(text);
  var addPlayerBtn = document.createElement('BUTTON');
  var playerText = document.createTextNode('Add Player');
  addPlayerBtn.appendChild(playerText);
  addPlayerBtn.addEventListener('click', function() {
    players.push(new Player(text.value, 500));
    text.value = '';
    playerText.parentNode.removeChild(playerText)
    playerText = document.createTextNode('Add Player');
    addPlayerBtn.appendChild(playerText);
  });
  var startGame = document.createElement('BUTTON');
  startGame.appendChild(document.createTextNode('Start Round'));
  document.body.appendChild(addPlayerBtn);
  document.body.appendChild(startGame);
  startGame.addEventListener('click', function() {
    startGame.parentNode.removeChild(startGame);
    addPlayerBtn.parentNode.removeChild(addPlayerBtn);
    // console.log('Start Game!')
    var game = new Game(players);
    // console.log(game)
    game.newRound();
    // console.log(game._currentRound.player)
    var passBtn = document.createElement('BUTTON');
    passBtn.appendChild(document.createTextNode('Pass'));

    var raiseBtn = document.createElement('BUTTON');
    raiseBtn.appendChild(document.createTextNode('Raise'));

    var foldBtn = document.createElement('BUTTON');
    foldBtn.appendChild(document.createTextNode('Fold'));

    document.body.appendChild(passBtn);
    document.body.appendChild(raiseBtn);
    document.body.appendChild(foldBtn);

    passBtn.addEventListener('click', function() {
      const winner = game._currentRound.winner;
      if (!winner) {
        game._currentRound.nextTurn('pass');
        // console.log(game.player)
        text.value = '';
      } else {
        console.log('Winner: ' + winner.name);
        game.newRound();
      }
    });

    raiseBtn.addEventListener('click', function() {
      const winner = game._currentRound.winner;
      if (!winner) {
        game._currentRound.nextTurn('raise', parseFloat(text.value));
        text.value = '';
      } else {
        console.log('Winner: ' + winner.name);
        
        game.newRound();
      }
    })

    foldBtn.addEventListener('click', function() {
      const winner = game._currentRound.winner;
      if (!winner) {
        game._currentRound.nextTurn('fold');
        text.value = '';
      } else {
        console.log('Winner: ' + winner.name);
        game.newRound();
      }
    })
  });
});


// function addPlayer() {
//



// (function() {
//   const game = new Game(players);
//
//   function handleMouse(ev) {
//     const c_player = game._currentRound.player;
//     const action = getAction(ev);
//   }
//
//   // function getAction(ev) {
//   //   if(condA) {
//   //     return 'raise'
//   //   }
//   // }
// })();
