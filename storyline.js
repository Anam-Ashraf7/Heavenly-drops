let nextBtn = document.getElementById("nextBtn")
nextBtn.addEventListener("click", () => {
    location.href="game.html"
})

console.log(localStorage.getItem("difficulty"))