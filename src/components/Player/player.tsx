import {Sprite} from "@inlet/react-pixi";
import {Stage} from "@pixi/react";
import React from "react";

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
        this.spritesheet = "src/sprites/Riolu Sprite/tile000.png"
        this.sprite = this.getSprite()
        // Initialize other properties as needed
    }

    getSprite() {
        return (
            <Stage width={59} height={59} options={{ backgroundAlpha: 0 }}>
                <Sprite image={this.spritesheet} />
            </Stage>
        );
    };

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