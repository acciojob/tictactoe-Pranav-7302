let player1 = "";
let player2 = ""; 
let currentPlayer = ""; 
let board = ["", "", "", "", "", "", "", "", ""];

// This function is used for deciding who starts first
function getStartingPlayer(){
    return Math.floor(Math.random() * 2) + 1;
}

// Event Listener for form submission in the game
document.getElementById("playerForm").addEventListener("submit", function(event){
    event.preventDefault();

    player1 = document.getElementById('player1').value; // Make sure the ID here matches your HTML
    player2 = document.getElementById('player2').value;

    console.log("Player 1: " + player1);
    console.log("Player 2: " + player2);

    // Randomly select the starting player
    currentPlayer = (getStartingPlayer() === 1) ? player1 : player2;
    document.getElementById("currentPlayer").innerHTML = currentPlayer + ", you're up";

    // Hide the form and show the game board after submit player details
    document.getElementById("playerForm").classList.add("hidden"); 
    document.getElementById("gameBoard").classList.remove("hidden");

    // Clear any previous victory message
    document.getElementById("victoryMessage").innerHTML = "";
});

// This function is used for switching turn one by one
function switchTurn(){
    currentPlayer = (currentPlayer === player1) ? player2 : player1; 
    document.getElementById("currentPlayer").innerHTML = currentPlayer + ", you're up";
}

function makeMove(cellIndex){
    if (board[cellIndex] === "") { 
        board[cellIndex] = currentPlayer; 
        document.getElementById("cell-" + cellIndex).innerHTML = currentPlayer === player1 ? "X" : "O"; 

        if (checkWin()) { 
            document.getElementById("victoryMessage").innerHTML = currentPlayer.trim()
        } else if (board.every(cell => cell !== "")) { 
            document.getElementById("victoryMessage").innerHTML = "It's a draw!";
        } else { 
            switchTurn();
        } 
    }
}

// Function to check if a player has won
function checkWin() {
    const winningCombinations = [ 
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => { 
        return combination.every(index => board[index] === currentPlayer); 
    });
}

function resetGame() { 
    board = ["", "", "", "", "", "", "", "", ""]; 
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = ""); 
    document.getElementById("playerForm").classList.remove("hidden"); 
    document.getElementById("gameBoard").classList.add("hidden"); 
    document.getElementById("currentPlayer").innerHTML = ""; 
}

// Add event listeners to all cells
document.querySelectorAll(".cell").forEach((cell, index) => { 
    cell.addEventListener("click", () => makeMove(index)); 
});
