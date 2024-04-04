import React from 'react'

export class Player {
  name: string = ''
  color: string
  hair: string
  gender: string
  id: number
  turn: number = 1
  scores: number[]
  preview: string
  spriteSheet: string
  playerIcon: JSX.Element

  constructor(
    id: number,
    name: string,
    gender: string,
    color: string,
    hair: string,
  ) {
    this.id = id
    this.name = name
    this.color = color
    this.hair = hair
    this.gender = gender
    this.turn = 1
    this.scores = [0, 0, 0, 0, 0, 0, 0, 0]
    this.preview = this.findSprite(this.gender, this.color, this.hair)
    this.playerIcon = this.getPlayerIcon()
    this.spriteSheet = this.findSpriteSheet()
  }

  getPlayerIcon() {
    const previewImagePath = `${this.preview}/preview.png`
    return (
      <img
        src={previewImagePath}
        alt="Player Icon/Sprite"
        width={96}
        height={96}
      />
    )
  }

  setTurn(_turn: number) {
    this.turn = _turn
  }

  getTurn() {
    return this.turn
  }


  // getting the correct preview sprite for the selected combination of color hair and gender
  // this can be shortened a lot! we left it this big to account for inaccuracies with the management
  // like colors that we do not support
  findSprite(gender: string, color: string, hair: string) {
    let availableColors = ['blue', 'green', 'pink', 'red', 'orange', 'yellow']

    // setting gender
    if (gender == 'm') {
      this.gender = 'Male'
      this.hair = hair
    } else if (gender == 'f') {
      this.gender = 'Female'
      this.hair = hair
    } else {
      this.gender = 'Female'
      this.hair = 'blond'
    }

    //Player color
    if (availableColors.indexOf(color) < 0) {
      this.color = 'blue' //default if wrong color was given
    }

    return (
      'src/sprites/playerSprites/' +
      this.gender +
      '/' +
      this.color +
      '/' +
      this.hair
    )
  }
  // same like above just easier to get the spritesheet needed
  findSpriteSheet() {
    return (
      'src/sprites/playerSprites/' +
      this.gender +
      '/' +
      this.color +
      '/' +
      this.hair +
      '/spritesheet.png'
    )
  }

  public updateScore(currentRound: number, score: number): void {
    this.scores[currentRound - 1] += score
    if (this.scores[currentRound - 1] < 0) this.scores[currentRound - 1] = 0
  }

  public resetScore(): void {
    this.scores = [0, 0, 0, 0, 0, 0, 0, 0]
  }

  getTotalScore() {
    let total = 0
    this.scores.forEach((score) => {
      total += score
    })
    return total
  }
}
