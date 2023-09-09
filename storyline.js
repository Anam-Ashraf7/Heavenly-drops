let nextBtn = document.getElementById("nextBtn")
let cursor = document.querySelectorAll(".cursor")
let para1 = document.getElementById("para1")
let para2 = document.getElementById("para2")
let functionEnabled = true
const typingSound = new Audio("./assets/quick-mechanical-keyboard.mp3")
typingSound.play()

nextBtn.addEventListener("click", () => {
    location.href="game.html";
})

console.log(localStorage.getItem("difficulty"))

function type(elementId,text) {
    let index = 0;
    function typeText() {
        if (index < text.length) {
            document.getElementById(elementId).innerHTML += text[index]
            index++
            setTimeout(typeText, 10)
        }
    }
    typeText()
}
let text1 = `In a peaceful village nestled among rolling hills, the villagers are known for their kindness and generosity. 
One day, a divine deity selects you as the Chosen One to receive gifts from the heavens on behalf of the entire village.
    The deity has been watching the villagers' good deeds and wants to reward them for their kindness.`
    
let text2 = `As the Chosen One, you are bestowed with a sacred mission: to catch all the heavenly gifts that are falling from the sky. 
    The entire village gathers in the village square to witness this extraordinary event, and they look to you with hope and anticipation.`

type("para1",text1);
type("para2",text2)
    
setTimeout(removeCursor,5000)

function removeCursor() {
    typingSound.pause()
    cursor.forEach(e => e.style.display = "none")
}
