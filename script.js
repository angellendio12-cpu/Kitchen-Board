/* =====================================
   THE KITCHEN BOARD
   SCRIPT.JS
===================================== */

// --------------------------
// GAME STATE
// --------------------------

let teamAScore = 0;
let teamBScore = 0;

let servingTeam = "A";
let serverNumber = 1;

let history = [];

// --------------------------
// ELEMENTS
// --------------------------

const startBtn = document.getElementById("startMatchBtn");

const scoreboard = document.getElementById("scoreboardSection");

const teamAInput = document.getElementById("teamAInput");
const teamBInput = document.getElementById("teamBInput");

const teamAName = document.getElementById("teamAName");
const teamBName = document.getElementById("teamBName");

const teamAScoreText = document.getElementById("teamAScore");
const teamBScoreText = document.getElementById("teamBScore");

const teamAButton = document.getElementById("teamAButton");
const teamBButton = document.getElementById("teamBButton");

const serverDisplay = document.getElementById("serverDisplay");
const servingTeamText = document.getElementById("servingTeam");

const serverButton = document.getElementById("serverButton");

const undoBtn = document.getElementById("undoBtn");
const switchServerBtn = document.getElementById("switchServerBtn");
const resetBtn = document.getElementById("resetBtn");

const winnerBanner = document.getElementById("winnerBanner");

// --------------------------
// START MATCH
// --------------------------

startBtn.addEventListener("click", () => {

    teamAName.textContent =
        teamAInput.value.trim() || "Team A";

    teamBName.textContent =
        teamBInput.value.trim() || "Team B";

    scoreboard.classList.remove("hidden");

    updateDisplay();

});

// --------------------------
// SAVE HISTORY
// --------------------------

function saveHistory(){

    history.push({

        teamAScore,

        teamBScore,

        servingTeam,

        serverNumber

    });

}

// --------------------------
// UPDATE DISPLAY
// --------------------------

function updateDisplay(){

    teamAScoreText.textContent = teamAScore;
    teamBScoreText.textContent = teamBScore;

    if(servingTeam === "A"){

        serverDisplay.textContent = teamAName.textContent;
        servingTeamText.textContent = teamAName.textContent;

        teamAButton.disabled = false;
        teamBButton.disabled = true;

    }else{

        serverDisplay.textContent = teamBName.textContent;
        servingTeamText.textContent = teamBName.textContent;

        teamAButton.disabled = true;
        teamBButton.disabled = false;

    }

    serverButton.textContent =
        "Server #" + serverNumber;

    checkWinner();

}

// --------------------------
// ADD POINT
// --------------------------

teamAButton.addEventListener("click", () => {

    saveHistory();

    teamAScore++;

    updateDisplay();

});

teamBButton.addEventListener("click", () => {

    saveHistory();

    teamBScore++;

    updateDisplay();

});

// --------------------------
// TOGGLE SERVER NUMBER
// --------------------------

serverButton.addEventListener("click", () => {

    if(serverNumber === 1){

        serverNumber = 2;

    }else{

        serverNumber = 1;

    }

    updateDisplay();

});

// --------------------------
// SWITCH SERVING TEAM
// --------------------------

switchServerBtn.addEventListener("click", () => {

    if(servingTeam === "A"){

        servingTeam = "B";

    }else{

        servingTeam = "A";

    }

    serverNumber = 1;

    updateDisplay();

});

// --------------------------
// UNDO
// --------------------------

undoBtn.addEventListener("click", () => {

    if(history.length === 0){

        return;

    }

    const last = history.pop();

    teamAScore = last.teamAScore;
    teamBScore = last.teamBScore;

    servingTeam = last.servingTeam;
    serverNumber = last.serverNumber;

    winnerBanner.classList.add("hidden");

    updateDisplay();

});

// --------------------------
// RESET MATCH
// --------------------------

resetBtn.addEventListener("click", () => {

    if(!confirm("Start a new match?")){

        return;

    }

    teamAScore = 0;
    teamBScore = 0;

    servingTeam = "A";
    serverNumber = 1;

    history = [];

    winnerBanner.classList.add("hidden");

    updateDisplay();

});

// --------------------------
// CHECK WINNER
// --------------------------

function checkWinner(){

    if(

        teamAScore >= 11 &&

        teamAScore - teamBScore >= 2

    ){

        winnerBanner.textContent =
            "🏆 " + teamAName.textContent + " Wins!";

        winnerBanner.classList.remove("hidden");

        disableScoring();

    }

    else if(

        teamBScore >= 11 &&

        teamBScore - teamAScore >= 2

    ){

        winnerBanner.textContent =
            "🏆 " + teamBName.textContent + " Wins!";

        winnerBanner.classList.remove("hidden");

        disableScoring();

    }

}

// --------------------------
// DISABLE BUTTONS
// --------------------------

function disableScoring(){

    teamAButton.disabled = true;
    teamBButton.disabled = true;

}

// --------------------------
// INITIAL DISPLAY
// --------------------------

updateDisplay();

