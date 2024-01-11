import React, { useState } from "react";
import Player from '../Player/player'
import PlayerScores from "./player_scores";
import '../../styles/PlayerList.css'
import player from "../Player/player";

const PlayerList: React.FC = () => {

    let playerList= mockPlayerList()


    console.log("TEST")
    return (
        <div className="playerListMain">
            <div className={`playerListContainer`}>
                {playerList.map((player, index) => (
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

function mockPlayerList() {
    let jsonObj = JSON.parse('[{"name": "Dummy1", "gender": "m", "color": "blue", "hair": "brown"},{"name": "Dummy2", "gender": "f", "color": "red", "hair": "black"},{"name": "Dummy3", "gender": "f", "color": "green", "hair": "brown"}]'
    );
    let players_list = new Array<player>()
    for (let i = 0; i < jsonObj.length; i++) {
        players_list.push(new Player(i, jsonObj[i].name, jsonObj[i].gender, jsonObj[i].color, jsonObj[i].hair))
    }
    return players_list
}

export default PlayerList
