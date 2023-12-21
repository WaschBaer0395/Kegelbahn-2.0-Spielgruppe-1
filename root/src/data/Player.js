// import "./Score";
// const { Score } = require('./Score');

// playerName = "Player 1";
// playerIndex = 0;
// var scoreImport = require("./Score");
// var score = 0;

// this.PlayerConstructor = (name, index) => {
//     playerName = name;
//     playerIndex = index;
//     scoreImport = require("./Score");
//     score = scoreImport;
//     score.ScoreConstructor();
//     // score = new Score();
// }

// this.printScores = () => {
//     console.log(playerName + " hat " + score.currentScore() + "m erreicht.");
//     // console.log(playername + " hat " + score.score + "m erreicht.");
// }

// this.geheHoch = (meter) => {
//     console.log("hoch");
//     score.updateScore(meter);
// }

// // module.exports = { PrintScores, geheHoch};
// exports = this;


// class Player {
//     playerName;
//     playerIndex;
//     score;

//     constructor(name, index) {
//         this.playerName = name;
//         this.playerIndex = index;
//         this.score = new Score();
//     }

//     printScores() {
//         console.log(this.playerName + " hat " + this.score.currentScore() + "m erreicht.");
//     }

//     geheHoch(meter) {
//         score.updateScore(meter);
//     }
// };

const players = [];

function addPlayer(name) {
    const player = { name, score: 0 };
    players.push(player);
    return player;
}

function removePlayer(player) {
    const index = players.indexOf(player);
    if (index !== -1) {
        return players.splice(index, 1);
    }
}

function updateScore(player, newScore) {
    player.score += newScore;
}

module.exports = {
    players,
    addPlayer,
    removePlayer,
    updateScore,
};
