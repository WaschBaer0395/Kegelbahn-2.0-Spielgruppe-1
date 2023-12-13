// const { MqttClient } = require("async-mqtt");
// const { Player } = require("../data/Player");

// let Berg_Tal_Fahrt = {

//     // MQTTClient nutzen?

//     //  mqttClient : require(mqttClient),
//     //  players : [ new Player()],
//     players : require("../data/Player"),

//     PrintScores() {
//         players.forEach((player) => {
//             player.PrintScores();
//         })
//     },

//     macheZug(playerIndex, count) {
//         players[playerIndex].geheHoch(count);
//     }
// }

// define([
//     'require',
//     'dependency'
// ], function(require, factory) {
//     'use strict';

// });

// function Game() {
//     this.printIrgendwas = function () {
//         console.log("Irgendwas");
//     }
// };

// MQTTClient nutzen?

//  mqttClient : require(mqttClient),
//  players : [ new Player()],
// playerImport = require("../data/Player");
// // playerImport2 = require("../data/Player");
// // playerImport2.Player("Spieler 2", 1);
// players = [playerImport];
// // game = new Game();;

// exports.game = () => {
//     console.log("ich bin game");
//     // players = [playerImport.Player("Spieler 1"), playerImport.Player("Spieler 2")];
//     // players = [new Player("Spieler 1", 0), new Player("Spieler 2", 1)];
//     players[0].PlayerConstructor("Spieler 3", 0);
// }
// // game.PrintScores = null;

// exports.printScores = () => {
//     players.forEach((player) => {
//         player.printScores();
//     })
// };

// exports.macheZug = (playerIndex, count) => {
//     players[playerIndex].geheHoch(count);
// };

// //  function macheZug(playerIndex, count) {
// //     players[playerIndex].geheHoch(count);
// // };


// // module.exports = {PrintScores, macheZug};
// // exports = {game};
// exports = this;
// export var game;


// class Game {
//     playerList;

//     constructor() {
//         console.log("Starte Spiel");
//         this.playerList = new Array(new Player("Spieler 1", 0), new Player("Spieler 2", 1));
//     }

//     printScores() {
//         players.forEach((player) => {
//             player.printScores();
//         })
//     };

//     macheZug(playerIndex, count) {
//         players[playerIndex].geheHoch(count);
//     };

// }

// exports = this;

// Frontend
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 40842 });


// const mqtt = require('mqtt');
const { players, addPlayer, removePlayer, updateScore } = require('../data/Player');

// const client = mqtt.connect('mqtt://localhost');
// const TOPIC = 'kegelbahn/game';

const player1 = addPlayer('Spieler 1');
const player2 = addPlayer('Spieler 2');
// const players = [];

// Beispiel: Funktion zum Senden einer Punktzahl für einen Spieler
function sendScore(player, score) {
    const scoreData = {
        player: player.name,
        score: score,
    };

    // Nachricht an den MQTT-Broker senden
    //   client.publish(TOPIC, JSON.stringify(scoreData));
}

function macheZug(player, newScore) {
    if (players.includes(player)) {
        updateScore(player, newScore);
    } else {
        console.warn(`Warnung: ${player} nicht gefunden.`);
    }
    updateFrontend("");
}

function printScores() {
    players.forEach((player) => {
        console.log(`${player.name} hat ${player.score}m erreicht.`);
    })
    updateFrontend(players);
}

function updateFrontend(outputData) {
    setTimeout(function(){
        console.log("Update Frontend");
        wss.clients.forEach((client) => {
            client.send(JSON.stringify({ type: 'gameUpdate', data: JSON.stringify(outputData) }));
        });
    }, 10000);
}

module.exports = {
    players,
    sendScore,
    macheZug,
    printScores
};

