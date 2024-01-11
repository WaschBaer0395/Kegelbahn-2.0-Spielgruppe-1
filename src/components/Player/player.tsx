import React from 'react';


class  Player {
    name: string
    color: string
    hair: string
    gender: string
    id: number
    round: number
    scores: number[]
    spriteLoc: string
    playerIcon: JSX.Element

    constructor(id: number, name: string, hair: string, color: string, gender: string) {
        this.id = id;
        this.name = name;
        this.color = color
        this.hair = hair
        this.gender = gender
        this.round = 0
        this.scores = [0,0,0,0,0,0,0,0]
        this.spriteLoc = this.findSprite(this.hair, this.color, this.gender)
        this.playerIcon = this.getPlayerIcon()
        // Initialize other properties as needed
    }

    getPlayerIcon(){
        const previewImagePath = `${this.spriteLoc}/preview.png`;
        console.log(`${this.spriteLoc}/preview.png`)
        return (
            <img src={previewImagePath} alt="Player Icon/Sprite" width={59} height={59}/>
        );
    }

    findSprite(hair: string, color: string, gender: string){

        let availableColors= ['blue', 'green', 'pink', 'red', 'violet', 'yellow']

        // setting gender
        if (gender == 'm') this.gender = 'Male'
        else if(gender == 'f') this.gender = 'Female'
        else this.gender = 'Female'

        // determing player color hair is not used yet!
        if(availableColors.indexOf(color) < 0){
            this.color = 'blue' //default if wrong color was given
        }

        this.gender = "Male"
        this.color = "yellow"

        return 'src/sprites/playerSprites/' + this.gender + '/' + this.color
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