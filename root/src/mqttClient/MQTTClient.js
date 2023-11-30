// import { Berg_Tal_Fahrt } from "../game/Berg_Tal_Fahrt";
// const Berg_Tal_Fahrt = require("../game/Berg_Tal_Fahrt");
// import { game } from "../game/Berg_Tal_Fahrt";
const game = require("../game/Berg_Tal_Fahrt");
const { Game } = require('../game/Berg_Tal_Fahrt');
// var Game = require("../game/Berg_Tal_Fahrt.js");
const mqtt = require("async-mqtt");
const client = mqtt.connect("mqtt://localhost:4242"); // MQTT-Broker-Host und Port anpassen

const TOPIC = "kegeln/pins";

client.once("error", () => {
  game.game();
  // spiel = new Game();
});

client.on("connect", () => {
  console.log("Verbunden mit dem MQTT-Broker");
  client.subscribe(TOPIC);
  console.log("Subscribed to " + TOPIC.toString());
});

client.on("message", (topic, message) => {
  if (topic === TOPIC) {
    const scoreData = JSON.parse(message);
    console.log("Neue Punktzahl erhalten:", scoreData);
    scoreData.forEach(scoreDataElement => {
      console.log("found: " + scoreDataElement);
    });
    // Anbindung an Gamelogik
    // const game = new Berg_Tal_Fahrt();
    game.printScores();
    game.macheZug(0, 1);
    game.printScores();
  }
});

client.on("error", (errorTopic, errorMessage) => {
  console.error(errorTopic + ": " + errorMessage);
  // const game = new Berg_Tal_Fahrt();
  //  game = new Game()
  // game.game();
  game.printScores();
  game.macheZug(0, 1);
  game.printScores();

})
