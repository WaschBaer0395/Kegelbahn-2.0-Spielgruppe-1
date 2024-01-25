import PlayerList from "./PlayerList/players_list";
import PlayField from "./Playfield/play_field";
import DistanceBar from "./Others/DistanceBar";
import {GameLogicDataProvider} from "../api/GameLogicDataContext";
import React from "react";
import player from "./Player/player";
import Player from "./Player/player";
const MainScreen = () => {
    return (
        <GameLogicDataProvider>

            <div className="wrapper">
                <div className="player_list">
                    <PlayerList pList={mockPlayerList()} />
                </div>
                <div className="play_field">
                    <PlayField />
                </div>
                <div className="progress_bar">
                    <DistanceBar />
                </div>
                <div className="settings_menu">Settings</div>
            </div>
        </GameLogicDataProvider>
    );
};

function mockPlayerList() {
    let jsonObj = JSON.parse( '[]');

    // '[' +
    // '{"name": "Male_1", "gender": "m", "color": "yellow", "hair": "brown"},' +
    // '{"name": "Female_2", "gender": "f", "color": "blue", "hair": "black"},' +
    // '{"name": "Female_3", "gender": "f", "color": "yellow", "hair": "brown"},' +
    // '{"name": "Male_4", "gender": "m", "color": "red", "hair": "brown"},' +
    // '{"name": "Male_5", "gender": "m", "color": "violet", "hair": "brown"},' +
    // '{"name": "Male_9", "gender": "m", "color": "red", "hair": "brown"},' +
    // '{"name": "Female_6", "gender": "f", "color": "green", "hair": "brown"}' +
    // ']'

    let players_list = new Array<player>()
    for (let i = 0; i < jsonObj.length; i++) {
        players_list.push(new Player(i, jsonObj[i].name, jsonObj[i].gender, jsonObj[i].color, jsonObj[i].hair))
    }
    return players_list
}

export default MainScreen;