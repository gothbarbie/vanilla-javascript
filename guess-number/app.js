// Values
let min = 1
let max = 10
let winningNum = getRandomNum(min, max)
let guessesLeft = 3

// UI Elements
const gameEl = document.getElementById('game')
const minNumEl = document.querySelector('.min-num')
const maxNumEl = document.querySelector('.max-num')
const guessBtnEl = document.getElementById('guess-btn')
const guessInputEl = document.getElementById('guess-input')
const messageEl = document.querySelector('.message')

// Assign
minNumEl.textContent = min
maxNumEl.textContent = max

gameEl.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

guessBtnEl.addEventListener('click', function() {
  let guess = parseInt(guessInputEl.value)

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, '#F00')
  }

  if (guess === winningNum) {
    // Win!
    gameOver(true, `${winningNum} is correct! You win!`)
  } else {
    // Wrong
    guessesLeft -= 1

    if (guessesLeft === 0) {
      // Game over
      gameOver(
        false,
        `${guess} is wrong. Game over. The correct number was ${winningNum}.`
      )
    } else {
      setMessage(`${guess} is not the one...`, '#000')
    }
  }
})

function gameOver(won, msg) {
  let color
  won === true ? (color = '#070') : (color = '#F00')

  guessInputEl.disabled = true
  guessInputEl.style.borderColor = color
  messageEl.style.color = color
  setMessage(msg, color)

  guessBtnEl.value = 'Play Again'
  guessBtnEl.className += 'play-again'
}

// Set Message
function setMessage(msg, color) {
  messageEl.style.color = color
  messageEl.textContent = msg
}

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
