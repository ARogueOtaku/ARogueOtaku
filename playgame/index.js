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
const Images = {
  X: "![](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/X.png)",
  O: "![](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/O.png)",
};
//=================================================================================================================================

//================================ Generate a Symbol/Image from a Character =================================
function resolveSymbolorIssue(character) {
  return Symbols[character] || character;
}

function resolveImageorIssue(character) {
  return Images[character] || character;
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
      10: "[![Tile 3](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C21&body=Just+click+%27Submit+new+issue%27.)",
      11: "[![Tile 4](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C22&body=Just+click+%27Submit+new+issue%27.)",
      12: "[![Tile 5](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C23&body=Just+click+%27Submit+new+issue%27.)",
      20: "[![Tile 6](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C31&body=Just+click+%27Submit+new+issue%27.)",
      21: "[![Tile 7](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C32&body=Just+click+%27Submit+new+issue%27.)",
      22: "[![Tile 8](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C33&body=Just+click+%27Submit+new+issue%27.)",
      "00": "[![Tile 0](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C11&body=Just+click+%27Submit+new+issue%27.)",
      "01": "[![Tile 1](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C12&body=Just+click+%27Submit+new+issue%27.)",
      "02": "[![Tile 2](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C13&body=Just+click+%27Submit+new+issue%27.)",
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
  else if (Object.values(gameState.state).filter((cell) => cell === true).length === 9) {
    winningSymbol = "D";
    resultMessage += ` *As a result the Game ended in a **Draw***`;
  } else ended = false;
  if (ended && winningSymbol !== "D")
    resultMessage += ` *As a result **${resolveSymbolorIssue(winningSymbol)} Won the Game***`;
  return { ended, resultMessage };
}

function updateReadmeFromGamestate(lastMoveResultMessage = "") {
  let readmeString = `## **❌ Tic Tac Toe in Readme ⭕**
### ***🎮 Game is in Progress.*** 
\
🖱️ Just Click on Any of the Blank Squares below to place an ${resolveSymbolorIssue(gameState.symbol)}.
  
|   | 1 | 2 | 3 |
| - | - | - | - |
| 1 | ${resolveImageorIssue(gameState.played["00"])} | ${resolveImageorIssue(
    gameState.played["01"]
  )} | ${resolveImageorIssue(gameState.played["02"])} |
| 2 | ${resolveImageorIssue(gameState.played["10"])} | ${resolveImageorIssue(
    gameState.played["11"]
  )} | ${resolveImageorIssue(gameState.played["12"])} |
| 3 | ${resolveImageorIssue(gameState.played["20"])} | ${resolveImageorIssue(
    gameState.played["21"]
  )} | ${resolveImageorIssue(gameState.played["22"])} |
  
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
//==============================================================================================================================
