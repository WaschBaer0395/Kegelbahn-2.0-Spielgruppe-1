import { Player } from '../components/Player/player'

type GameLogicChangeListener = () => void

export class GameLogic {
  players: Player[]
  currentPlayer: number
  currentRound: number
  maxRounds: number
  gameStarted: boolean
  // even turn = positive round, odd turn = negative round
  turn: number
  totalThrows: number
  gameLogicChangeListener: GameLogicChangeListener[]
  multiplier = 10
  maxScore: number
  gameOver: boolean

  constructor(players_: Player[]) {
    this.players = players_
    this.gameStarted = false
    this.turn = 1
    this.currentPlayer = 0
    this.currentRound = 1
    this.maxRounds = 8 // means 8 throws total, 2 throws per person
    this.gameLogicChangeListener = []
    this.maxScore = this.maxRounds * 8
    this.totalThrows = 1
    this.gameOver = false
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

  getMultiplier() {
    return this.multiplier
  }

  getMaxScore() {
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
  subscribeToChanges(listener: GameLogicChangeListener) {
    this.gameLogicChangeListener.push(listener)

    // Return a function to unsubscribe from score changes
    return () => {
      this.gameLogicChangeListener = this.gameLogicChangeListener.filter(
        (l) => l !== listener,
      )
    }
  }

  // Method to trigger score change events
  triggerChange() {
    this.gameLogicChangeListener.forEach((listener) => listener())
  }

  nextThrow() {
    if (this.turn % 2) {
      this.turn = 2
      this.players[this.currentPlayer].setTurn(2)
    } else {
      this.turn = 1
      this.players[this.currentPlayer].setTurn(1)
      this.currentPlayer += 1

      // check if last player has done their throw, and switch to new round and begin with player 0 again
      if (this.currentPlayer == this.players.length) {
        if (this.currentRound == this.maxRounds) {
          this.resetGame()
        } else {
          this.currentPlayer = 0
          this.currentRound += 1
        }
      }
    }
  }

  makeMove(score: number) {
    const currentPlayer: Player = this.players[this.currentPlayer]
    // odd throw = scores are positive
    if (this.turn % 2) {
      currentPlayer.updateScore(this.currentRound, score)
    }
    // even throw = scores are negative
    else {
      if(score == 0)currentPlayer.updateScore(this.currentRound, 0 - 9)
      else currentPlayer.updateScore(this.currentRound, 0 - score)
    }
    this.triggerChange()
  }

  sortPlayers() {
    return this.players.sort((a, b) => b.getTotalScore() - a.getTotalScore())
  }

  playerStandingFormated() {
    return this.sortPlayers().map((player, index) => ({
      name: player.name,
      platzierung: index + 1,
    }))
  }

  // Convert to JSON string
  convertToJSONString() {
    return JSON.stringify(this.playerStandingFormated(), null, 2) // Pretty print JSON
  }

  // Combine all steps to get the final JSON
  calculateScoreTable() {
    return this.convertToJSONString()
  }

  isGameOver() {
    return this.gameOver
  }

  resetGame() {
    this.turn = 1
    this.currentPlayer = 0
    this.currentRound = 1
    this.maxRounds = 1 // means 8 throws total, 2 throws per person
    this.totalThrows = 1
    this.gameOver = true
    this.gameStarted = false
    this.triggerChange()
  }
}
