import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import DistanceBar from "./Others/DistanceBar";
import { GameContext, GameLogicDataProvider } from "../api/GameLogicDataContext";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import MqttHandler from "../api/MqttHandler";
import Player from "./Player/player";
const MainScreen = () => {

    const { players, setPlayers, game, setGame } = useContext(GameContext);
    const [isPlayersReceived, setIsPlayersReceived] = useState(false);
    const [showPlayers, setShowPlayers] = useState(false)

    function convertPlayers(players: Player[]): Player[] {
        const playersNew = players.map((player, index): any => {
            var playerNew = new Player(index, player.name, player.gender, player.color, player.hair);
            return {
                id: player.id ? player.id : 0,
                name: player.name,
                color: player.color,
                hair: player.hair,
                gender: player.gender,
                round: player.round ? player.round : 0,
                scores: player.scores ? player.scores : [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                spriteLoc: player.spriteLoc ? player.spriteLoc : playerNew.findSprite(player.gender, player.color, player.hair),
                playerIcon: player.playerIcon ? player.playerIcon : playerNew.getPlayerIcon()
            };

            // playerNew.id = player.id ? player.id : 0;
            // playerNew.name = player.name;
            // playerNew.color = player.color;
            // playerNew.hair = player.hair;
            // playerNew.gender = player.gender;
            // playerNew.round = player.round ? player.round : 0;
            // playerNew.scores = player.scores ? player.scores : [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
            // playerNew.spriteLoc = player.spriteLoc ? player.spriteLoc : playerNew.findSprite(player.gender, player.color, player.hair);
            // playerNew.playerIcon = player.playerIcon ? player.playerIcon : playerNew.getPlayerIcon();
            // return playerNew;
        }
        );
        return playersNew;
    }


    useEffect(() => {
        const mqttHandler = new MqttHandler();

        mqttHandler.connectToBroker();
        mqttHandler.onMessage((topic, message) => {
            if (topic === 'Kegelbahn/Management') {
                try {
                    const parsePlayers = JSON.parse(message) as Player[];
                    const parsedPlayers = convertPlayers(parsePlayers);




                    // Check if the parsed message contains player objects
                    if (Array.isArray(parsedPlayers) && parsedPlayers.length > 0) {
                        //console.log(players)
                        setPlayers(parsedPlayers); // Update player list
                        game.initialize(parsedPlayers);
                        game.makeMove(4);
                        game.makeMove(2);
                        game.makeMove(9);
                        game.makeMove(1);
                        setGame(game);
                        //console.log(players)
                        setIsPlayersReceived(true); // Set flag to indicate players are received
                        //console.log(players);
                        setShowPlayers(false);
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

    useEffect(() => {
        if (isPlayersReceived) {
            //console.log("receive change detected");
            setIsPlayersReceived(false);
            setShowPlayers(true);
            // setPlayers(players);
            console.log(players);
            console.log(game);
            // TODO create game object here, fill list of players in game object with players received, set round to 0, current player to first in list, and make playerlist display the players out of this game objects playerlist
        }
    }, [isPlayersReceived, players]);


    return (
        // <GameLogicDataProvider>
        <>
            <div className={`wrapper ${showPlayers ? '' : 'blurred'}`}>
                <div className="player_list">
                    <PlayerList />
                </div>
                <div className="play_field">
                    <PlayField />
                </div>
                <div className="progress_bar">
                    {/* <DistanceBar /> */}
                </div>
                <div className="settings_menu">Settings</div>
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