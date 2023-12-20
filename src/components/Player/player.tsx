import React from 'react';
import * as PIXI from 'pixi.js';
import {Sprite, Stage} from "@pixi/react";


class  Player {
    name: string
    id: number
    round: number
    scores: number[]
    spriteLoc: string
    playerIcon: JSX.Element

    constructor(id: number, name: string, _spriteLoc: string) {
        this.id = id;
        this.name = name;
        this.round = 0
        this.scores = [0,0,0,0,0,0,0,0]
        this.spriteLoc = _spriteLoc
        this.playerIcon = this.getPlayerIcon()
        // Initialize other properties as needed
    }

    getPlayerIcon(){
        const previewImagePath = `${this.spriteLoc}/preview.png`;
        return (
            <img src={previewImagePath} alt="Player Icon/Sprite" width={59} height={59}/>
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