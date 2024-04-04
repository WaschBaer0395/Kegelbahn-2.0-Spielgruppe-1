// MqttComponent.tsx
import React, { useEffect, useState } from 'react'
import MqttHandler from './MqttHandler'

interface MqttComponentProps {
  mqttHandler: MqttHandler
}

// Connects and displays MQTT Messages on Debug Page
const MQTTDebugComponent: React.FC<MqttComponentProps> = ({ mqttHandler }) => {
  const [mqttMessages, setMqttMessages] = useState<string[]>([])

  useEffect(() => {
    mqttHandler.connectToBroker()

    return () => {
      mqttHandler.closeConnection()
    }
  }, [mqttHandler])

  useEffect(() => {
    const handleMessage = (topic: string, message: string) => {
      // Update the state with the received message
      setMqttMessages((prevMessages) => [...prevMessages, message])
    }

    // Subscribe to the 'message' event of the mqttHandler to receive messages
    mqttHandler.onMessage(handleMessage)

    return () => {
      // Unsubscribe from the 'message' event when component unmounts
      mqttHandler.offMessage(handleMessage)
    }
  }, [mqttHandler])

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

export default MQTTDebugComponent
