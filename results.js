window.onload =setTimeout(function () { document.getElementById("overlay").classList.add("active"); document.getElementById("resultOptions").classList.add("active"); }, 3000);

$("#homeScreen").click(function () {
    location.href = "index.html"

})
$("#nextLevel").click(function () {
    mazeChooser((parseInt(localStorage.getItem("mazeSize"))+1))

})