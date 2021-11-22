'use strict';
let gBoard = [['', '', ''], ['', '', ''], ['', '', '']];
let playerTurn = true;
let gameOver = false;
let isVictory;
let turnMoves = 0;

function init() {
    renderBoard();
}

function checkVictory(idx, jdx, symbol) {

    let count = countInRow(idx, symbol);
    if (count === gBoard.length) return true;
    count = countInFile(jdx, symbol);
    if (count === gBoard.length) return true;
    count = countLeftDiag(symbol);
    if (count === gBoard.length) return true;
    count = countRightDiag(symbol);
    if (count === gBoard.length) return true;
    let cellsCount = gBoard.length ** 2;
    if (turnMoves === cellsCount && !isVictory) {
        displayMsg('draw');
        gameOver = true;
    }
    return false;
}

function countInRow(idx, symbol) {
    let count = 0;
    for (let i = 0; i < gBoard.length; i++) {
        let currCell = gBoard[idx];
        if (currCell[i] === symbol) {
            count++;
        }
    }
    return count;
}

function countInFile(jdx, symbol) {
    let count = 0;
    for (let i = 0; i < gBoard.length; i++) {
        let currCell = gBoard[i][jdx];
        if (currCell === symbol) {
            count++;
        }
    }
    return count;
}

function countLeftDiag(symbol) {
    let count = 0;
    for (let i = 0; i < gBoard.length; i++) {
        let currCell = gBoard[i][i];
        if (currCell === symbol) {
            count++;
        }
    }
    return count;
}

function countRightDiag(symbol) {
    let count = 0;
    for (let i = 0; i < gBoard.length; i++) {
        let currCell = gBoard[i][gBoard.length - 1 - i];
        if (currCell === symbol) {
            count++;
        }
    }
    return count;
}

function cellClicked(cell, idx, jdx) {
    let symbol = playerTurn ? 'X' : 'O';
    if (gameOver || cell.innerText !== '') {
        return;
    }
    playerTurn = !playerTurn;
    cell.innerText = symbol;
    gBoard[idx][jdx] = symbol;
    turnMoves++;
    if (turnMoves >= 5) {
        isVictory = checkVictory(idx, jdx, symbol);
        if (isVictory) {
            gameOver = true;
            displayMsg(cell.innerText);
        }
    }
}

function renderBoard() {
    let strHTML = '';
    strHTML = '<tbody>';
    for (let i = 0; i < gBoard.length; i++) {
        strHTML += '<tr class="table-row">';
        for (let j = 0; j < gBoard[i].length; j++) {
            strHTML += `<td class="board-cell" onclick="cellClicked(this, ${i}, ${j})"></td>`;
        }
        strHTML += '</tr>\n';
    }
    strHTML += '</tbody>';
    let elTable = document.querySelector('.game-board');
    elTable.innerHTML = strHTML;
}

function restartGame() {
    let cells = document.querySelectorAll('.board-cell');
    for (let h = 0; h < cells.length; h++) {
        cells[h].innerText = '';
    }
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j] = '';
        }
    }
    clearValues();
}

function displayMsg(symbol) {
    let msg = document.querySelector('.msg');
    msg.innerText = `${symbol} WINS!`;
    if (symbol === 'draw') {
        msg.innerText = 'Draw';
    }
    msg.classList.add('opacity');
}

function clearValues() {
    let msg = document.querySelector('.msg');
    msg.classList.remove('opacity');
    gameOver = false;
    turnMoves = 0;
    playerTurn = true;
}