const { Chess } = require("chess.js");

const game = new Chess();

const output = game.board();
// game.ascii()
console.log(game.ascii());

game.move({ from: "e2", to: "e4" });

