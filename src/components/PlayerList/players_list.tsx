import React, { useContext, useEffect, useState } from "react";
import '../../styles/PlayerList.css'
import { GameContext } from "../../api/GameLogicDataContext";
import { Player } from "../Player/player";


const PlayerList: React.FC = () => {
    const game = useContext(GameContext);
    const [updateFlag, setUpdateFlag] = useState(false);

    useEffect(() => {
        // Subscribe to score changes in GameLogic and trigger re-render
        const unsubscribe = game.subscribeToScoreChanges(() => {
            setUpdateFlag(prevFlag => !prevFlag);
        });

        return () => {
            unsubscribe();
        };
    }, [game]);

    return (
        <div className="playerListMain">
            <div className={`playerListContainer`}>
                {game.getPlayers().map((player, index) => (
                    <div key={index} className={`grid-item ${index === game.currentPlayer ? 'current-player' : ''}`} style={{ borderColor: index === game.currentPlayer && player.turn === 1 ? '#3333cc' : (index === game.currentPlayer && player.turn === 2 ? '#ff5050' : 'black') }}>
                        <div className="playerInfo">
                            <div className="playerSprite">{player?.playerIcon}</div>
                            <div className="playerName">{player?.name}</div>
                            <div className="playerScores">Distanz: {player?.getTotalScore() * 10}m</div>
                            { player.turn == 1 && (
                                <div className="positiveThrow" style={{ visibility: game.currentPlayer == index ? 'visible' : 'hidden' }}>Positiver Wurf!</div>
                            )}
                            { player.turn == 2 && (
                                <div className="negativeThrow">Negativer Wurf!</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList
