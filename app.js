
const hourE1 = document.getElementById("hour")
const minuteE1 = document.getElementById("minute")
const secondE1 = document.getElementById("second")
const ampmE1 = document.getElementById("ampm")

const backgrounds = {
  morning: "first.png",   // 7:00 – 13:59
  afternoon: "second.jpg", // 14:00 – 18:59
  evening: "third.png",   // 19:00 – 22:59
  night: "fourth.png"     // 23:00 – 6:59
};

function setBackgroundByHour(hour24) {
  let bg;

  if (hour24 >= 7 && hour24 < 14) {
    // 7:00 - 13:59
    bg = backgrounds.morning;
  } else if (hour24 >= 14 && hour24 < 19) {
    // 14:00 - 18:59
    bg = backgrounds.afternoon;
  } else if (hour24 >= 19 && hour24 < 23) {
    // 19:00 - 22:59
    bg = backgrounds.evening;
  } else {
    // 23:00 - 6:59
    bg = backgrounds.night;
  }

  document.body.style.backgroundImage = `url("${bg}")`;
}

function updateClock() {
  const hour24 = now.getHours();  // 0-23
  let h = hour24;
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();
  let ampm = "AM"

  
  if (h > 12) {
    h = h - 12;
    ampm = 'PM';
  } /*else if (h <= 12) {
    ampm = 'AM';
  }*/

    if (h === 0) {
    h = 12;       // midnight → 12 AM
  } else if (h > 12) {
    h = h - 12;   // 13-23 → 1-11 PM
  }

  h = h<10 ? "0" + h : h;
  m = m<10 ? "0" + m : m;
  s = s<10 ? "0" + s : s;

  hourE1.innerText = h;
  minuteE1.innerText = m;
  secondE1.innerText = s;
  ampmE1, (innerText = ampm); // почему здесь дужки.

  setBackgroundByHour(hour24);

  setTimeout(() => {
    updateClock();
  }, 1000);
}

updateClock();

const timerDisplay = document.getElementById('timerDisplay');

    const configControls = document.getElementById('configControls');
    const runningControls = document.getElementById('runningControls');

    const add5Btn = document.getElementById('add5');
    const add10Btn = document.getElementById('add10');
    const sub5Btn = document.getElementById('sub5');
    const sub10Btn = document.getElementById('sub10');

    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const stopBtn = document.getElementById('stopBtn');
    const continueBtn = document.getElementById('continueBtn');

    let presetSeconds = 0;     // Time set by user via +/- buttons (in seconds)
    let remainingSeconds = 0;  // Time currently counting down (in seconds)
    let timerInterval = null;
    let isRunning = false;

    function updateDisplay() {
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      timerDisplay.textContent = `${mm}:${ss}`;
    }

    // Change time by deltaSeconds, clamp at 0
    function changeTime(deltaSeconds) {
      remainingSeconds = Math.max(0, remainingSeconds + deltaSeconds);
      presetSeconds = remainingSeconds; // keep preset equal to what's visible
      updateDisplay();
    }

    function showConfigMode() {
      configControls.classList.remove('hidden');
      runningControls.classList.add('hidden');
      continueBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
    }

    function showRunningMode() {
      configControls.classList.add('hidden');
      runningControls.classList.remove('hidden');
      continueBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
    }

    function startCountdown() {
      if (remainingSeconds <= 0) return; // nothing to count down

      isRunning = true;
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds -= 1;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          timerInterval = null;
          isRunning = false;
          // Timer reached 0 and stops.
          // User can press Restart to go back to the originally set time.
        }
      }, 1000);
    }

    function stopCountdown() {
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      isRunning = false;
    }

    // --- Button events ---

    add5Btn.addEventListener('click', () => changeTime(5 * 60));
    add10Btn.addEventListener('click', () => changeTime(10 * 60));
    sub5Btn.addEventListener('click', () => changeTime(-5 * 60));
    sub10Btn.addEventListener('click', () => changeTime(-10 * 60));

    // Start: begin countdown with all previously set time, hide +/- buttons, show Restart & Stop
    startBtn.addEventListener('click', () => {
      if (remainingSeconds <= 0) return;
      // Ensure preset remembers this start configuration
      presetSeconds = remainingSeconds;
      showRunningMode();
      startCountdown();
    });

    // Restart: stop countdown, reset to time as it was set before Start,
    // show +/- and Start again
    restartBtn.addEventListener('click', () => {
      stopCountdown();
      remainingSeconds = presetSeconds;
      updateDisplay();
      showConfigMode();
    });

    // Stop: pause countdown, switch to Continue button
    stopBtn.addEventListener('click', () => {
      if (!isRunning && remainingSeconds <= 0) return;
      stopCountdown();
      stopBtn.classList.add('hidden');
      continueBtn.classList.remove('hidden');
    });

    // Continue: resume countdown from where it was stopped
    continueBtn.addEventListener('click', () => {
      if (remainingSeconds <= 0) return;
      continueBtn.classList.add('hidden');
      stopBtn.classList.remove('hidden');
      startCountdown();
    });

    // Initial display
    updateDisplay();


    const backgrounds = [
      "first.png", // image 1
      "second.png"// image 2
    ];

    let currentIndex = 0;

    const toggleBgBtn = document.getElementById("toggleBgBtn");

    button.addEventListener("click", function () {
      // Toggle between 0 and 1
      currentIndex = (currentIndex + 1) % backgrounds.length;

      // Apply new background
      document.body.style.backgroundImage = `url("${backgrounds[currentIndex]}")`;
    });

