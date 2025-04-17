const bells = new Audio('assets/ring.mp3');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');

let totalSeconds = 25 * 60;
let myInterval = null;
let isRunning = false;
let isPaused = false;

function updateDisplay() {
  const minutesLeft = Math.floor(totalSeconds / 60);
  const secondsLeft = totalSeconds % 60;
  minuteDiv.textContent = String(minutesLeft).padStart(2, '0');
  secondDiv.textContent = String(secondsLeft).padStart(2, '0');
}

function updateSeconds() {
  if (totalSeconds > 0) {
    totalSeconds--;
    updateDisplay();
  } else {
    clearInterval(myInterval);
    bells.play();
    isRunning = false;
  }
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    myInterval = setInterval(updateSeconds, 1000);
    isRunning = true;
    isPaused = false;
  } else if (isPaused) {
    myInterval = setInterval(updateSeconds, 1000);
    isPaused = false;
  } else {
    alert('Session is already running.');
  }
});

pauseBtn.addEventListener('click', () => {
  if (isRunning && !isPaused) {
    clearInterval(myInterval);
    isPaused = true;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(myInterval);
  totalSeconds = 25 * 60;
  updateDisplay();
  isRunning = false;
  isPaused = false;
});


updateDisplay();
