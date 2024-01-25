import React, { useContext } from "react";
import PlayerScores from "./player_scores";
import '../../styles/PlayerList.css'
import { GameContext } from "../../api/GameLogicDataContext";
import Player from "../Player/player";

interface PlayerListProps {
    pList: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({pList}) => {

    let playerList = pList

    // const [players, setPlayers] = useState<Player[]>([]);
    const { players, setPlayers } = useContext(GameContext);

    return (
        <div className="playerListMain">
            <div className={`playerListContainer`}>
                {playerList.map((player, index) => (
                    <div key={index} className="grid-item">
                        <div className="playerInfo">
                            <div className="playerSprite">{player?.playerIcon}</div>
                            <div className="playerName">{player?.name}</div>
                            <div className="playerScores">
                                <PlayerScores data={player?.scores} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerList
