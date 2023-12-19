import React from 'react';
import {AnimatedSprite, Stage} from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';


class  Player {
    name: string
    id: number
    round: number
    scores: number[]
    spritesheet: string
    sprite: JSX.Element

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.round = 0
        this.scores = [4,5,2,4,5,0,2,1]
        this.spritesheet = "src/sprites/Riolu Sprite/ezgif.com-gif-to-sprite-converted.json"
        this.sprite = this.drawSprite()
        // Initialize other properties as needed
    }

    drawSprite(){
        // Assuming 'path/to/spritesheet.json' is your sprite sheet file
        const spriteSheetTextures = Array.from({ length: 9 }, (_, i) => {
            return PIXI.Texture.from(`src/sprites/Riolu Sprite/tile00${i}.png`); // Adjust the path and file naming convention
        });

        return (
            <Stage width={59} height={59} options={{ backgroundAlpha: 0 }}>
                <AnimatedSprite textures={spriteSheetTextures} animationSpeed={0.2} loop={true}  isPlaying/>
            </Stage>
        );
    }


    getTotalScore(){
        let totalScore = 0
        for(let i = 0; this.scores.length;i++){
            if(i+1 % 2 !== 0){
                totalScore += this.scores[i]
            }
            else{
                totalScore -= this.scores[i]
                if(totalScore <0) totalScore = 0
            }
        }
        return totalScore
    }

}
export default Player;