import 'Player/player'
import Player from "./Player/player";

class Game {
    player: Player[]
    currentPlayer: number
    currentRound: number
    maxRounds: number

    constructor(_player: Player[]) {
        this.player = _player
        this.currentPlayer = 1
        this.currentRound = 1
        this.maxRounds = 8 // means 8 throws total, 2 throws per person
    }

}

export default Game;