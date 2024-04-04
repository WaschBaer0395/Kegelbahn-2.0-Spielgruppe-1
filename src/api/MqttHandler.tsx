// MqttHandler.ts
import mqtt, { MqttClient } from 'mqtt'

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
  private connectionPromise: Promise<void> | null = null // Add a property to hold the connection promise

  constructor(topic_: string[], id_: string) {
    this.topic = topic_
    this.id = id_
  }

  // Connect to MQTT Broker
  // topics 'Kegelbahn/Kegel', 'Kegelbahn/Player', 'Kegelbahn/Management'
  public connectToBroker(): Promise<void> {
    // Return a promise from this method
    this.connectionPromise = new Promise<void>((resolve, reject) => {
      this.mqttClient = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
        clientId: this.id,
      })

      this.mqttClient.once('error', (error) => {
        reject(error) // Reject the promise on error
      })

      this.mqttClient.on('connect', () => {
        console.log('Connected to MQTT broker')
        this.mqttClient!.subscribe(this.topic, (err) => {
          if (err) {
            reject(err) // Reject the promise if subscription fails
          } else {
            resolve() // Resolve the promise on successful connection and subscription
          }
        })
      })
    })

    return this.connectionPromise
  }

  public onMessage(callback: (topic: string, message: string) => void) {
    if (this.mqttClient) {
      this.mqttClient.on('message', (topic, message) => {
        if (this.topic.includes(topic)) {
          callback(topic, message.toString())
        }
      })
    }
  }

  public offMessage(callback: (topic: string, message: string) => void) {
    delete this.messageHandlers['Kegelbahn/Kegel']
    delete this.messageHandlers['Kegelbahn/Player']
    delete this.messageHandlers['Kegelbahn/Management']
  }

  // Sends message to topic per MQTT
  public async sendMessage(topic: string, message: string) {
    if (!this.connectionPromise) {
      console.error(
        'Connection has not been initiated. Call connectToBroker first.',
      )
      return
    }
    try {
      await this.connectionPromise // Wait for the connection to be established
      if (this.mqttClient) {
        this.mqttClient.publish(topic, message)
        console.log(`Message sent to topic ${topic}: ${message}`)
      }
    } catch (error) {
      console.error('Error waiting for MQTT client to connect:', error)
    }
  }

  public closeConnection() {
    if (this.mqttClient) {
      this.mqttClient.end()
    }
  }
}

export default MqttHandler
