// PlayerContext.js
import React, {createContext, useContext, useMemo, useState} from 'react';
import { GameLogic } from './GameLogic';

const gameLogicInstance: GameLogic = new GameLogic([]);

export const GameContext = createContext(gameLogicInstance);

// @ts-ignore
export const GameLogicDataProvider = ({ children }) => {
    const gameLogic = useMemo(() => gameLogicInstance, []); // Initialize once

    return (
        <GameContext.Provider value={gameLogic}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};
