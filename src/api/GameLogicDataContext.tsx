// PlayerContext.js
import React, { createContext, useContext, useState } from 'react';
import { GameLogic } from './GameLogic';

const gameLogic: GameLogic = new GameLogic([])

export const GameContext = createContext(gameLogic);

// @ts-ignore
export const GameLogicDataProvider = ({ children }) => {
    //const [players, setPlayers] = useState<Player[]>([]); // Hier könnte Ihre Spielerliste stehen
    const [gameLogic] = useState<GameLogic>(new GameLogic([])); // Hier könnte Ihre Spielerliste stehen

    // const setPlayer = (player: Player) => {
    //     setPlayers([...players, player]);
    // };

    // Weitere Funktionen oder Daten, die Sie teilen möchten

    const contextValue = { gameLogic };

    return (
        <GameContext.Provider value={gameLogic}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};
