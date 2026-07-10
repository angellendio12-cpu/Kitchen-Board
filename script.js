/*====================================
      THE KITCHEN BOARD
====================================*/

// ---------------------------
// GAME VARIABLES
// ---------------------------

let scoreA = 0;
let scoreB = 0;

let servingTeam = "A";
let serverNumber = 1;

let winningScore = 11;

let history = [];

// ---------------------------
// START GAME
// ---------------------------

function startGame(){

    const teamA =
        document.getElementById("teamAInput").value.trim();

    const teamB =
        document.getElementById("teamBInput").value.trim();

    document.getElementById("teamAName").textContent =
        teamA || "Team A";

    document.getElementById("teamBName").textContent =
        teamB || "Team B";

    document.getElementById("serverTeam").textContent =
        teamA || "Team A";

    document.getElementById("servingText").textContent =
        teamA || "Team A";

    winningScore = parseInt(
        document.getElementById("winningScore").value
    );

    scoreA = 0;
    scoreB = 0;

    servingTeam = "A";
    serverNumber = 1;

    history = [];

    updateDisplay();

}

// ---------------------------
// UPDATE DISPLAY
// ---------------------------

function updateDisplay(){

    document.getElementById("scoreA").textContent =
        scoreA;

    document.getElementById("scoreB").textContent =
        scoreB;

    document.getElementById("serverNumber").textContent =
        "Server #" + serverNumber;

    if(servingTeam==="A"){

        document.getElementById("serverTeam").textContent =
            document.getElementById("teamAName").textContent;

        document.getElementById("servingText").textContent =
            document.getElementById("teamAName").textContent;

        document.getElementById("btnA").disabled = false;
        document.getElementById("btnB").disabled = true;

    }

    else{

        document.getElementById("serverTeam").textContent =
            document.getElementById("teamBName").textContent;

        document.getElementById("servingText").textContent =
            document.getElementById("teamBName").textContent;

        document.getElementById("btnA").disabled = true;
        document.getElementById("btnB").disabled = false;

    }

    checkWinner();

}

// ---------------------------
// SAVE HISTORY
// ---------------------------

function saveHistory(){

    history.push({

        scoreA,
        scoreB,
        servingTeam,
        serverNumber

    });

}

// ---------------------------
// ADD POINT
// ---------------------------

function addPoint(team){

    saveHistory();

    if(team==="A"){

        scoreA++;

    }

    else{

        scoreB++;

    }

    updateDisplay();

}

// ---------------------------
// TOGGLE SERVER NUMBER
// ---------------------------

function toggleServerNumber(){

    if(serverNumber===1){

        serverNumber=2;

    }

    else{

        serverNumber=1;

    }

    updateDisplay();

}

// ---------------------------
// SWITCH SERVER
// ---------------------------

function switchServer(){

    if(servingTeam==="A"){

        servingTeam="B";

    }

    else{

        servingTeam="A";

    }

    serverNumber=1;

    updateDisplay();

}

// ---------------------------
// UNDO
// ---------------------------

function undoPoint(){

    if(history.length===0){

        return;

    }

    const last=history.pop();

    scoreA=last.scoreA;
    scoreB=last.scoreB;

    servingTeam=last.servingTeam;
    serverNumber=last.serverNumber;

    document.getElementById("winnerBanner").textContent="";

    updateDisplay();

}

// ---------------------------
// RESET
// ---------------------------

function resetGame(){

    if(!confirm("Start a new match?")){

        return;

    }

    scoreA=0;
    scoreB=0;

    servingTeam="A";
    serverNumber=1;

    history=[];

    document.getElementById("winnerBanner").textContent="";

    updateDisplay();

}

// ---------------------------
// CHECK WINNER
// ---------------------------

function checkWinner(){

    const winnerBanner =
        document.getElementById("winnerBanner");

    winnerBanner.textContent="";

    if(

        scoreA>=winningScore &&

        scoreA-scoreB>=2

    ){

        winnerBanner.textContent =
        "🏆 " +
        document.getElementById("teamAName").textContent +
        " Wins!";

        disableButtons();

    }

    else if(

        scoreB>=winningScore &&

        scoreB-scoreA>=2

    ){

        winnerBanner.textContent =
        "🏆 " +
        document.getElementById("teamBName").textContent +
        " Wins!";

        disableButtons();

    }

}

// ---------------------------
// DISABLE BUTTONS
// ---------------------------

function disableButtons(){

    document.getElementById("btnA").disabled=true;

    document.getElementById("btnB").disabled=true;

}

// ---------------------------
// INITIALIZE
// ---------------------------

updateDisplay();