//write the top players on the leaderboaed 
playersList = JSON.parse(localStorage.getItem("topPlayers"))
timesList = JSON.parse(localStorage.getItem("topTimes"))
console.log(playersList.length)

for (var i = 0; i < playersList.length; i++) {
    if (playersList[i] != null) {

        document.getElementById("topFive").innerHTML += "<br/>" + playersList[i] + " &nbsp &nbsp " + timesList[i] + " seconds" + "<hr>";



    }
}

//back button 
$(".back").click(function () {  location.href = "index.html"})

function dayChecker() {
    const hours = new Date().getHours()

    if (hours < 7 && hours > 20) {
        $('.dayNight').css('background-image', 'url("./images/night.gif")');
    }
}

window.onload = dayChecker();