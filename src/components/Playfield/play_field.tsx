import React, {useContext, useEffect, useState} from "react";
import MqttHandler from "../../api/MqttHandler";
import {GameContext} from "../../api/GameLogicDataContext";

const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    const [currentPlayerName, setCurrentPlayerName] = useState(game.players[game.currentPlayer].name);
    const [currentPlayerScore, setCurrentPlayerScore] = useState(game.currentPlayer);

    //const [playerScore, setPlayerScore] = useState<string>('');

    useEffect(() => {
        const mqttHandler = new MqttHandler(['Kegelbahn/Kegel'], 'Spiel_1_STARTED');  // Create an instance of MqttHandler
        mqttHandler.connectToBroker();
        mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Kegel') {
                //{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}
                try {
                    const jsonObject = JSON.parse(message);
                    const score = jsonObject.pins_downed;
                    game.makeMove(score)
                    setCurrentPlayerName(game.players[game.currentPlayer].name)
                    setCurrentPlayerScore(game.players[game.currentPlayer].scores[game.currentRound-1])
                    //console.log(`Current player is: ${game.currentPlayer}`)
                    //console.log(`Current player Score is: ${game.players[game.currentPlayer].scores[game.currentRound-1]}`)
                } catch (error) {
                    console.error(error);
                }
            }
        });
        return () => {
            mqttHandler.closeConnection();
        };
    }, [currentPlayerName, currentPlayerScore]);

    //                <MQTTDebugComponent mqttHandler={mqttHandler} />  {/* Pass the handler as a prop */}
    return (
        <section className="mqtt-component-section">
            <div>
                <h2>MqttComponent</h2>
                CurrentPlayer: {currentPlayerName} CurrentScore: {currentPlayerScore}
            </div>
        </section>
    );
}

export default PlayField