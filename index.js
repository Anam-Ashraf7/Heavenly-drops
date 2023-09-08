let playBtn = document.getElementById("playbtn")
let input = document.getElementsByTagName("input")
let gameDifficulty = document.querySelector("#difficulty")
// let button = document.querySelectorAll(".difficulty button")

// button.forEach((btn) => {
//     btn.addEventListener("click", () => {
//         btn.classList.toggle("gametype")
//         // localStorage.setItem("gamestyle",btn.id)
//         // console.log(localStorage.getItem("difficulty"))
//         console.log(gameDifficulty.value)
//     })
// })

playBtn.addEventListener("click", () => {
    localStorage.setItem("playername",input[0].value)
    localStorage.setItem("nickname",input[1].value)
    localStorage.setItem("difficulty",gameDifficulty.value)
})