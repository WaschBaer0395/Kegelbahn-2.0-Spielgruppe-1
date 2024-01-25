// MqttHandler.ts
import mqtt, { MqttClient } from 'mqtt';

export interface SensorData {
    sensors: boolean[];
    rounds_played: number;
    total_pins_downed: number;
    pins_downed: number;
}

class MqttHandler {
    private mqttClient: MqttClient | null = null;

    public connectToBroker() {
        this.mqttClient = mqtt.connect("mqtt://localhost:10443");

        this.mqttClient.once("error", () => {
            this.mqttClient!.eventNames();
            console.log(this.mqttClient!.eventNames());
        });

        this.mqttClient.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.mqttClient!.subscribe(['Kegelbahn/Kegel', 'Kegelbahn/Player', 'Kegelbahn/Management']);
        });

        this.mqttClient.on('message', (topic: string, message: Buffer) => {
            let jsonObj = JSON.parse(message.toString());
            if (this.manageData(jsonObj as SensorData)) {
                console.log(`Received message on topic ${topic}: ${message.toString()}`);
            } else {
                console.log(`Error: Data malformed`);
            }
        });

        this.mqttClient.on('error', (err: Error) => {
            console.error('Error connecting to MQTT broker:', err);
        });
    }

    public sendMessage(topic: string, message: string) {
        if (this.mqttClient) {
            this.mqttClient.publish(topic, message);
            console.log(`Message sent to topic ${topic}: ${message}`);
        } else {
            console.error('Error: MQTT client not connected');
        }
    }

    private manageData(sensordata: SensorData) {
        // Add your data management logic here
        return true;
    }

    public closeConnection() {
        if (this.mqttClient) {
            this.mqttClient.end();
        }
    }
}

export default MqttHandler;
