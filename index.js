let playBtn = document.getElementById("playbtn")
let input = document.getElementsByTagName("input")
let gameDifficulty = document.querySelector("#difficulty")

playBtn.addEventListener("click", () => {
    localStorage.setItem("playername",input[0].value)
    localStorage.setItem("nickname",input[1].value)
    localStorage.setItem("difficulty",gameDifficulty.value)
})