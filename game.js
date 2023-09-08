const basket = document.getElementById("basket")
let score = 0
let scoreBoard = document.querySelector("#score > span")
let timer = document.querySelector("#time > span ")
let time = 60
let continueBtn = document.getElementById("continue")
let instruction = document.getElementById("instruction")


continueBtn.addEventListener("click",() => {
    instruction.style.display = "none"
    generateFruits()
    gameLoop()
    setInterval(stopWatch,1000)
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
        let viewWidth = generateNumber(10,90)
        currentFruit = document.querySelector(".fruits .gift:last-child")
        currentFruit.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,3)
        currentFruit.style.animationDuration = `${second}s`
        console.log(window.innerWidth)
    }
    
    else if (localStorage.getItem("difficulty") == "medium") {
        fruits.innerHTML += allfruits[generateNumber(1,5)]
        // fruits.innerHTML += allfruits[generateNumber(1,5)]
        let viewWidth1 = generateNumber(10,90)
        currentFruit = document.querySelector(".fruits .gift:last-child")
        currentFruit.style.transform = `translateX(${viewWidth1}vw)`
        let second1 = generateNumber(1,3)
        currentFruit.style.animationDuration = `${second1}s`
        basket.style.width = 120 + "px"
        basket.style.top = 82 + "%"
        // gift.style.width = 2 + "%"
        // let second2 = generateNumber(1,3)
        // let viewWidth2 = generateNumber(10,90)
        // secondFruit = document.querySelector(".fruits .gift:last-child")
        // secondFruit.style.transform = `translateX(${viewWidth2}vw)`
        // secondFruit.style.animationDuration = `${second2}s`
        // secondFruit.style.border = 2 + "px" + " " + "solid"
    }
    
    else if (localStorage.getItem("difficulty") == "difficult") {
        fruits.innerHTML += allfruits[generateNumber(1,5)]
        let viewWidth = generateNumber(10,90)
        currentFruit = document.querySelector(".fruits .gift:last-child")
        currentFruit.style.transform = `translateX(${viewWidth}vw)`
        let second = generateNumber(1,2)
        currentFruit.style.animationDuration = `${second}s`
        basket.style.width = 90 + "px"
        basket.style.top = 85 + "%"
        // document.getElementById("apple").style.width = 2 + "%"
    }
}

function fruitEscaped(){
    if (localStorage.getItem("difficulty") == "easy" && currentFruit.getBoundingClientRect().top >= window.innerHeight){
        currentFruit.style.display = "none"
        score -= 5
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
        updateScore()
        generateFruits()
    }

    gameOver()
}

function updateScore() {
    scoreBoard.innerText = score;
}

// generateFruits();

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

// setInterval(stopWatch,1000)

function stopWatch() {
    --time
    timer.innerText = time
    if (time<=0) {
        location.href = "gameover.html"
        localStorage.setItem("score",score)
    }
}

function gameOver() {
    let highscore = localStorage.getItem("highscore")
    if (score > highscore) {
        localStorage.setItem("highscore",score)
    }
}
