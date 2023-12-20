// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 40842 });

import { useContext, useState } from "react";
import Player from "../components/Player/player";
import { GameContext, useGameContext } from "./GameLogicDataContext";

// const { players, addPlayer, removePlayer, updateScore } = require('../data/Player');



// const player1 = addPlayer('Spieler 1');
// const player2 = addPlayer('Spieler 2');
// const [players, setPlayers] = useState<Player[]>();
const { players, setPlayers } = useContext(GameContext);

// Beispiel: Funktion zum Senden einer Punktzahl für einen Spieler
// export function sendScore(player: Player, score) {
//     const scoreData = {
//         player: player.name,
//         score: score,
//     };

//     // Nachricht an den MQTT-Broker senden
//     //   client.publish(TOPIC, JSON.stringify(scoreData));
// }

// function updateScore(player:Player, newScore:number) {
//     setPlayers((prevPlayers) =>
//         prevPlayers.map((listPlayer) =>
//         listPlayer.id === player.id ? { ...listPlayer, points: listPlayer.score + newPoints } : player
//       )
//     );
// }

export function makeMove(player: Player, newScore: number) {
    if (players.includes(player)) {
        player.updateScore(player.round, newScore);
    } else {
        console.warn(`Warnung: ${player} nicht gefunden.`);
    }
    // updateFrontend("");
}

export function printScores() {
    players.forEach((player) => {
        console.log(`${player.name} hat ${player.getTotalScore()}m erreicht.`);
    })
    // updateFrontend(players);
}

// function updateFrontend(outputData) {
//     setTimeout(function(){
//         console.log("Update Frontend");
//         wss.clients.forEach((client) => {
//             client.send(JSON.stringify({ type: 'gameUpdate', data: JSON.stringify(outputData) }));
//         });
//     }, 10000);
// }
