import React, { useState } from "react";
import Player from './player'
import PlayerScores from "./player_scores";
import '../../styles/PlayerList.css'

interface PlayerListProps {
    players: Player[];
    addPlayer: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, addPlayer }) => {
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
    const [newPlayerName, setNewPlayerName] = useState('')
    const [selectedSprite, setSelectedSprite] = useState<string | null>(null)
    const spriteVariants: string[] = ["Riolu", "Wanderer"]

    const handleAddPlayer = () => {
        if (newPlayerName.trim() !== '' && selectedSprite) {
            const spriteLoc: string = "src/sprites/playerSprites/" + selectedSprite
            const player = new Player(players.length + 1, newPlayerName, spriteLoc)
            addPlayer(player)
            console.log(spriteLoc)
            setShowAddPlayerModal(false)
            setNewPlayerName('')
            setSelectedSprite(null)
        }
    }

    const handleSpriteClick = (spriteVariant: string) => {
        setSelectedSprite(spriteVariant === selectedSprite ? null : spriteVariant)
    }

    return (
        <div className="playerListContainer">
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
                <div className="grid-item">
                    <button onClick={() => setShowAddPlayerModal(true)}>+</button>
                </div>
            )}
            {showAddPlayerModal && (
                <div className="modal-container">
                    <div className="addPlayerModal">
                        <div className="sprite-selection">
                            {spriteVariants.map((spriteVariant) => (
                                <div
                                    key={spriteVariant}
                                    className={`sprite-variant ${selectedSprite === spriteVariant ? 'selected' : ''}`}
                                    onClick={() => handleSpriteClick(spriteVariant)}
                                >
                                    <div className="rounded-square">
                                        <img
                                            src={`src/sprites/playerSprites/${spriteVariant}/preview.png`}
                                            alt={`Sprite ${spriteVariant}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter player name"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                        />
                        <button onClick={handleAddPlayer}>Add Player</button>
                        <button onClick={() => setShowAddPlayerModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlayerList
