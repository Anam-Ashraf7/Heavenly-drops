const basket = document.getElementById("basket")

let basketX = 0;
let basketSpeed = 20;
const basketWidth = basket.clientWidth
const screenWidth = screen.clientWidth
let container = document.body
console.log(container.offsetWidth)

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && basketX > 0){
        basketX -= basketSpeed
    } 
    else if (e.key === "ArrowRight" && basketX < window.innerWidth-185){
        basketX += basketSpeed
    }
    basket.style.left = basketX + "px";
})

document.addEventListener("mousemove",(e) => {
    const mouseX = e.clientX
    if(mouseX > 80 && mouseX < window.innerWidth-75 ) {
        console.log(mouseX)
        basket.style.left = mouseX - basket.clientWidth/2 + "px"
    }
})

const gameContainer = document.getElementById("gamebody");
let isDragging = false;

basket.addEventListener("touchstart", (e) => {
    isDragging = true;
});

basket.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        const newPosition = touch.clientX - gameContainer.getBoundingClientRect().left;
        moveBasket(newPosition);
    }
});

basket.addEventListener("touchend", () => {
    isDragging = false;
});

function moveBasket(newPosition) {
    const gameWidth = gameContainer.clientWidth;
    const basketWidth = basket.clientWidth;
    const halfBasketWidth = basketWidth / 2;

    let leftPosition = newPosition - halfBasketWidth;
    leftPosition = Math.max(0, leftPosition); // Ensure the basket doesn't go past the left edge
    leftPosition = Math.min(gameWidth - basketWidth, leftPosition); // Ensure the basket doesn't go past the right edge

    basket.style.left = `${leftPosition}px`;
}

