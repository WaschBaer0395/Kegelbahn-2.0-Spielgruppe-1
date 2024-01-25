// Debug.tsx
import React from 'react';
import MqttComponent from "../api/MqttComponent";  // Import the component
import MqttHandler from "../api/MqttHandler";  // Import the handler
import player from "./Player/player";
import Player from "./Player/player";

const Debug = () => {
    const mqttHandler = new MqttHandler();  // Create an instance of MqttHandler

    const handleSendPlayerList = () => {
        const jsonString =
            '[' +
            '{"name": "Male_1", "gender": "m", "color": "yellow", "hair": "brown"},' +
            '{"name": "Female_2", "gender": "f", "color": "blue", "hair": "black"},' +
            '{"name": "Female_3", "gender": "f", "color": "yellow", "hair": "brown"},' +
            '{"name": "Male_4", "gender": "m", "color": "red", "hair": "brown"},' +
            '{"name": "Male_5", "gender": "m", "color": "violet", "hair": "brown"},' +
            '{"name": "Male_9", "gender": "m", "color": "red", "hair": "brown"},' +
            '{"name": "Female_6", "gender": "f", "color": "green", "hair": "brown"}' +
            ']'
        console.log('Sending list: {}', jsonString);
        mqttHandler.sendMessage('Kegelbahn/Management', jsonString);
    };

    const handleEmptyPlayerList = () => {
        console.log('Emptying player list...');
    };

    const handleSensorButtonClick = (sensorNumber: number) => {
        let sensorString = ''

        if(sensorNumber == 1){
            sensorString = '{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}'
        }
        else if (sensorNumber == 2){
            sensorString = '{"sensors":[true,false,true,true,false,true,true,true,true],"rounds_played":2,"total_pins_downed":0,"pins_downed":0}'
        }
        else if (sensorNumber == 3){
            sensorString = '{"sensors":[false,true,true,false,true,true,true,true,false],"rounds_played":3,"total_pins_downed":0,"pins_downed":0}'
        }
        else if (sensorNumber == 4){
            sensorString = '{"sensors":[true,true,false,false,false,false,false,true,false],"rounds_played":4,"total_pins_downed":0,"pins_downed":0}'
        }
        console.log("sending string: {}", sensorString)

        mqttHandler.sendMessage('Kegelbahn/SensorTopic', sensorString);
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
                {[1, 2, 3, 4].map((sensorNumber) => (
                    <button key={sensorNumber} onClick={() => handleSensorButtonClick(sensorNumber)}>
                        {sensorNumber}
                    </button>
                ))}
            </section>

            <section className="mqtt-component-section">
                <h2>MqttComponent</h2>
                <MqttComponent mqttHandler={mqttHandler} />  {/* Pass the handler as a prop */}
            </section>
        </div>
    );
};

function mockPlayerList() {
    let jsonObj = JSON.parse('[]');

    let players_list = new Array<player>()
    for (let i = 0; i < jsonObj.length; i++) {
        players_list.push(new Player(i, jsonObj[i].name, jsonObj[i].gender, jsonObj[i].color, jsonObj[i].hair))
    }
    return players_list
}

export default Debug;
