// to store visited nodes
var stack = []
// row is a user input 
const row = parseInt(localStorage.getItem("mazeSize"));
const col = row;

//to display the name of the player under the maze
const currentPlayer = localStorage.getItem("currentPlayer");

const grid = new Array();
// randomly chose the start and the finish cells from the first and the last column respectively  
var randStart = getRandom();
var randEnd = getRandom();

var model = null;

//win time
var time;
//countdown timer
var timer;
//check if the user disabled the sounds
var sounds = localStorage.getItem("sounds") == "ON" ? true : false;
console.log("Sounds are " + localStorage.getItem("sounds"))
var correctPath = document.createElement('audio');
correctPath.src = "./audio/correct.mp3"
correctPath.muted = sounds;
var hitWall = document.createElement('audio');
hitWall.src = "./audio/hit.mp3"
hitWall.muted = sounds;
var win = document.createElement('audio');
win.src = "./audio/win.mp3"
win.muted = sounds;
var gameOver = document.createElement('audio');
gameOver.src = "./audio/gameOver.mp3"
gameOver.muted = sounds;


//back button

$(".back").click(function () {  location.href = "index.html"})

var countDown = (row * 3);
var seconds = countDown;
document.getElementById("seconds").innerHTML = seconds;

let ev = new Event("click");

//new buttons
var leftBtn = false;
var rightBtn = false;
var topBtn = false;
var bottomBtn = false;

//canvase to draw the maze on 
const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");


//randomly choose the start/end point
function getRandom() {
    return Math.floor(Math.random() * (row))
}


class Cell {
    constructor(row, col) {
        this.start = false;
        this.end = false;
        //walls of cell
        this.top = true;
        this.right = true;
        this.bottom = true;
        this.left = true;
        //position of cell
        this.row = row;
        this.col = col;
        //has the algorithm encounter the cell
        this.seen = false;
    }
}


function makeGrid() {
    for (var i = 0; i < row; i++) {
        //create a multidimensional array
        grid.push([])
        for (var j = 0; j < col; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
    //start and end points are randomly chosen 
    grid[0][randStart].start = true;
    grid[col - 1][randEnd].end = true;
}

//the width and height depnding on the window size
width = 300 / row;
height = (width / 2);

//check if the cell have walls based on the dfs function
function drawCell(cell) {

    //ctx.beginPath();
    ctx.strokeStyle = "#D3D0D0"
    ctx.lineWidth = 2;

    sX = cell.row * width;
    sY = cell.col * height;

    ctx.fillRect(sX, sY, width, height);
    if (cell.start) { cell.left = false; }
    if (cell.end) { cell.right = false; }
    if (cell.top) {
        ctx.moveTo(sX, sY);
        ctx.lineTo(sX + width, sY);
        ctx.stroke()
    }
    if (cell.right) {
        ctx.moveTo(sX + width, sY);
        ctx.lineTo(sX + width, sY + height);
    }
    if (cell.bottom) {
        ctx.moveTo(sX, sY + height);
        ctx.lineTo(sX + width, sY + height);
        ctx.stroke()
    }
    if (cell.left) {
        ctx.moveTo(sX, sY + height);
        ctx.lineTo(sX, sY);
        ctx.stroke()
    }


}



//recursive backtracking to generate a maze 
function dfs(cell) {

    cell.seen = true;
    next = getNeighbors(cell.row, cell.col);

    if (next) {
        next.seen = true;
        stack.push(cell);
        clearPath(cell, next);
        dfs(next);


    } else if (stack.length > 0) {
        next = stack.pop();
        dfs(next);
    }

    drawCell(cell)
    if (stack.length == 0) { return }
}

//remove lines in path
function clearPath(cell, next) {
    var xDif = cell.row - next.row;
    var yDif = cell.col - next.col;
    //cell is left
    if (xDif == 1) {
        cell.left = false;
        next.right = false;
    }
    //cell is right
    else if (xDif == -1) {
        cell.right = false;
        next.left = false;
    }
    //cell is top
    if (yDif == 1) {
        cell.top = false;
        next.bottom = false;
    }
    //cell is bottom
    else if (yDif == -1) {
        cell.bottom = false;
        next.top = false;
    }


}
function getNeighbors(x, y) {
    neighborsList = []

    if (y > 0 && !grid[x][y - 1].seen) {
        //top neighbor
        neighborsList.push(grid[x][y - 1])
    }
    if (x < row - 1 && !grid[x + 1][y].seen) {
        //right neighbor
        neighborsList.push(grid[x + 1][y])
    }
    if (y < col - 1 && !grid[x][y + 1].seen) {
        //bottom neighbor
        neighborsList.push(grid[x][y + 1])
    }
    if (x > 0 && !grid[x - 1][y].seen) {
        //left neighbor
        neighborsList.push(grid[x - 1][y])
    }

    //return random neighbor 
    return neighborsList[Math.floor(Math.random() * (neighborsList.length))];

}


//character and images 
var character = document.createElement("img");
var finishLine = document.createElement("img");
var passed = document.createElement("img");
var won = document.createElement("img");


character.src = "./images/char_.png";
finishLine.src = "./images/end.webp";
passed.src = "./images/passed.jpg";
won.src = "./images/finish.png";
won.style.backgroundColor = "black";


var x = width / row;
var y = ((randStart * height) + (height / 3));



var firstMove = true;

//check controls
function play(e) {
    if(firstMove){startTimer();firstMove =false;}   
    e.preventDefault();
    ctx.beginPath();
    preX = x;
    preY = y;
    allowedMove = false;
    xCell = Math.floor(x / width);
    yCell = Math.floor(y / height);

    if (e.keyCode == 38 || e.keyCode == 87 || topBtn) {
        if (!grid[xCell][yCell].top) {
            y -= height
            allowedMove = true;

        }
        topBtn = false;
    }
    else if (e.keyCode == 39 || e.keyCode == 68 || rightBtn) {
        if (!grid[xCell][yCell].right) {
            x += width
            allowedMove = true;

        }
        rightBtn = false;
    }
    else if (e.keyCode == 40 || e.keyCode == 83 || bottomBtn) {
        if (!grid[xCell][yCell].bottom) {
            y += height
            allowedMove = true;

        }
        bottomBtn = false;

    }
    else if (e.keyCode == 37 || e.keyCode == 65 || leftBtn) {
        if (!grid[xCell][yCell].left) {
            x -= width
            allowedMove = true;
            console.log()

        }
        leftBtn = false;
    }

    if (allowedMove) { correctPath.play(); }
    else { hitWall.play(); }

    //draw new position 
    ctx.drawImage(passed, preX + width / 7, preY, width / 2, height / 2);
    ctx.stroke();
    ctx.drawImage(character, x + width / 7, y, width / 2, height / 2);
    ctx.stroke();

    // if the end was reached declare win
    if (Math.floor(preX / width) == col - 1 && Math.floor(preY / height) == randEnd) {

        clearInterval(timer)
        ctx.fillRect(preX, preY, width, height/2);
        time = countDown - document.getElementById("seconds").innerText;
        
        localStorage.setItem("currentTime", time);
        ctx.drawImage(won, preX + width / 15, preY - height / 20, width - width / 3, height - height / 3);

        win.play();
        winner();
        // allow time to play the win sound
        setTimeout(function () {  location.href = "results.html"; }, 2000);

    }

}

// insert player name and time 
document.getElementById("currentName").innerText = currentPlayer;


//timer depends on the size of the maze




function secondsCount() {
    if (seconds > 0) {
        if (seconds < countDown / 2 + 1) {
            document.getElementById("timer").style.color = "#b40404";
            document.getElementById("timer").style.animation = "pulse 2s infinite";
        }
        document.getElementById("seconds").innerHTML = --seconds;
    }
    else {
       
        document.getElementById("overlay").classList.add("active");
        document.getElementById("gameOver").classList.add("active");
        clearInterval(timer)
        gameOver.play();
        $(".logo").css("filter", "grayscale(1) invert(1)");
        document.onkeydown = function (e) { e.preventDefault(); }
    }

}



//traverse to the correct position for the leader boaed 
function winner() {
    
    //localStoragereturns string and JSON parse convert it to an array
    topPlayers = localStorage.getItem("topPlayers") != null ? JSON.parse(localStorage.getItem("topPlayers")) : new Array();
    topTimes = localStorage.getItem("topTimes") != null ? JSON.parse(localStorage.getItem("topTimes")) : new Array();

    remainingPlayers = new Array();
    remainingTimes = new Array();
    console.log("hello")

    if (topPlayers.length > 0) {
        
        while (topPlayers.length > 0) {
            tempTimeop = topTimes.pop();
            if (parseInt(time) > parseInt(tempTimeop)) {
                remainingPlayers.push(topPlayers.pop());
                remainingTimes.push(tempTimeop)
            }
            else {
                topTimes.push(tempTimeop);
                if (topPlayers.length < 5) {
                    topPlayers.push(currentPlayer);
                    topTimes.push(time);
                }
                break;
            }
        }
        while (topPlayers.length < 5 && remainingPlayers.length > 0) {
            topPlayers.push(remainingPlayers.pop())
            topTimes.push(remainingTimes.pop())
        }
    }
    else {
        topPlayers.push(currentPlayer);
        topTimes.push(time);
    }
    players = JSON.stringify(topPlayers)
    times = JSON.stringify(topTimes);

    localStorage.setItem("topPlayers", players)
    localStorage.setItem("topTimes", times)
}


function dayChecker() {
    const hours = new Date().getHours()
    if (hours > 7 && hours < 20) {
        $('.dayNight').css('background-image', 'url("./images/day.gif")');
        $('.dayNight').css({ 'background-blend-mode': 'lighten', 'background-color': 'rgba(248, 248, 248, 0.2)' });
    }
}
window.onload = function () {
    //localStorage.removeItem("topPlayers")
    //localStorage.removeItem("topTimes")
    //localStorage.removeItem("playerCount")
    
    //check time for background image 
    dayChecker()
    //draw the grid 
    makeGrid()
    //create the maze
    dfs(grid[col - 1][randEnd])
    grid[0][randStart].left = true;
    console.log(grid[0][randStart].left)
    ctx.drawImage(character, x + width / 7, y, width / 2, height / 2);

    ctx.drawImage(finishLine, (((row - 1) * width) + (width / 3)), (randEnd * height + height / 3), width - width / 3, height - height / 3);
    ctx.stroke();
      
}

document.onkeydown = play;

$(".playAgain").click(function () { window.location.href = window.location.href });


function startTimer() {

    timer = setInterval(function () { secondsCount(); }, 1000)

}

$("#topBtn").click(function () { topBtn = true; play(ev) });
$("#rightBtn").click(function () { rightBtn = true; play(ev) });
$("#leftBtn").click(function () { leftBtn = true; play(ev) });
$("#bottomBtn").click(function () { bottomBtn = true; play(ev) });




/*
const video = document.getElementById("video");



handTrack.load().then(model => { model.detect(video).then(predictions => {console.log( predictions) });});



function startVideo() {handTrack.startVideo(video).then(function (status) {detect()})};



startVideo()
*/
