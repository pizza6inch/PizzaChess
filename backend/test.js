const { Chess } = require("chess.js");

const game = new Chess();


console.log(game.ascii());

game.move({ from: "e2", to: "e4" });

game.ascii();
