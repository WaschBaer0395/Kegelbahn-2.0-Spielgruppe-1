// Debug.tsx
import React from 'react'
import MQTTDebugComponent from '../api/MQTTDebugComponent' // Import the component
import MqttHandler from '../api/MqttHandler'

const Debug = () => {
  const mqttHandler = new MqttHandler(
    ['Kegelbahn/Management', 'Kegelbahn/Kegel'],
    'Debugg_Page',
  ) // Create an instance of MqttHandler

  const handleSendPlayerList = () => {
    const jsonString =
      '[' +
      '{"name": "Hans", "gender": "m", "color": "blue", "hair": "blond"},' +
      '{"name": "Sabrine", "gender": "f", "color": "green", "hair": "black"},' +
      '{"name": "Franziska", "gender": "f", "color": "yellow", "hair": "brown"},' +
      '{"name": "Jörg", "gender": "m", "color": "green", "hair": "brown"},' +
      '{"name": "Philipp", "gender": "m", "color": "orange", "hair": "black"},' +
      '{"name": "Olaf", "gender": "m", "color": "red", "hair": "brown"},' +
      '{"name": "Manuel", "gender": "m", "color": "yellow", "hair": "black"},' +
      '{"name": "Lea", "gender": "f", "color": "green", "hair": "brown"}' +
      ']'
    mqttHandler.sendMessage('Kegelbahn/Management', jsonString)
  }

  const handleSendPlayerListSingle = () => {
    const jsonString =
      '[' +
      '{"name": "Sabrine", "gender": "f", "color": "red", "hair": "brown"}' +
      ']'
    mqttHandler.sendMessage('Kegelbahn/Management', jsonString)
  }

  const handleEmptyPlayerList = () => {
    console.log('Emptying player list...')
  }

  const handleSensorButtonClick = (sensorNumber: string) => {
    let sensorString = ''

    if (sensorNumber == '0') {
      sensorString =
        '{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}'
    } else if (sensorNumber == '1') {
      sensorString =
        '{"sensors":[true,true,true,true,true,true,true,true,false],"rounds_played":2,"total_pins_downed":0,"pins_downed":1}'
    } else if (sensorNumber == '2') {
      sensorString =
        '{"sensors":[true,true,true,true,true,true,true,false,false],"rounds_played":3,"total_pins_downed":0,"pins_downed":2}'
    } else if (sensorNumber == '3') {
      sensorString =
        '{"sensors":[true,true,true,true,true,true,false,false,false],"rounds_played":4,"total_pins_downed":0,"pins_downed":3}'
    } else if (sensorNumber == '4') {
      sensorString =
        '{"sensors":[true,true,true,true,true,false,false,false,false],"rounds_played":5,"total_pins_downed":0,"pins_downed":4}'
    } else if (sensorNumber == '5') {
      sensorString =
        '{"sensors":[true,true,true,true,false,false,false,false,false],"rounds_played":6,"total_pins_downed":0,"pins_downed":5}'
    } else if (sensorNumber == '6') {
      sensorString =
        '{"sensors":[true,true,true,false,false,false,false,false,false],"rounds_played":7,"total_pins_downed":0,"pins_downed":6}'
    } else if (sensorNumber == '7') {
      sensorString =
        '{"sensors":[true,true,false,false,false,false,false,false,false],"rounds_played":8,"total_pins_downed":0,"pins_downed":7}'
    } else if (sensorNumber == '8') {
      sensorString =
        '{"sensors":[true,false,false,false,false,false,false,false,false],"rounds_played":9,"total_pins_downed":0,"pins_downed":8}'
    } else if (sensorNumber == '9') {
      sensorString =
        '{"sensors":[false,false,false,false,false,false,false,false,false],"rounds_played":10,"total_pins_downed":0,"pins_downed":9}'
    }
    mqttHandler.sendMessage('Kegelbahn/Kegel', sensorString)
  }

  return (
    <div className="debug-container">
      <h1>Debug Menu!</h1>

      <section className="playerlist-section">
        <h2>PlayerList</h2>
        <h4>Send mocked list of players, or empty the current Playerlist</h4>
        <button onClick={handleSendPlayerList}>Send Full House</button>
        <button onClick={handleSendPlayerListSingle}>Send One Player</button>
        <button onClick={handleEmptyPlayerList}>Empty PlayerList</button>
      </section>

      <section className="sensordata-section">
        <h2>Throw Pins</h2>
        <h4>
          Manually select how many pins have been downed by pressing the
          correspodning button
        </h4>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
          (sensorNumber) => (
            <button
              key={sensorNumber}
              onClick={() => handleSensorButtonClick(sensorNumber)}
            >
              {sensorNumber}
            </button>
          ),
        )}
      </section>

      <section className="mqtt-component-section">
        <h2>MQTT Debug Output</h2>
        <MQTTDebugComponent mqttHandler={mqttHandler} />{' '}
        {/* Pass the handler as a prop */}
      </section>
    </div>
  )
}

export default Debug
