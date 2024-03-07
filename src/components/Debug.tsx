// Debug.tsx
import React from 'react';
import MQTTDebugComponent from "../api/MQTTDebugComponent";  // Import the component
import MqttHandler from "../api/MqttHandler";

const Debug = () => {
    const mqttHandler = new MqttHandler(['Kegelbahn/Management', 'Kegelbahn/Kegel'],'Debugg_Page');  // Create an instance of MqttHandler

    const handleSendPlayerList = () => {
        const jsonString =
            '[' +
            '{"name": "Male_1", "gender": "m", "color": "yellow", "hair": "blond"},' +
            '{"name": "Female_2", "gender": "f", "color": "blue", "hair": "black"},' +
            '{"name": "Female_3", "gender": "f", "color": "yellow", "hair": "brown"},' +
            '{"name": "Male_4", "gender": "m", "color": "red", "hair": "brown"},' +
            '{"name": "Male_5", "gender": "m", "color": "violet", "hair": "black"},' +
            '{"name": "Male_6", "gender": "m", "color": "red", "hair": "brown"},' +
            '{"name": "Male_7", "gender": "m", "color": "green", "hair": "black"},' +
            '{"name": "Female_8", "gender": "f", "color": "green", "hair": "brown"}' +
            ']'
        mqttHandler.sendMessage('Kegelbahn/Management', jsonString);
    };

    const handleEmptyPlayerList = () => {
        console.log('Emptying player list...');
    };

    const handleSensorButtonClick = (sensorNumber: string) => {
        let sensorString = ''

        if(sensorNumber == '0 pins'){
            sensorString = '{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}'
        }
        else if (sensorNumber == '2 pins'){
            sensorString = '{"sensors":[true,false,true,true,false,true,true,true,true],"rounds_played":2,"total_pins_downed":0,"pins_downed":2}'
        }
        else if (sensorNumber == '5 pins'){
            sensorString = '{"sensors":[false,true,false,false,true,false,true,true,false],"rounds_played":3,"total_pins_downed":0,"pins_downed":5}'
        }
        else if (sensorNumber == '9 pins'){
            sensorString = '{"sensors":[false,false,false,false,false,false,false,false,false],"rounds_played":4,"total_pins_downed":0,"pins_downed":9}'
        }
        mqttHandler.sendMessage('Kegelbahn/Kegel', sensorString);
    };

    return (
        <div className="debug-container">
            <h1>Debug Menu!</h1>

            <section className="playerlist-section">
                <h2>PlayerList</h2>
                <button onClick={handleSendPlayerList}>Send PlayerList</button>
                <button onClick={handleEmptyPlayerList}>Empty PlayerList</button>
            </section>

            <section className="sensordata-section">
                <h2>SensorData</h2>
                {['0 pins', '2 pins', '5 pins', '9 pins'].map((sensorNumber) => (
                    <button key={sensorNumber} onClick={() => handleSensorButtonClick(sensorNumber)}>
                        {sensorNumber}
                    </button>
                ))}
            </section>

            <section className="mqtt-component-section">
                <h2>MqttComponent</h2>
                <MQTTDebugComponent mqttHandler={mqttHandler} />  {/* Pass the handler as a prop */}
            </section>
        </div>
    );
};

export default Debug;
