let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('.reset-btn');
let newGameButton = document.querySelector('.new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('.msg');
let turn0 = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const reset = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetButton.classList.remove("hidden");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "X";
            box.style.color = "red";
            turn0 = false;
        } else {
            box.innerText = "O";
            box.style.color = "black";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color = "";

    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetButton.classList.add("hidden");
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetButton.classList.add("hidden");
};

const checkWinner = () => {
    let isDraw = true;
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;
        if (pos1Value === pos2Value && pos2Value === pos3Value && pos1Value !== "") {
            showWinner(pos1Value);
            return;
        }
    }
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        showDraw();
    }
};

newGameButton.addEventListener("click", reset);
resetButton.addEventListener("click", reset);