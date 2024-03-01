// PlayerContext.js
import React, { createContext, useContext, useState } from 'react';
import Player from '../components/Player/player';
import { GameLogic } from './GameLogic';

const PlayerListTest: Player[] = []
const GameLogicTest: GameLogic = new GameLogic();

export const GameContext = createContext({
    players: PlayerListTest, setPlayers: (player: React.SetStateAction<Player[]>) => { },
    game: GameLogicTest, setGame: (game: React.SetStateAction<GameLogic>) => { }
});

// @ts-ignore
export const GameLogicDataProvider = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]); // Hier könnte Ihre Spielerliste stehen
    const [game, setGame] = useState<GameLogic>(new GameLogic()); // Hier könnte Ihre Spielerliste stehen

    // const setPlayer = (player: Player) => {
    //     setPlayers([...players, player]);
    // };

    // Weitere Funktionen oder Daten, die Sie teilen möchten

    const contextValue = { players, setPlayers };

    return (
        <GameContext.Provider value={{ players, setPlayers, game, setGame }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};
