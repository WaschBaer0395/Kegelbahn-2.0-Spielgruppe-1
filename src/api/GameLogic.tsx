import { Player } from "../components/Player/player";

type GameLogicChangeListener = () => void;

export class GameLogic {
    private players: Player[];
    currentPlayer: number
    currentRound: number
    private maxRounds: number
    private gameStarted: boolean
    // even turn = positive round, odd turn = negative round
    private turn: number;
    gameLogicChangeListener: GameLogicChangeListener[];
    private multiplier = 10
    private maxScore: number

    constructor(players_: Player[]) {
        this.players = players_;
        this.gameStarted = false;
        this.turn = 1;
        this.currentPlayer = 0
        this.currentRound = 1
        this.maxRounds = 8 // means 8 throws total, 2 throws per person
        this.gameLogicChangeListener = [];
        this.maxScore = this.maxRounds*9
    }

    setPlayers(players_: Player[]) {
        this.players = players_
    }

    getPlayers() {
        return this.players
    }

    startGame() {
        this.gameStarted = true
        //console.log('startGame: ' + this.gameStarted)
    }

    getMultiplier(){
        return this.multiplier
    }

    getMaxScore(){
        return this.maxScore
    }
    stopGame() {
        this.gameStarted = false
        //console.log('stopGame: ' + this.gameStarted)
    }

    hasStarted() {
        //console.log('hasStarted: ' + this.gameStarted)
        return this.gameStarted
    }

    // Method to subscribe to score change events
    subscribeToScoreChanges(listener: GameLogicChangeListener) {
        this.gameLogicChangeListener.push(listener);

        // Return a function to unsubscribe from score changes
        return () => {
            this.gameLogicChangeListener = this.gameLogicChangeListener.filter(l => l !== listener);
        };
    }

    // Method to trigger score change events
    triggerScoreChange() {
        this.gameLogicChangeListener.forEach(listener => listener());
    }

    makeMove(score: number) {
        const currentPlayer: Player = this.players[this.currentPlayer]
        if (this.currentRound <= this.maxRounds) {
            // odd throw = scores are positive
            if (this.turn % 2) {
                currentPlayer.updateScore(this.currentRound, 2, score)
                this.turn = 2

                // console.log('Positiv: ', currentPlayer, currentPlayer.getTotalScore());
                // console.log('----------');
            }
            // even throw = scores are negative
            else {
                // if (score == 0) {
                //     // missing all pins counts as -10
                //     score = 10;
                // }
                currentPlayer.updateScore(this.currentRound,1,  0 - score)
                this.currentPlayer += 1
                this.turn = 1


                // check if last player has done their throw, and switch to new round and begin with player 0 again
                if (this.currentPlayer == this.players.length) {
                    this.currentPlayer = 0
                    this.currentRound += 1
                    console.log(this.players);
                }

                // console.log('Negativ: ', currentPlayer, currentPlayer.getTotalScore());
                // console.log('Next: ', this.players[this.currentPlayer]);
                // console.log('----------');
            }
        }
        else {
            console.log('Game Over')
            this.currentPlayer = 0
            this.currentRound = 1
            this.turn = 1
            this.players.forEach((player) => {
                player.resetScore()
            });
        }
        this.triggerScoreChange();
    }
}
