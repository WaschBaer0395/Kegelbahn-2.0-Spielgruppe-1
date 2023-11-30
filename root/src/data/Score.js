var score = 0;

this.ScoreConstructor = () => {
    score = 0 * 1;
    console.log("SCORE");
}

this.updateScore = (count) => {
    score += count;
}

this.currentScore = () => {
    if (score === undefined) {
        score = 0;
        console.log("JJJJJ");
    }
    return this.score;
}
// module.exports = { currentScore, updateScore, score };
exports = this;




class Score {
    score;
    constructor() {
        score = 0;
    }

    updateScore(count) {
        score += count;
    }
    currentScore() {
        return score;
    }
}