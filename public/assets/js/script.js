// Initialize socket io client side
const socket = io();

let userRole = "";
let gameStart = false;
let gameArray = ["", "", "", "", "", "", "", "", ""];
let winner = "";
const squares = [...document.getElementsByClassName("col")];
const header = document.getElementById("userRole");

squares.forEach((el, index) => {
   el.addEventListener("click", () => {
       if (gameStart && el.classList.value.includes("selectable")) {
           gameArray[index] = userRole;
           updateSquare(index, userRole);
           const isWin = playerWin();

           if (isWin) {
               header.innerText = `Player ${winner} wins!`;
           } else {
               socket.emit("move", index, userRole);
           }
       }
   });
});

const playerWin = () => {
    let x = [];
    let o = [];

    for (let i = 0; i < gameArray.length; i++) {
        if (gameArray[i] === "X") {
            x.push(i)
        } else if (gameArray[i] === "O") {
            o.push(i)
        }
    }

    // Possible wins
    if (x.length > 3 || o.length > 3) {
        const possibleWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

        for (let i = 0; i < possibleWins.length; i++) {
            if (possibleWins[i].every(value => x.includes(value))) {
                winner = "X"
            } else if (possibleWins[i].every(value => o.includes(value))) {
                winner = "O"
            }
        }

        return !!winner;
    }
}

const updateSquare = (index, letter) => {
    const element = squares[index];

    element.classList.remove("selectable");
    element.classList.remove("hide");
    element.classList.add(letter === userRole ? "green" : "red");
    element.innerText = letter;
}

header.innerText = "Waiting for players...";

socket.on("start", (user) => {
   gameStart = true;
   userRole = user;
   header.innerText = `You are: ${userRole}`;
});

socket.on("end", () => {
    gameArray = ["", "", "", "", "", "", "", "", ""];

    squares.forEach(el => {
       el.classList.remove("green");
       el.classList.remove("red");
       el.classList.add("selectable");
       el.classList.add("hide");
       el.innerText = "A";
    });

   gameStart = false;
   userRole = "";
   header.innerText = "Waiting for players...";
});

socket.on("update", (index, letter) => {
    gameArray[index] = letter;
    updateSquare(index, letter);
});