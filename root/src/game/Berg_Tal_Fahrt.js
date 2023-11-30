const { MqttClient } = require("async-mqtt");
const { Player } = require("../data/Player");

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
playerImport = require("../data/Player");
// playerImport2 = require("../data/Player");
// playerImport2.Player("Spieler 2", 1);
players = [playerImport];
// game = new Game();;

exports.game = () => {
    console.log("ich bin game");
    // players = [playerImport.Player("Spieler 1"), playerImport.Player("Spieler 2")];
    // players = [new Player("Spieler 1", 0), new Player("Spieler 2", 1)];
    players[0].PlayerConstructor("Spieler 3", 0);
}
// game.PrintScores = null;

exports.printScores = () => {
    players.forEach((player) => {
        player.printScores();
    })
};

exports.macheZug = (playerIndex, count) => {
    players[playerIndex].geheHoch(count);
};

//  function macheZug(playerIndex, count) {
//     players[playerIndex].geheHoch(count);
// };


// module.exports = {PrintScores, macheZug};
// exports = {game};
exports = this;
// export var game;


class Game {
    playerList;

    constructor() {
        console.log("Starte Spiel");
        this.playerList = new Array(new Player("Spieler 1", 0), new Player("Spieler 2", 1));
    }

    printScores() {
        players.forEach((player) => {
            player.printScores();
        })
    };

    macheZug(playerIndex, count) {
        players[playerIndex].geheHoch(count);
    };

}

exports = this;
