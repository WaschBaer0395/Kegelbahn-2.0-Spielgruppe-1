// MqttComponent.tsx
import React, { useEffect, useState } from 'react';
import MqttHandler, { SensorData } from './MqttHandler';

interface MqttComponentProps {
  mqttHandler: MqttHandler;
}

const MqttComponent: React.FC<MqttComponentProps> = ({ mqttHandler }) => {
  const [mqttMessages, setMqttMessages] = useState<string[]>([]);

  useEffect(() => {
    mqttHandler.connectToBroker();

    return () => {
      mqttHandler.closeConnection();
    };
  }, [mqttHandler]);

  const handleSendMessage = (topic: string, message: string) => {
    mqttHandler.sendMessage(topic, message);
  };

  return (
      <div>
        <p>MQTT Messages:</p>
        <ul>
          {mqttMessages.map((message, index) => (
              <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
  );
};

export default MqttComponent;
