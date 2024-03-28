import { Player } from "../components/Player/player";

type GameLogicChangeListener = () => void;

export class GameLogic {
    private players: Player[];
    currentPlayer: number
    currentRound: number
    private maxRounds: number
    private gameStarted: boolean
    // even turn = positive round, odd turn = negative round
    turn: number;
    totalThrows: number;
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
        this.totalThrows = 1
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

    nextThrow(){
        if (this.turn % 2) {
            this.turn = 2
            this.players[this.currentPlayer].setTurn(2)
        }
        else {
            this.turn = 1
            this.players[this.currentPlayer].setTurn(1)
            this.currentPlayer += 1
            // check if last player has done their throw, and switch to new round and begin with player 0 again
            if (this.currentPlayer == this.players.length) {
                this.currentPlayer = 0
                this.currentRound += 1
            }
        }
    }

    makeMove(score: number) {
        const currentPlayer: Player = this.players[this.currentPlayer]
        if (this.currentRound <= this.maxRounds) {
            // odd throw = scores are positive
            if (this.turn % 2) {
                currentPlayer.updateScore(this.currentRound, score)
            }
            // even throw = scores are negative
            else {
                currentPlayer.updateScore(this.currentRound, 0 - score)
            }
        }
        else {
            console.log('Game Over')
            this.currentPlayer = 0
            this.currentRound = 1
            this.turn = 1
            this.totalThrows = 1
            this.players.forEach((player) => {
                player.resetScore()
            });
        }
        this.triggerScoreChange();
        // console.log("current Player: ",this.currentPlayer)
        // console.log("current Round: ",this.currentRound)
        // console.log("current RoundTurn: ",this.turn)
        // console.log("current PlayerTurn: ",this.players[this.currentPlayer].turn)
    }
}
