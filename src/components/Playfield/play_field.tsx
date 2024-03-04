import React, {useContext, useEffect, useState} from "react";
import MqttHandler from "../../api/MqttHandler";
import {GameContext} from "../../api/GameLogicDataContext";

const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    //CurrentPlayer: {game?.players[game?.currentPlayer].name} CurrentScore: {game?.players[game?.currentPlayer].scores[game?.currentRound-1]}
    return (
        <section className="mqtt-component-section">
            <div>
                <h2>MqttComponent</h2>
                test
            </div>
        </section>
    );
}

export default PlayField