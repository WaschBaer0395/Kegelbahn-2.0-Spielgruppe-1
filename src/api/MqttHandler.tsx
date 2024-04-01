// MqttHandler.ts
import mqtt, { MqttClient } from 'mqtt'
import { Player } from '../components/Player/player'

export interface SensorData {
  sensors: boolean[]
  rounds_played: number
  total_pins_downed: number
  pins_downed: number
}

class MqttHandler {
  private mqttClient: MqttClient | null = null
  private messageHandlers: {
    [topic: string]: (message: string, s: string) => void
  } = {}
  private readonly topic: string[]
  private readonly id: string

  constructor(topic_: string[], id_: string) {
    this.topic = topic_
    this.id = id_
  }

  // topics 'Kegelbahn/Kegel', 'Kegelbahn/Player', 'Kegelbahn/Management'
  public connectToBroker() {
    this.mqttClient = mqtt.connect('mqtt://localhost:10443', {
      clientId: this.id,
    })
    let playerList: Player[] = []
    this.mqttClient.once('error', () => {
      this.mqttClient!.eventNames()
      console.log(this.mqttClient!.eventNames())
    })

    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker')
      this.mqttClient!.subscribe(this.topic)
    })

    this.mqttClient.on('message', (topic: string, message: Buffer) => {
      const messageHandler = this.messageHandlers[topic]
      if (messageHandler) {
        messageHandler(topic, message.toString())
      }
    })
  }

  public onMessage(callback: (topic: string, message: string) => void) {
    this.messageHandlers['Kegelbahn/Kegel'] = callback
    this.messageHandlers['Kegelbahn/Player'] = callback
    this.messageHandlers['Kegelbahn/Management'] = callback
  }

  public offMessage(callback: (topic: string, message: string) => void) {
    delete this.messageHandlers['Kegelbahn/Kegel']
    delete this.messageHandlers['Kegelbahn/Player']
    delete this.messageHandlers['Kegelbahn/Management']
  }

  public sendMessage(topic: string, message: string) {
    if (this.mqttClient) {
      this.mqttClient.publish(topic, message)
      console.log(`Message sent to topic ${topic}: ${message}`)
    } else {
      console.error('Error: MQTT client not connected')
    }
  }

  private manageData(sensordata: SensorData) {
    // Add your data management logic here
    return true
  }

  public closeConnection() {
    if (this.mqttClient) {
      this.mqttClient.end()
    }
  }
}

export default MqttHandler
