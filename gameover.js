let playAgainBtn = document.getElementById("playagainbtn")
let message  = document.getElementById("message")
let names = document.querySelector("#name h1")
let score = localStorage.getItem("score")
let scoreBoard = document.querySelector("#score span")
let highscore = document.querySelector("#highscore span")
let homeBtn = document.querySelector("#home")

playAgainBtn.addEventListener("click", () => {
    location.href = "game.html"
})

randomWinMessages = [
    `<h1>Congratulations, Divine Guardian! You've showered your village with blessings and emerged victorious!</h1>`,
    `<h1>You are the chosen one! Your village thrives thanks to your divine gift-catching skills.</h1>`,
    `<h1>A true blessing to your village! You've shown exceptional skill in collecting gifts.</h1>`
]

randomLoserMessages = [
    `<h1>Don't be disheartened, Divine Guardian. Even in loss, your efforts were felt by your village.</h1>`,
    `<h1>While the heavens may not have favored you today, your dedication to your village remains unwavering.</h1>`,
    `<h1>Keep your faith strong, Divine Guardian. Tomorrow is a new day for blessings and opportunities.</h1>`
]

window.onload = function() {
    names.innerText += localStorage.getItem("playername")
    highscore.innerText = localStorage.getItem("highscore")
    if(score == 0) {
        message.innerHTML += randomLoserMessages[generateNumber(0,randomLoserMessages.length)]
        scoreBoard.innerText = score
    } else if (score > 0) {
        message.innerHTML += randomWinMessages[generateNumber(0,randomWinMessages.length)]
        scoreBoard.innerText = score
    }
}

homeBtn.addEventListener("click", () => {
    location.href = "index.html"
})

function generateNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}