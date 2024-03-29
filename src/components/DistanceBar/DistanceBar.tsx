import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../api/GameLogicDataContext';

import '../../styles/DistanceBar.css'

type DistanceBarProps = {}

export default function DistanceBar({ }: DistanceBarProps) {
    const game = useGameContext()
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

    useEffect(() => {
        // Calculate new positions for player pins
        const newPlayerPositions = game.getPlayers().map(player => {
            return (((player.getTotalScore() * game.getMultiplier())) / (game.getMultiplier() * game.getMaxScore()))*100;
        });
    }, [game, updateFlag]);

    return (
        <div className="beam-chart">
            <div className="beam"></div>
            <img src={"src/sprites/finish.png"} className="finish" style={{ right: `${-65}px` }} alt={"finish Flag"}></img>
            {game.getPlayers().map((player, index) => (
                <div key={player.id} className="marker-pin" style={{ left: `${(((player.getTotalScore() * game.getMultiplier())) / (game.getMultiplier() * game.getMaxScore()))*100+1}%`, zIndex: index , transition: `left ${import.meta.env.VITE_ANIMATIONSPEED}s ease`}}>
                    <div className="marker-pin-circle">
                        <img src={player.spriteLoc + "/preview.png"} alt={player.name} className="avatar" />
                    </div>
                </div>
            ))}
            {/*<img src={"src/sprites/start.png"} className="start" style={{ left: `${-25}px` }} alt={"start Flag"}></img>*/}
        </div>
    )
}
