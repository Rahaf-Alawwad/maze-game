//write the top players on the leaderboaed 
playersList = JSON.parse(localStorage.getItem("topPlayers"))
timesList = JSON.parse(localStorage.getItem("topTimes"))
console.log(playersList.length)

for (var i = 0; i < playersList.length; i++) {
    if (playersList[i] != null) {
        
        document.getElementById("topFive").innerHTML += "<br/>" + playersList[i] + " &nbsp &nbsp " + timesList[i] + " seconds" + "<hr>";
   
      
    
    }
}

function dayChecker() {
    const hours = new Date().getHours()

    if (hours > 4 && hours < 17){
        $('.dayNight').css('background-image', 'url("http://37.media.tumblr.com/73c5ee436a8c132ef8fb4d27e7fa4c92/tumblr_n3xkdnRid41r3ho60o1_500.gif")');
    }
}

window.onload= dayChecker();