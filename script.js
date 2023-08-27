"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const player0Name = document.querySelector("#name--0");
const player1Name = document.querySelector("#name--1");
const player0Input = document.querySelector("#input-name--0");
const player1Input = document.querySelector("#input-name--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

/// First

console.log(player0Name);

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0Name.addEventListener("dblclick", () => {
    player0Name.classList.add("hidden");
    player0Input.classList.remove("hidden");
    player0Input.focus();
  });
  player0Input.addEventListener("focusout", () => {
    player0Name.textContent = player0Input.value;
    player0Name.classList.remove("hidden");
    player0Input.classList.add("hidden");
  });
  player1Name.addEventListener("dblclick", () => {
    player1Name.classList.add("hidden");
    player1Input.classList.remove("hidden");
    player1Input.focus();
  });
  player1Input.addEventListener("focusout", () => {
    player1Name.textContent = player1Input.value;
    player1Name.classList.remove("hidden");
    player1Input.classList.add("hidden");
  });
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

/// Dice Function
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to avtive player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
