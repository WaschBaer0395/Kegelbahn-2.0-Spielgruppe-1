import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import DistanceBar from "./Others/DistanceBar";
import {GameContext, GameLogicDataProvider} from "../api/GameLogicDataContext";
import React, {useContext, useEffect, useState} from "react";
import MqttHandler from "../api/MqttHandler";
import Player from "./Player/player";
const MainScreen = () => {

    const { players, setPlayers } = useContext(GameContext);
    const [isPlayersReceived, setIsPlayersReceived] = useState(false);

    useEffect(() => {
        const mqttHandler = new MqttHandler();

        mqttHandler.connectToBroker();
        mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Management') {
                try {
                    const parsedPlayers = JSON.parse(message) as Player[];
                    // Check if the parsed message contains player objects
                    if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
                        console.log(parsedPlayers)
                        setPlayers(parsedPlayers); // Update player list
                        setIsPlayersReceived(true); // Set flag to indicate players are received
                    }
                } catch (error) {
                    console.error('Error parsing players:', error);
                }
            }
        });

        return () => {
            mqttHandler.closeConnection();
        };
    }, []);

    return (
        <GameLogicDataProvider>
            <div className={`wrapper ${isPlayersReceived ? '' : 'blurred'}`}>
                <div className="player_list">
                    <PlayerList />
                </div>
                <div className="play_field">
                    <PlayField />
                </div>
                <div className="progress_bar">
                    <DistanceBar />
                </div>
                <div className="settings_menu">Settings</div>
            </div>
            {!isPlayersReceived && (
                <div className="overlay">
                    <p>Waiting for players...</p>
                </div>
            )}
        </GameLogicDataProvider>
    );
};

export default MainScreen;