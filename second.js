// Connected HTML: index, setting, results, leaderboard


//default sound are on
localStorage.setItem("sounds", "ON")

$("#playGame").click(function () {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("playOptions").classList.add("active");
});

//overlay for pop up inner page 
$("#overlay").click(function () { window.location.href = window.location.href });

$(".close").click(function () { window.location.href = window.location.href });

$("#setting").click(function () {
    document.getElementById("overlay").classList.add("active");
    document.getElementById("settingOption").classList.add("active");
});

setTimeout(function () { document.getElementById("overlay").classList.add("active"); document.getElementById("resultOptions").classList.add("active"); }, 3000);

$("#homeScreen").click(function () {
    location.href = "index.html"

})
$("#nextLevel").click(function () {
    mazeChooser((parseInt(localStorage.getItem("mazeSize"))+1))

})

//check local storage for the user preference on sounds
$("#sounds").click(function () {
    flag = localStorage.getItem("sounds");
    
    document.getElementById("sounds").children[0].innerText = "Sounds " + flag;
    if (flag != "ON") {
        localStorage.setItem("sounds", "ON")

    }
    else {
        localStorage.setItem("sounds", "OFF")
    }
});


function dayChecker() {
    const hours = new Date().getHours()

    if (hours > 7 && hours < 20){
        $('.dayNight').css('background-image', 'url("./images/day.gif")');
    }
}

$("#levelFive").click(function () {
    mazeChooser(5)
});
$("#levelTen").click(function () {
    mazeChooser(10)
});

$("#levelTwenty").click(function () {
    mazeChooser(20)
});


function mazeChooser(size) {
    
    //store player count to generate a unique random user name for guests 
    var counter = localStorage.getItem('playerCount');
    counter = counter == null ? 1 : parseInt(counter) + 1;
    localStorage.setItem("playerCount", counter);
    nameVal = $("#nickName").val();
    nickName = nameVal != "" ? nameVal : "RandomPlayer" + localStorage.getItem('playerCount');
    localStorage.setItem("currentPlayer", nickName);
    localStorage.setItem("mazeSize", size)
    location.href = "maze.html";

}


try {

    console.log("Getting the top five players")
    document.getElementById("who").innerText += localStorage.getItem("currentPlayer");
    document.getElementById("howLong").innerText += localStorage.getItem("currentTime");
} catch (error) {
    console.log("No players")
}

$("#LeaderBoard").click(function () {
    location.href = "leaderBoard.html";
});


window.onload= dayChecker();

