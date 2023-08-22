// Initialize socket io client side
const socket = io();

// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const messages = document.getElementById('messages');
//
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', input.value);
//         input.value = '';
//     }
// });
//
// socket.on('chat message', function(msg) {
//     const item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });

let userRole = "";
let gameStart = false;
let gameArray = ["", "", "", "", "", "", "", "", ""];
const squares = [...document.getElementsByClassName("col")];
const header = document.getElementById("userRole");

squares.forEach((el, index) => {
   el.addEventListener("click", () => {
       if (gameStart && el.classList.value.includes("selectable")) {
           updateSquare(index, userRole);
           socket.emit("move", index, userRole);

       }
   });
});

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

    header.innerText = `You are: ${userRole}`
});

socket.on("update", (index, letter) => {
    gameArray[index] = letter;
    updateSquare(index, letter);
});