class  Player {
    name: string
    id: number
    round: number
    scores: number[]
    spritesheet: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.round = 0
        this.scores = [0,0,0,0,0,0,0,0]
        this.spritesheet = "src/sprites/Riolu Sprite/tile000.png"
        // Initialize other properties as needed
    }
}
export default Player;