// module  {"TestBroker"};
<script type="module">
import "mqtt";
import "./MQTTClient";
import { mqttClient } from "./MQTTClient";
// In einer anderen Datei (z.B. kegeln.js)
const { MqttClient, Client } = require("mqtt/*");
// const mqttClient = require("./MQTTClient");

// Beispiel: Spielstand aktualisieren
function updateScore(scoreData) {
  // Implementieren Sie Ihre Logik hier, z.B. Anzeige des aktuellen Spielstands
  console.log("Spielstand aktualisiert:", scoreData);
}

// Beispiel: Simulation einer neuen Punktzahl (ersetzen Sie dies durch Ihre Logik)
function simulateNewScore() {
  const newScore = {
    player: "Spieler 1",
    score: Math.floor(Math.random() * 10) + 1,
  };

  // Nachricht an den MQTT-Broker senden
  mqttClient.publishScore(newScore);
  
}

// Beispiel: Starten der Spielsimulation
setInterval(simulateNewScore, 5000); // Simulation alle 5 Sekunden

</script>