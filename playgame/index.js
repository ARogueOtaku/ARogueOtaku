//=============================== Initialize and Decclare Necessary Variables and Cosntants ======================================
const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const gameStateFilePath = path.join(__dirname, "../data/gamestate.json");
const readmePath = path.join(__dirname, "../README.md");
let gameState = require(gameStateFilePath);
const Moves = {
  ROWS: {
    1: 0,
    2: 1,
    3: 2,
  },
  COLUMNS: {
    1: 0,
    2: 1,
    3: 2,
  },
};
const Symbols = {
  X: "❌",
  O: "⭕",
};
//=================================================================================================================================

//================================ Generate a Symbol from a Character =================================
function resolveSymbolorIssue(character) {
  return Symbols[character] || character;
}
//=====================================================================================================

//========================================= Save Gamestate to File ================================================
function saveGameState() {
  gameState.lastUpdated = new Date().toUTCString();
  const gameStateString = JSON.stringify(gameState, null, "  ");
  fs.writeFileSync(gameStateFilePath, gameStateString);
  core.info("Saving Gamestate: " + gameStateString);
}
//=================================================================================================================

//============================================ Reset the Gamestate ================================================
function resetGameState() {
  gameState = {
    played: {
      10: " ",
      11: " ",
      12: " ",
      20: " ",
      21: " ",
      22: " ",
      "00": " ",
      "01": " ",
      "02": " ",
    },
    state: {
      10: false,
      11: false,
      12: false,
      20: false,
      21: false,
      22: false,
      "00": false,
      "01": false,
      "02": false,
    },
    cellState: [0, 0, 0, 0, 0, 0, 0, 0],
    increment: 1,
    symbol: "X",
  };
}
//===================================================================================================================

//======================================= Get Input Row and Columns from Issue Title ==========================================
function getInputs(issueTitle = "TTT|11") {
  const inpArray = issueTitle.split("|");
  const inputs = inpArray[1];
  if (!inputs) throw "Please provide a Row and a Column";
  const rowcol = inputs.split("");
  const row = Moves.ROWS[rowcol[0]];
  const column = Moves.COLUMNS[rowcol[1]];
  if (typeof row === undefined || typeof column === undefined) throw "Please provide a Valid Row and Column";
  return { row, column };
}
//=============================================================================================================================

//========================================= Toggle current Gamestate Symbol ================================================
function toggleXO() {
  if (gameState.symbol === "X") {
    gameState.symbol = "O";
    gameState.increment = -1;
    return;
  }
  gameState.symbol = "X";
  gameState.increment = 1;
}
//===========================================================================================================================

//========================================== Function names are Self Explanatory :) ===============================================
function updateStateFromInput(row, column) {
  const rowcolString = row + "" + column;
  const validPlaces = Object.keys(gameState.state);
  if (!validPlaces.includes(rowcolString) || gameState.state[rowcolString])
    throw `Cannot place an ${gameState.symbol} here!`;
  gameState.state[rowcolString] = true;
  gameState.played[rowcolString] = gameState.symbol;
  gameState.cellState[row] += gameState.increment;
  gameState.cellState[column + 3] += gameState.increment;
  if (row === column) gameState.cellState[6] += gameState.increment;
  if (row + column === 2) gameState.cellState[7] += gameState.increment;
}

function evaluateGameState(row, column, user) {
  let winningSymbol;
  let ended = true;
  let resultMessage = `🎲 ***Last Move:*** *${user} placed an **${resolveSymbolorIssue(gameState.symbol)}** in **Row ${
    row + 1
  } Column ${column + 1}.***`;
  if (gameState.cellState.includes(3)) winningSymbol = "X";
  else if (gameState.cellState.includes(-3)) winningSymbol = "O";
  else ended = false;
  if (ended) resultMessage += ` *As a result **${resolveSymbolorIssue(winningSymbol)} Won the Game***`;
  return { ended, resultMessage };
}

function updateReadmeFromGamestate(lastMoveResultMessage = "") {
  let readmeString = `## **❌ Tic Tac Toe in Readme ⭕**
### ***🎮 Game is in Progress.*** 
\
🖱️ Just Click on Any of the Blank Squares below to place an ${resolveSymbolorIssue(gameState.symbol)}.
  
|   | 1 | 2 | 3 |
| - | - | - | - |
| 1 | ${resolveSymbolorIssue(gameState.played["00"])} | ${resolveSymbolorIssue(
    gameState.played["01"]
  )} | ${resolveSymbolorIssue(gameState.played["02"])} |
| 2 | ${resolveSymbolorIssue(gameState.played["10"])} | ${resolveSymbolorIssue(
    gameState.played["11"]
  )} | ${resolveSymbolorIssue(gameState.played["12"])} |
| 3 | ${resolveSymbolorIssue(gameState.played["20"])} | ${resolveSymbolorIssue(
    gameState.played["21"]
  )} | ${resolveSymbolorIssue(gameState.played["22"])} |
  
${lastMoveResultMessage}`;
  fs.writeFileSync(readmePath, readmeString);
}
//=============================================================================================================================

//========================================= Play the Game on Issue Creation ===================================================
function playTicTacToe() {
  let comment = ``;
  function setComment(cmmnt) {
    if (typeof cmmnt === "string") comment = cmmnt;
  }
  try {
    const issueTitle = core.getInput("issuetitle");
    const username = core.getInput("username");
    const { row, column } = getInputs(issueTitle);
    //const { row, column } = getInputs("TTT|33");
    updateStateFromInput(row, column);
    const { ended, resultMessage } = evaluateGameState(row, column, username);
    //const { ended, resultMessage } = evaluateGameState(row, column, "ARogueOtaku");
    if (ended) resetGameState();
    else toggleXO();
    updateReadmeFromGamestate(resultMessage);
    setComment(`Successfully Handled Input`);
  } catch (err) {
    setComment(err.message || err);
  } finally {
    saveGameState();
    core.setOutput("comment", comment);
    core.info(comment);
  }
}

playTicTacToe();
//===============================================================================================================================
