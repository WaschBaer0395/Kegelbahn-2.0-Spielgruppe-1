import React, {useContext, useEffect, useState} from "react";
import MqttHandler from "../../api/MqttHandler";
import {GameContext} from "../../api/GameLogicDataContext";

const PlayField: React.FC = () => {
    const game = useContext(GameContext);
    return (
        <section className="mqtt-component-section">
        </section>
    );
}

export default PlayField