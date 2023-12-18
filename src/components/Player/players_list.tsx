import React from "react";
import Player from './player'
import {Sprite} from "@inlet/react-pixi";
import { Stage } from "@pixi/react";
import PlayerScores from "./player_scores";

interface PlayerListProps {
    players: Player[];
}
const PlayerList: React.FC<PlayerListProps> = ({ players }) => {
    return (
        <div>
            <ul id="PlayerList">
                {players.map((player) => (
                <li key={player.id}>
                    <table className="listContent">
                        <tbody>
                            <tr>
                                <td className="playerSprite">
                                    <Stage
                                        width={59}
                                        height={59}
                                        options={{
                                            backgroundAlpha: 0,
                                        }}
                                        >
                                        <Sprite image={player.spritesheet} />
                                    </Stage>
                                </td>
                                <td className="PlayerName">
                                    {player.name} {/* Render other player info here */}
                                </td>
                                <td className="PlayerScores">
                                    <PlayerScores data={player.scores} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default PlayerList