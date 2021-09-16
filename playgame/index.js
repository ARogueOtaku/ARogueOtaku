const core = require("@actions/core");
const fs = require("fs");
const path = require("path");
const gameStateFilePath = path.join(__dirname, "../data/gamestate.json");
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

function saveGameState() {
  const gameStateString = JSON.stringify(gameState, null, "  ");
  fs.writeFileSync(gameStateFilePath, gameStateString);
  core.info("Saving Gamestate: " + gameStateString);
}

function resetGameState() {
  gameState = {
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

function getInputs(issueTitle = "TTT|11", user) {
  const inpArray = issueTitle.split("|");
  const inputs = inpArray[1];
  if (!inputs) throw "Please provide a Row and a Column";
  const rowcol = inputs.split("");
  const row = Moves.ROWS[rowcol[0]];
  const column = Moves.COLUMNS[rowcol[1]];
  if (typeof row === undefined || typeof column === undefined) throw "Please provide a Valid Row and Column";
  return { row, column };
}

function toggleXO() {
  if (gameState.symbol === "X") {
    gameState.symbol = "O";
    gameState.increment = -1;
    return;
  }
  gameState.symbol = "X";
  gameState.increment = 1;
}

function updateStateFromInput(row, column) {
  const rowcolString = row + "" + column;
  const validPlaces = Object.keys(gameState.state);
  if (!validPlaces.includes(rowcolString) || gameState.state[rowcolString])
    throw `Cannot place an ${gameState.symbol} here!`;
  gameState.state[rowcolString] = true;
  gameState.cellState[row] += gameState.increment;
  gameState.cellState[column + 3] += gameState.increment;
  if (row === column) gameState.cellState[6] += gameState.increment;
  if (row + column === 2) gameState.cellState[7] += gameState.increment;
}

function evaluateGameState(row, column, user) {
  let winningSymbol;
  let ended = true;
  let resultMessage = `### ***Last Move:*** *${user} placed an **${gameState.symbol}** in **Row ${row} Column ${column}.***`;
  if (gameState.cellState.includes(3)) winningSymbol = "X";
  else if (gameState.cellState.includes(-3)) winningSymbol = "O";
  else ended = false;
  if (ended) resultMessage += ` *As a result **${winningSymbol} Won the Game***`;
  return { ended, resultMessage };
}

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
    saveGameState();
    setComment(`Successfully Handled Input`);
  } catch (err) {
    setComment(err.message || err);
  } finally {
    core.setOutput("comment", comment);
    core.info(comment);
  }
}

playTicTacToe();
