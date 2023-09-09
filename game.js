const basket = document.getElementById("basket")
let scoreBoard = document.querySelector("#score > span")
let timer = document.querySelector("#time > span ")
let continueBtn = document.getElementById("continue")
let instruction = document.getElementById("instruction")
let pop = new Audio("./assets/pop.mp3")
let score = 0
let time = 60

continueBtn.addEventListener("click",() => {
    instruction.style.display = "none"
    generateFruits()
    gameLoop()
    setInterval(stopWatch,1000)
    let bgm = new Audio("./assets/wondrous-water.mp3")
    bgm.currentTime = 15
    bgm.play()
})

// controls

console.log(localStorage.getItem("difficulty"))

document.addEventListener("mousemove",(e) => {
    const mouseX = e.clientX
    if(mouseX > 80 && mouseX < window.innerWidth-75 ) {
        basket.style.left = mouseX - basket.clientWidth/2 + "px"
    }
})

const gameContainer = document.getElementById("gamebody");

basket.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const newPosition = touch.clientX;
        moveBasket(newPosition);
});

function moveBasket(newPosition) {
    const gameWidth = gameContainer.clientWidth;
    const basketWidth = basket.clientWidth;
    const halfBasketWidth = basketWidth / 2;
    let leftPosition = newPosition - halfBasketWidth;
    let position
    if(leftPosition >= 0 && leftPosition < gameWidth - basketWidth){
        position = newPosition - halfBasketWidth;
    }
    basket.style.left = `${position}px`;
}

// Generating fruits

let allfruits = [
    `<img class=gift id=fruit src=./assets/bananas.png>`,
    `<img class=gift id=apple id=fruit src=./assets/apple.png>`,
    `<img class=gift id=fruit src=./assets/grapes.png>`,
    `<img class=gift id=fruit src=./assets/mango.png>`,
    `<img class=gift id=orange id=fruit src=./assets/orange.png>`
]

function generateNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}

let currentFruit;
let fruits = document.querySelector(".fruits")
let gift = document.querySelectorAll("#fruit");
let orange = document.querySelector("#orange")
let apple = document.querySelector("#apple")

function generateFruits() {
    if (localStorage.getItem("difficulty") == "easy") {
        fruits.innerHTML += allfruits[generateNumber(0,allfruits.length)]
        currentFruit = document.querySelector(".fruits .gift:last-child")
        const screenWidth = window.innerWidth;
        const fruitWidth = currentFruit.clientWidth;
        const maxTranslateX = screenWidth - fruitWidth;
        let viewWidth = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentFruit.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,3)
        currentFruit.style.animationDuration = `${second}s`
        console.log(window.innerWidth)
    }
    
    else if (localStorage.getItem("difficulty") == "medium") {
        fruits.innerHTML += allfruits[generateNumber(1,5)]
        currentFruit = document.querySelector(".fruits .gift:last-child")
        const screenWidth = window.innerWidth;
        const fruitWidth = currentFruit.clientWidth;
        const maxTranslateX = screenWidth - fruitWidth;
        let viewWidth1 = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentFruit.style.transform = `translateX(${viewWidth1}vw)`
        let second = generateNumber(1,3)
        currentFruit.style.animationDuration = `${second}s`
        basket.style.width = 120 + "px"
        basket.style.top = 82 + "%"
    }
    
    else if (localStorage.getItem("difficulty") == "difficult") {
        fruits.innerHTML += allfruits[generateNumber(1,5)]
        currentFruit = document.querySelector(".fruits .gift:last-child")
        const screenWidth = window.innerWidth;
        const fruitWidth = currentFruit.clientWidth;
        const maxTranslateX = screenWidth - fruitWidth;
        let viewWidth = generateNumber(10,maxTranslateX / screenWidth * 100)
        currentFruit.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,2)
        currentFruit.style.animationDuration = `${second}s`
        basket.style.width = 90 + "px"
        basket.style.top = 85 + "%"
    }
}

// fruit escapes

function fruitEscaped(){
    if (localStorage.getItem("difficulty") == "easy" && currentFruit.getBoundingClientRect().top >= window.innerHeight){
        currentFruit.style.display = "none"
        score -= 2
        if (score < 0) score = 0
        updateScore()
        generateFruits()
    }else if (localStorage.getItem("difficulty") == "medium" && currentFruit.getBoundingClientRect().top >= window.innerHeight){
        currentFruit.style.display = "none"
        score -= 5
        if (score < 0) score = 0
        updateScore()
        generateFruits()
    }else if (localStorage.getItem("difficulty") == "difficult" && currentFruit.getBoundingClientRect().top >= window.innerHeight) {
        currentFruit.style.display = "none"
        score -= 10
        if (score < 0) score = 0
        updateScore()
        generateFruits()
    }
    else if(detectCollision(currentFruit,basket)) {
        currentFruit.style.display = "none"
        score++
        playPopSound()
        updateScore()
        generateFruits()
    }
    gameOver()
}

function playPopSound() {
    pop.currentTime = 0;
    pop.play();
}

function updateScore() {
    scoreBoard.innerText = score;
}

// Render and collision

function gameLoop(){
    fruitEscaped();
    Collision();
    requestAnimationFrame(gameLoop);
}

function Collision() {
    detectCollision(currentFruit,basket)
}

function detectCollision(element1, element2) {
    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();
    
    return !(rect1.right <= rect2.left || 
        rect1.left >= rect2.right || 
        rect1.bottom <= rect2.top || 
        rect1.top >= rect2.bottom);
    }
    
// Timer and highscore

function stopWatch() {
    --time
    timer.innerText = time
    if (time<=0) {
        location.href = "gameover.html"
        localStorage.setItem("score",score)
    }
}

let highscore = parseInt(localStorage.getItem("highscore")) || 0;

function gameOver() {
    if (score > highscore) {
        highscore = score
        localStorage.setItem("highscore",highscore)
    }
}
