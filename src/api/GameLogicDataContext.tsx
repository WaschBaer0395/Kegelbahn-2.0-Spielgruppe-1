// PlayerContext.js
import React, { createContext, useContext, useState } from 'react';
import Player from '../components/Player/player';

const PlayerListTest: Player[] = []

export const GameContext = createContext({ players: PlayerListTest, setPlayers: (player: React.SetStateAction<Player[]>) => { } });

export const GameLogicDataProvider = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]); // Hier könnte Ihre Spielerliste stehen

    // const setPlayer = (player: Player) => {
    //     setPlayers([...players, player]);
    // };

    // Weitere Funktionen oder Daten, die Sie teilen möchten

    const contextValue = { players, setPlayers };

    return (
        <GameContext.Provider value={{ players, setPlayers }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};
