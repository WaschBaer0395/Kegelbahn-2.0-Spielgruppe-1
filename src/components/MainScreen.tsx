import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import { GameContext, GameLogicDataProvider } from "../api/GameLogicDataContext";
import React, { useContext, useEffect, useState } from "react";
import MqttHandler from "../api/MqttHandler";
import {Player} from "./Player/player";
const MainScreen = () => {

    const game = useContext(GameContext);
    const [isPlayersReceived, setIsPlayersReceived] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false)

    function convertPlayers(players: Player[]): Player[] {
        const moduleGroups = players.map((player, index): any => {
            return new Player(index, player.name, player.gender, player.color, player.hair);

        });
        return moduleGroups;
    }


    useEffect(() => {
        const mqttHandler = new MqttHandler(['Kegelbahn/Management'], 'Spiel_1_WAITING_FOR_PLAYERS');

        mqttHandler.connectToBroker();
        mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Management') {
                try {
                    const parsePlayers = JSON.parse(message) as Player[];
                    const parsedPlayers = convertPlayers(parsePlayers);

                    // Check if the parsed message contains player objects
                    if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
                        game?.setPlayers(parsedPlayers); // Update player list
                        setIsPlayersReceived(true); // Set flag to indicate players are received
                        setShowPlayers(false);
                        game?.startGame()
                        setHasStarted(true)
                        mqttHandler.closeConnection();
                    }
                } catch (error) {
                    console.error('Error parsing players:', error);
                }
            }
        });
        return () => {
        };
    }, []);

    useEffect(() => {
        const mqttHandler = new MqttHandler(['Kegelbahn/Kegel'], 'Spiel_1_STARTED');  // Create an instance of MqttHandler
        mqttHandler.connectToBroker();
        mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Kegel') {
                //{"sensors":[true,true,true,true,true,true,true,true,true],"rounds_played":1,"total_pins_downed":0,"pins_downed":0}
                try {
                    const jsonObject = JSON.parse(message);
                    const score = jsonObject.pins_downed;
                    game?.makeMove(score)
                } catch (error) {
                    console.error(error);
                }
            }
        });
        return () => {
            mqttHandler.closeConnection();
        };
    }, []);

    useEffect(() => {
    }, [game]);

    useEffect(() => {
        if (isPlayersReceived) {
            setIsPlayersReceived(false);
            setShowPlayers(true);
            console.log(game?.getPlayers);
        }
    }, [isPlayersReceived, game]);


    return (
        <div>
                <div className={`wrapper ${showPlayers ? '' : 'blurred'}`}>
                    <div className="player_list">
                        <PlayerList />
                    </div>
                    <div className="play_field">
                        {hasStarted &&(
                            <PlayField />
                        )}
                    </div>
                    <div className="progress_bar">
                        {/* <DistanceBar /> */}
                    </div>
                </div>
                {!showPlayers && (
                    <div className="overlay">
                        <p>Waiting for players...</p>
                    </div>
                )}
        </div>
    );
};

export default MainScreen;