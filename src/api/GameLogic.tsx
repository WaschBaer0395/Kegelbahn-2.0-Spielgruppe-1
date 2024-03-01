// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 40842 });

import { useContext, useState } from "react";
import Player from "../components/Player/player";
import { GameContext, useGameContext } from "./GameLogicDataContext";

// const { players, addPlayer, removePlayer, updateScore } = require('../data/Player');



// // const player1 = addPlayer('Spieler 1');
// // const player2 = addPlayer('Spieler 2');
// // const [players, setPlayers] = useState<Player[]>();
// const { players, setPlayers } = useContext(GameContext);

// // Beispiel: Funktion zum Senden einer Punktzahl für einen Spieler
// // export function sendScore(player: Player, score) {
// //     const scoreData = {
// //         player: player.name,
// //         score: score,
// //     };

// //     // Nachricht an den MQTT-Broker senden
// //     //   client.publish(TOPIC, JSON.stringify(scoreData));
// // }

// // function updateScore(player:Player, newScore:number) {
// //     setPlayers((prevPlayers) =>
// //         prevPlayers.map((listPlayer) =>
// //         listPlayer.id === player.id ? { ...listPlayer, points: listPlayer.score + newPoints } : player
// //       )
// //     );
// // }
// // working
// export function makeMove(player: Player, newScore: number) {
//     if (players.includes(player)) {
//         player.updateScore(player.round, newScore);
//     } else {
//         console.warn(`Warnung: ${player} nicht gefunden.`);
//     }
//     // updateFrontend("");
// }
// // working
// export function printScores() {
//     players.forEach((player) => {
//         console.log(`${player.name} hat ${player.getTotalScore()}m erreicht.`);
//     })
//     // updateFrontend(players);
// }

// // function updateFrontend(outputData) {
// //     setTimeout(function(){
// //         console.log("Update Frontend");
// //         wss.clients.forEach((client) => {
// //             client.send(JSON.stringify({ type: 'gameUpdate', data: JSON.stringify(outputData) }));
// //         });
// //     }, 10000);
// // }

export class GameLogic {
    players: Player[];
    // even turn = positive round, odd turn = negative round
    turn: number;
    isConstructed: boolean;
    constructor() {
        this.players = [];
        this.turn = 0;
        this.isConstructed = false;
    }

    initialize(players: Player[]) {
        this.players = players;
        this.turn = 0;
        this.isConstructed = true;
    }
    isReady() {
        return this.isConstructed;
    }
    getTurnPlayer() {
        return this.players[(Math.floor(this.turn / 2) % this.players.length)];
    }
    isTurnNegative() {
        return this.turn % 2;
    }
    makeMove(score: number) {
        var turnplayer = this.getTurnPlayer();
        var turnplayerIndex = this.players.indexOf(turnplayer);
        var newScore: number;
        if (this.turn % 2) {
            // Negative Round
            // Missing all Pins counts as -9
            if (score = 0) score = 9;
            if (turnplayer.getTotalScore() - score < 0) {
                newScore = 0;
                // change score so getTotalScore wont sum up below 0
                score = -(turnplayer.getTotalScore() - score);
            } else {
                newScore = turnplayer.getTotalScore() - score;
            }
            turnplayer.updateScore(this.getTurnPlayer().round + 1, newScore);
        } else {
            // Positive Round
            newScore = this.players[turnplayerIndex].getTotalScore() + score;
            turnplayer.updateScore(this.getTurnPlayer().round + 1, newScore);
        }
        // TODO: Check if turnplayer changes are in players[] or have to be changed
        this.turn = this.turn + 1;
        console.log("MakeMove ", score, turnplayer, this.players);
    }
    /*
    // TODO: diese 3 methoden nutzen statt die eine drüber resultiert in infinite load
    makeMove(score: number) {
        // var newPlayer = new Player(99, "HILFE", "undefined", "alles", "nix");
        var turnplayer = this.getTurnPlayer();
        var turnplayerIndex = this.players.indexOf(turnplayer);
        var newScore: number;
        if (this.turn % 2) {
            // Negative Round
            // Missing all Pins counts as -9
            if (score = 0) score = 9;
            if (this.getTotalScore(turnplayer) - score < 0) {
                newScore = 0;
                // change score so getTotalScore wont sum up below 0
                score = -(this.getTotalScore(turnplayer) - score);
            } else {
                newScore = this.getTotalScore(turnplayer) - score;
            }
            this.updateScore(this.getTurnPlayer().round + 1, newScore, turnplayer);
        } else {
            // Positive Round
            newScore = this.getTotalScore(turnplayer) + score;
            this.updateScore(this.getTurnPlayer().round + 1, newScore, turnplayer);
        }
        // TODO: Check if turnplayer changes are in players[] or have to be changed
        this.turn = this.turn + 1;
        console.log("MakeMove ", score, turnplayer, this.players);
    }

    getTotalScore(player: Player) {
        let totalScore = 0;
        for (let i = 0; player.scores.length; i++) {
            for (let j = 0; player.scores.length; j++) {
                if (i + 1 % 2 !== 0) {
                    totalScore += player.scores[i][j];
                } else {
                    totalScore -= player.scores[i][j];
                    if (totalScore < 0) totalScore = 0;
                }
            }
        }
        return totalScore;
    }

    updateScore(round: number, newCount: number, player: Player) {
        if (round < 8) {
            if (round == player.round) {

                player.round = round;
                player.scores[player.round][1] += newCount;
            } else {
                player.scores[player.round][0] += newCount;
            }
        }
    }
    **/
};
