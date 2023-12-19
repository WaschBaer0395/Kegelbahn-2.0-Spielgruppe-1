import React from "react";
import {Sprite, Stage} from "@inlet/react-pixi";
import background from "../../sprites/Background/background_static.png";

const PlayField: React.FC = () => {

    return (
        <Stage className="playField" options={{backgroundAlpha: 1, antialias: true,}}>
            <Sprite image={background} />
        </Stage>
    );
}

export default PlayField