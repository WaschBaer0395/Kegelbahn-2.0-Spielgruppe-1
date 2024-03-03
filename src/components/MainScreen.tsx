import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import { GameContext, GameLogicDataProvider } from "../api/GameLogicDataContext";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import MqttHandler from "../api/MqttHandler";
import mqtt from "mqtt";
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
                        game.setPlayers(parsedPlayers); // Update player list
                        setIsPlayersReceived(true); // Set flag to indicate players are received
                        setShowPlayers(false);
                        game.startGame()
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
        // No need to do anything here, just the dependency is enough
    }, [game]);

    useEffect(() => {
        if (isPlayersReceived) {
            //console.log("receive change detected");
            setIsPlayersReceived(false);
            setShowPlayers(true);
            // setPlayers(players);
            console.log(game.getPlayers);
            // TODO create game object here, fill list of players in game object with players received, set round to 0, current player to first in list, and make playerlist display the players out of this game objects playerlist
        }
    }, [isPlayersReceived, game]);


    return (
        // <GameLogicDataProvider>
        <>
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
        </>
        // </GameLogicDataProvider>
    );
};

export default MainScreen;