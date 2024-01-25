// Debug.tsx
import React from 'react';
import MqttComponent from "../api/mqtt";

const Debug = () => {
    const handleSendPlayerList = () => {
        console.log('Sending player list...');
    };

    const handleEmptyPlayerList = () => {
        console.log('Emptying player list...');
    };

    const handleSensorButtonClick = (sensorNumber) => {
        console.log(`Sensor ${sensorNumber} button clicked`);
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
                <MqttComponent />
            </section>
        </div>
    );
};

export default Debug;