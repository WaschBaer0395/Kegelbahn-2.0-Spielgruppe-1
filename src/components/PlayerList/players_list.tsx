import React, { useState } from "react";
import Player from '../Player/player'
import PlayerScores from "./player_scores";
import '../../styles/PlayerList.css'
import AddPlayerModal from "./add_player_modal";


const PlayerList: React.FC = () => {
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)


    const [players, setPlayers] = useState<Player[]>([]);

    const addPlayer = (newPlayer: Player) => {
        setPlayers([...players, newPlayer]);
    };


    return (
        <div className="playerListMain">
            <div className={`playerListContainer`}>
                {players.map((player, index) => (
                    <div key={index} className="grid-item">
                        <div className="playerInfo">
                            <div className="playerSprite">{player?.playerIcon}</div>
                            <div className="playerName">{player?.name}</div>
                            <div className="playerScores">
                                <PlayerScores data={player?.scores || []} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList
