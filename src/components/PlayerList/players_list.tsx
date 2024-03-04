import React, {useContext, useEffect, useState} from "react";
import '../../styles/PlayerList.css'
import { GameContext } from "../../api/GameLogicDataContext";
import {Player} from "../Player/player";


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
                    <div key={index} className={`grid-item ${index === game.currentPlayer ? 'current-player' : ''}`}>
                        <div className="playerInfo">
                            <div className="playerSprite">{player?.playerIcon}</div>
                            <div className="playerName">{player?.name}</div>
                            <div className="playerScores">Distance: {player?.getTotalScore()*10}m</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList
