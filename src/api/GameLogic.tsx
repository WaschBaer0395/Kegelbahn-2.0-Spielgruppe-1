// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 40842 });

// const { players, addPlayer, removePlayer, updateScore } = require('../data/Player');



// const player1 = addPlayer('Spieler 1');
// const player2 = addPlayer('Spieler 2');
// const [players, setPlayers] = useState<Player[]>();
//const game = useContext(GameContext);

// // Beispiel: Funktion zum Senden einer Punktzahl für einen Spieler
// // export function sendScore(player: Player, score) {
// //     const scoreData = {
// //         player: player.name,
// //         score: score,
// //     };

// //     // Nachricht an den MQTT-Broker senden
// //     //   client.publish(TOPIC, JSON.stringify(scoreData));
// // }

// function updateScore(player:Player, newScore:number) {
//     setPlayers((prevPlayers) =>
//         prevPlayers.map((listPlayer) =>
//         listPlayer.id === player.id ? { ...listPlayer, points: listPlayer.score + newPoints } : player
//       )
//     );
// }

// export function makeMove(player: Player, newScore: number) {
//     if (game.players.includes(player)) {
//         player.updateScore(player.round, newScore);
//     } else {
//         console.warn(`Warnung: ${player} nicht gefunden.`);
//     }
//     // updateFrontend("");
// }

// export function printScores() {
//     game.players.forEach((player) => {
//         console.log(`${player.name} hat ${player.getTotalScore()}m erreicht.`);
//     })
//     // updateFrontend(players);
// }

// function updateFrontend(outputData) {
//     setTimeout(function(){
//         console.log("Update Frontend");
//         wss.clients.forEach((client) => {
//             client.send(JSON.stringify({ type: 'gameUpdate', data: JSON.stringify(outputData) }));
//         });
//     }, 10000);
// }

import { log } from "console";
import { Player } from "../components/Player/player";

export class GameLogic {
    players: Player[];
    currentPlayer: number
    currentRound: number
    private maxRounds: number
    private gameStarted: boolean
    // even turn = positive round, odd turn = negative round
    private turn: number;
    constructor(players_: Player[]) {
        this.players = players_;
        this.gameStarted = false;
        this.turn = 1;
        this.currentPlayer = 0
        this.currentRound = 1
        this.maxRounds = 8 // means 8 throws total, 2 throws per person
    }

    setPlayers(players_: Player[]) {
        this.players = players_
    }

    getPlayers() {
        return this.players
    }

    startGame() {
        this.gameStarted = true
        //console.log('startGame: ' + this.gameStarted)
    }

    stopGame() {
        this.gameStarted = false
        //console.log('stopGame: ' + this.gameStarted)
    }

    hasStarted() {
        //console.log('hasStarted: ' + this.gameStarted)
        return this.gameStarted
    }

    makeMove(score: number) {
        const currentPlayer: Player = this.players[this.currentPlayer]
        if (this.currentRound <= this.maxRounds) {
            // odd throw = scores are positive
            if (this.turn % 2) {
                currentPlayer.updateScore(this.currentRound, score)
                this.turn = 2

                console.log('Positiv: ', currentPlayer, currentPlayer.getTotalScore());
                console.log('----------');
            }
            // even throw = scores are negative
            else {
                currentPlayer.updateScore(this.currentRound, 0 - score)
                this.currentPlayer += 1
                this.turn = 1


                // check if last player has done their throw, and switch to new round and begin with player 0 again
                if (this.currentPlayer == this.players.length) {
                    this.currentPlayer = 0
                    this.currentRound += 1
                    console.log(this.players);
                }

                console.log('Negativ: ', currentPlayer, currentPlayer.getTotalScore());
                console.log('Next: ', this.players[this.currentPlayer]);
                console.log('----------');
            }
        }
        else {
            console.log('Game Over')
            this.currentPlayer = 0
            this.currentRound = 1
            this.turn = 1
            this.players.forEach((player) => {
                player.resetScore()
            });
        }
    }
}
