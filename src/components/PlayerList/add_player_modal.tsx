import React, {useState} from "react";
import Player from "../Player/player";


interface PlayerListProps {
    players: Player[]
    addPlayer: (player: Player) => void
    showAddPlayerModal: (value: boolean) => void
}

const AddPlayerModal: React.FC<PlayerListProps> = ({players,addPlayer, showAddPlayerModal}) => {
    const spriteVariants: string[] = ["Riolu", "Wanderer"]
    const [newPlayerName, setNewPlayerName] = useState('')
    const [selectedSprite, setSelectedSprite] = useState<string | null>(null)


    const handleAddPlayer = () => {
        if (newPlayerName.trim() !== '' && selectedSprite) {
            const spriteLoc: string = "src/sprites/playerSprites/" + selectedSprite
            const player = new Player(players.length + 1, newPlayerName, spriteLoc)
            addPlayer(player)
            showAddPlayerModal(false)
            setNewPlayerName('')
            setSelectedSprite(null)
            console.log(player.id)
        }
    }

    const handleSpriteClick = (spriteVariant: string) => {
        setSelectedSprite(spriteVariant === selectedSprite ? null : spriteVariant)
    }

    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddPlayer();
        }
    };

    return (
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
                    onKeyDown={handleEnterKeyPress}
                />
                <button onClick={handleAddPlayer}>Add Player</button>
                <button onClick={() => { showAddPlayerModal(false)}}>Cancel</button>
            </div>
        </div>
    )
}

export default AddPlayerModal