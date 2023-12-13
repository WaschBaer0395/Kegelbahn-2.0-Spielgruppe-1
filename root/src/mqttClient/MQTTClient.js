// import { Berg_Tal_Fahrt } from "../game/Berg_Tal_Fahrt";
// const Berg_Tal_Fahrt = require("../game/Berg_Tal_Fahrt");
// import { game } from "../game/Berg_Tal_Fahrt";
// const game = require("../game/Berg_Tal_Fahrt");
// const { Game } = require('../game/Berg_Tal_Fahrt');
// var Game = require("../game/Berg_Tal_Fahrt.js");
const { macheZug, printScores, sendScore, players } = require('../game/Berg_Tal_Fahrt');
const mqtt = require("async-mqtt");
const client = mqtt.connect("mqtt://localhost:1883"); // MQTT-Broker-Host und Port anpassen

const TOPICIncoming = "Kegelbahn/Bahn";
const TOPICOutgoing = "Kegelbahn/Game";

client.once("error", () => {
  // game.game();
  // spiel = new Game();
});

client.on("connect", () => {
  console.log("Verbunden mit dem MQTT-Broker");
  client.subscribe(TOPICIncoming);
  console.log("Subscribed to " + TOPICIncoming.toString());
  client.publish("Kegelbahn/Bahn", JSON.stringify({"sensors":[false,false,true,true,true,true,true,false,false],"rounds_played":1,"total_pins_downed":4,"pins_downed":4}));
});

client.on("message", (topic, message) => {
  if (topic === TOPICIncoming) {
    const scoreData = JSON.parse(message);
    console.log("Neue Punktzahl erhalten:", scoreData);
    // scoreData.forEach(scoreDataElement => {
    //   console.log("found: " + scoreDataElement);
    // });
    // Anbindung an Gamelogik
    // const game = new Berg_Tal_Fahrt();
    // game.printScores();
    // game.macheZug(0, 1);
    // game.printScores();
    printScores();
    macheZug(players[0], 1);
    macheZug(players[1], 2);
    printScores();
  }
});

client.once("message", (topic, message) => {
  if (topic === TOPICIncoming) {
    const sendData = JSON.stringify({ topicSend: "test", valueSend: "test 2" });
    client.publish(TOPICOutgoing, sendData);
  }
})

client.on("error", (errorTopic, errorMessage) => {
  console.error(errorTopic + ": " + errorMessage);
  // const game = new Berg_Tal_Fahrt();
  //  game = new Game()
  // game.game();
  // game.printScores();
  // game.macheZug(0, 1);
  // game.printScores();
  printScores();
  macheZug(players[0], 1);
  macheZug(players[1], 2);
  printScores();
});
