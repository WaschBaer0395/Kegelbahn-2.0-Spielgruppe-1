import React from "react";
import Player from './player'
import PlayerScores from "./player_scores";

interface PlayerListProps {
    players: Player[];
}
const PlayerList: React.FC<PlayerListProps> = ({ players }) => {

    return (
        <div className="grid-container">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={`grid-item ${index < players.length ? 'filled' : ''}`}>
                    <div className="playerInfo">
                        <div className="playerSprite">
                            {players[index]?.sprite}
                        </div>
                        <div className="playerName">{players[index]?.name}</div>
                        <div className="playerScores">
                            <PlayerScores data={players[index]?.scores || []} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PlayerList