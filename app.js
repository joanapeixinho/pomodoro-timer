const bells = new Audio('assets/ring.mp3');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
const settingsBtn = document.querySelector('.btn-settings');
const settingsModal = document.querySelector('.settings-modal');
const saveSettingsBtn = document.querySelector('.btn-save-settings');
const sessionInput = document.getElementById('session-length');

let totalSeconds = 25 * 60;
let myInterval = null;
let isRunning = false;
let isPaused = false;


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
    totalSeconds = parseInt(sessionInput.value) * 60 || 25 * 60;
    updateDisplay();
    isRunning = false;
    isPaused = false;
  });


updateDisplay();

settingsBtn.addEventListener('click', () => {
    if (isRunning && !isPaused) {
      clearInterval(myInterval);
      isPaused = true;
    }
  
    settingsModal.classList.toggle('hidden');
  });
  
  saveSettingsBtn.addEventListener('click', () => {
    const newTime = parseInt(sessionInput.value);
    if (!isNaN(newTime) && newTime >= 1 && newTime <= 60) {
      totalSeconds = newTime * 60;
      updateDisplay();
      settingsModal.classList.add('hidden');
      clearInterval(myInterval);
    } else {
      alert('Please enter a number between 1 and 60.');
    }
  });
  
  function updateDisplay() {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;
    minuteDiv.textContent = `${minutesLeft}`;
    secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
  }