import React from 'react';


class  Player {
    name: string
    color: string
    hair: string
    gender: string
    id: number
    round: number
    scores: number[][]
    spriteLoc: string
    playerIcon: JSX.Element

    constructor(id: number, name: string, gender: string, color: string, hair: string) {
        this.id = id;
        this.name = name;
        this.color = color
        this.hair = hair
        this.gender = gender
        this.round = 0
        this.scores = [[9,2],[8,1],[7,4],[9,1],[6,7],[4,2]]
        this.spriteLoc = this.findSprite(this.gender, this.color, this.hair)
        this.playerIcon = this.getPlayerIcon()
        // Initialize other properties as needed
    }

    getPlayerIcon(){
        const previewImagePath = `${this.spriteLoc}/preview.png`;
        return (
            <img src={previewImagePath} alt="Player Icon/Sprite" width={59} height={59}/>
        );
    }

    findSprite(gender: string, color: string, hair: string){

        let availableColors= ['blue', 'green', 'pink', 'red', 'violet', 'yellow']

        // setting gender
        if (gender == 'm') this.gender = 'Male'
        else if(gender == 'f') this.gender = 'Female'
        else this.gender = 'Female'

        // determing player color hair is not used yet!
        if(availableColors.indexOf(color) < 0){
            this.color = 'blue' //default if wrong color was given
        }


        //for testing purposes while not all sprite colors are available
        if( this.gender == 'Male' && this.color != 'red' && this.color != 'yellow'){
            this.gender = 'Male'
            this.color = 'yellow'
        }
        else if( this.gender == 'Female' && this.color != 'blue' && this.color != 'green'){
            this.gender = 'Female'
            this.color = 'green'
        }

        return 'src/sprites/playerSprites/' + this.gender + '/' + this.color
    }


    getTotalScore(){
        let totalScore = 0
        for(let i = 0; this.scores.length;i++) {
            for (let j = 0; this.scores.length; j++) {
                if (i + 1 % 2 !== 0) {
                    totalScore += this.scores[i][j]
                } else {
                    totalScore -= this.scores[i][j]
                    if (totalScore < 0) totalScore = 0
                }
            }
        }
        return totalScore
    }

}
export default Player;