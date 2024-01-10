import React, { useEffect, useState } from 'react'
import mqtt, { MqttClient } from 'mqtt'
import Game from "../components/Game";

// {
// 	"sensors":[false,false,true,true,true,true,true,false,false],
// 	"rounds_played":1,
// 	"total_pins_downed":4,
// 	"pins_downed":4
// }
export interface SensorData {
  sensors: boolean[];
  rounds_played: number;
  total_pins_downed: number;
  pins_downed: number;
}

const MqttComponent: React.FC = () => {
  const [mqttClient, setMqttClient] = useState<MqttClient>() // MqttClient type from the mqtt library
  const [mqttMessages, setMqttMessages] = useState<string[]>([])

  const connectToBroker = () => {
    const client = mqtt.connect("mqtt://localhost:10443") // Replace with your MQTT broker URL
    setMqttClient(client)

    client.once("error", () => {
      client.eventNames();
      console.log(client.eventNames());

    })

    client.on('connect', () => {
      console.log('Connected to MQTT broker')
      client.subscribe('Kegelbahn/Kegel')
    })

    client.on('message', (topic: string, message: Buffer) => {
      // parsing the json data received into the interface SensorData for later use
      let jsonObj = JSON.parse(message.toString());
      if (manageData(jsonObj as SensorData)) {
        console.log(`Received message on topic ${topic}: ${message.toString()}`)
        setMqttMessages((prevMessages) => [...prevMessages, message.toString()])
      }
      else {
        console.log(`error Data malformed`)
      }
    })

    client.on('error', (err: Error) => {
      console.error('Error connecting to MQTT broker:', err)
    })
  }

  useEffect(() => {
    connectToBroker()

    // Cleanup on component unmount
    return () => {
      if (mqttClient) {
        mqttClient.end()
      }
    }
  }, []) // Run this effect only once on component mount

  return (
    <div>
      <p>MQTT Messages:</p>
      <ul>
        {mqttMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}

const manageData = (sensordata: SensorData) => {
  //game = new Game(players)

  return true
}

export default MqttComponent
