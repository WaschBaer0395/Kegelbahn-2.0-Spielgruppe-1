import React, {useContext, useEffect} from "react";
import '../../styles/PlayerList.css'
import { GameContext } from "../../api/GameLogicDataContext";


const PlayerList: React.FC = () => {

    // const [players, setPlayers] = useState<Player[]>([]);
    const game = useContext(GameContext);

    return (
        <div className="playerListMain">
            <div className={`playerListContainer`}>
                {game.getPlayers().map((player, index) => (
                    <div key={index} className="grid-item">
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
