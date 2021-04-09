window.onload =setTimeout(function () { document.getElementById("overlay").classList.add("active"); document.getElementById("resultOptions").classList.add("active"); }, 3000);

$("#homeScreen").click(function () {
    location.href = "index.html"

})


$("#nextLevel").click(function () {
    

    localStorage.setItem("mazeSize", (parseInt(localStorage.getItem("mazeSize"))+1))
    location.href = "maze.html";

})

