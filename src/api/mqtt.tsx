import React, { useEffect, useState } from 'react'
import mqtt from 'mqtt'

const MqttComponent: React.FC = () => {
  const [mqttClient, setMqttClient] = useState<any>(null) // MqttClient type from the mqtt library
  const [mqttMessages, setMqttMessages] = useState<string[]>([])

  const connectToBroker = () => {
    const client = mqtt.connect('mqtt://10.40.72.110:1883') // Replace with your MQTT broker URL
    setMqttClient(client)

    client.on('connect', () => {
      console.log('Connected to MQTT broker')
      client.subscribe('Kegebahn/Pins')
    })

    client.on('message', (topic: string, message: Buffer) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`)
      setMqttMessages((prevMessages) => [...prevMessages, message.toString()])
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

export default MqttComponent
