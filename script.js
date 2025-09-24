const btn = document.getElementById("submit");
const d1 = document.getElementById("start-screen");
const winningCombinations = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];

btn.addEventListener("click", () => {
	const p1 = document.getElementById("player1").value;
	const p2 = document.getElementById("player2").value;
	
	if (!p1 || !p2) return alert("Both players required!");
	d1.style.display = "none";

	showBoard(p1, p2);
})

function showBoard(p1, p2) {
	const gameBoard = document.getElementById("game-board");
	const message = document.querySelector(".message");

	gameBoard.style.display = "block";
	let currentPlayer = "x";
	let currentName = p1;
	message.textContent = `${p1}, you're up`;

	const cells = document.querySelectorAll(".cell");

	cells.forEach(cell => { 
		cell.addEventListener("click", () => {
			if (cell.textContent !== "") return;
			
		    cell.textContent = currentPlayer;

			if (checkWin(currentPlayer)) {
			    message.textContent = `${currentName} congratulations you won!`;
			    cells.forEach(c => c.style.pointerEvents = 'none');
			    return;
			}
			
		    if (currentPlayer === "x") {
			    currentPlayer = "o";
		        currentName = p2;
			} else {
			    currentPlayer = "x";
		        currentName = p1;
		    }
		
		    message.textContent = `${currentName}, you're up`;
		});
  });
}

function checkWin(currentPlayer) {
	return winningCombinations.some(combination => {
		return combination.every(id => {
		    const cell = document.getElementById(id);
		    return cell.textContent === currentPlayer;
		});
	});
}