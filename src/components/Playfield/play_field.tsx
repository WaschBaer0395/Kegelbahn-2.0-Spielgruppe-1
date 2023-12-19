import React from "react";
import {Stage} from "@inlet/react-pixi";


const PlayField: React.FC = () => {


    return (
        <Stage
            width={300}
            height={300}
            options={{
                backgroundAlpha: 1,
                antialias: true
            }}>

        </Stage>
    )
}

export default PlayField