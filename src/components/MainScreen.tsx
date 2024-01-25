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
                    <PlayerList />
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

export default MainScreen;