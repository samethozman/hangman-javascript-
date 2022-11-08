let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const buttonContainer = document.querySelector(".buttons");

for (let i = 0; i < alphabet.length; i++) {
  const button = document.createElement("button");
  button.textContent = alphabet[i];
  button.classList.add("btn");
  buttonContainer.appendChild(button);
}

let word = "";
let lives = 10;

fetch("https://random-word-api.herokuapp.com/word?number=1")
  .then((response) => response.json())
  .then((data) => {
    word = data[0];
    console.log(word);
    const wordContainer = document.querySelector(".word");
    for (let i = 0; i < word.length; i++) {
      const letter = document.createElement("span");
      letter.textContent = "_";
      letter.classList.add("letter");

      wordContainer.appendChild(letter);
    }
  });

const hintButton = document.getElementById("hint");
hintButton.addEventListener("click", () => {
  const wordContainer = document.querySelector(".word");
  const letters = wordContainer.querySelectorAll(".letter");
  for (let i = 0; i < letters.length; i++) {
    // user can only get two hints
    if (letters[i].textContent === "_") {
      letters[i].textContent = word[i];
      break;
    }
  }
});

const checkLetter = (e) => {
  const letter = e.target.textContent;
  const letters = document.querySelectorAll(".letter");

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      letters[i].textContent = letter;
    }
  }
};
let livesContainer = document.getElementById(".myLives");
let livesText = document.getElementById("lives");
livesText.textContent = `${lives}`;

const canvas = document.getElementById("hangman");
const context = canvas.getContext("2d");

clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

Draw = (part) => {
  switch (part) {
    case "gallows":
      context.strokeStyle = "#fff";
      context.lineWidth = 10;
      context.beginPath();
      context.moveTo(175, 225);
      context.lineTo(5, 225);
      context.moveTo(40, 225);
      context.lineTo(25, 5);
      context.lineTo(100, 5);
      context.lineTo(100, 25);
      context.stroke();
      break;

    case "head":
      context.lineWidth = 5;
      context.beginPath();
      context.arc(100, 50, 25, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      break;

    case "body":
      context.beginPath();
      context.moveTo(100, 75);
      context.lineTo(100, 140);
      context.stroke();
      break;

    case "rightHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(60, 100);
      context.stroke();
      break;

    case "leftHarm":
      context.beginPath();
      context.moveTo(100, 85);
      context.lineTo(140, 100);
      context.stroke();
      break;

    case "rightLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(80, 190);
      context.stroke();
      break;

    case "rightFoot":
      context.beginPath();
      context.moveTo(82, 190);
      context.lineTo(70, 185);
      context.stroke();
      break;

    case "leftLeg":
      context.beginPath();
      context.moveTo(100, 140);
      context.lineTo(125, 190);
      context.stroke();
      break;

    case "leftFoot":
      context.beginPath();
      context.moveTo(122, 190);
      context.lineTo(135, 185);
      context.stroke();
      break;
  }
};

const draws = [
  "gallows",
  "head",
  "body",
  "rightHarm",
  "leftHarm",
  "rightLeg",
  "leftLeg",
  "rightFoot",
  "leftFoot",
];
var step = 0;

const wrongLetter = (e) => {
  const letter = e.target.textContent;
  if (!word.includes(letter)) {
    lives--;
    console.log(lives);
    livesText.textContent = `${lives}`;
    Draw(draws[step]);
    step++;
  }

  if (lives === 0) {
    vNotify.warning({
      title: "Game Over",
      text: "You lost",
      position: "top-right",
    });
    document.querySelectorAll(".btn").forEach((btn)=>{
      btn.disabled=true;
      btn.style.backgroundColor = "gray";
    })
    hintButton.disabled = true
    hintButton.style.backgroundColor = "gray";

  }
};

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", checkLetter);
  button.addEventListener("click", wrongLetter);
});



const resetGame = (e) => {
  location.reload();
};

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);
