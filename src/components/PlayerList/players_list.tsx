import React, { useState } from "react";
import Player from '../Player/player'
import PlayerScores from "./player_scores";
import '../../styles/PlayerList.css'
import AddPlayerModal from "./add_player_modal";

interface PlayerListProps {
    players: Player[];
    addPlayer: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, addPlayer }) => {
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)


    return (
        <div className="playerListMain">
            <div className={`playerListContainer ${showAddPlayerModal ? 'blurred' : ''}`}>
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
                {players.length < 8 && (
                    <div className="grid-item-button">
                        <button onClick={() => { setShowAddPlayerModal(true)}}>Klick to add a Player</button>
                    </div>
                )}
            </div>
            {showAddPlayerModal && <AddPlayerModal players={players} addPlayer={addPlayer} showAddPlayerModal={setShowAddPlayerModal} />}
        </div>
    )
}

export default PlayerList
