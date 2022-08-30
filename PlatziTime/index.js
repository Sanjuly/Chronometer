let minutesSpan = document.querySelector("#minutes");
let secondsSpan = document.querySelector("#seconds");
const chronometerButton = document.querySelector("#chronometer-button");
const timerButton = document.querySelector("#timer-button");
const alarmsButton = document.querySelector("#alarms-button");
const hero = document.querySelector("#principal");

let minutesValue = 0;
let secondsValue = 0;
let currentButton;
let currentInterval;
let currentPomodoro;



function startChronometer() {
    currentButton = event.target;
    currentButton.disabled = true;
    currentInterval = setInterval(()=> {
        secondsValue +=1
        if (secondsValue === 60) {
            secondsValue = 0
            minutesValue +=1
            minutesSpan.textContent = formatValue(minutesValue);
        }
        secondsSpan.textContent = formatValue(secondsValue);
    }, 1000);
}

function formatValue(value) {
    return ("0" + value).slice(-2);
}

function stopChronometer() {
    if (currentButton) {
    currentButton.disabled = false;
    }
    clearInterval(currentInterval)
}
function resetChronometer() {
    secondsValue = 0;
    minutesValue = 0;
    secondsSpan.textContent = "00"
    minutesSpan.textContent = "00"
}
function executeChronometer() {
    hero.innerHTML = `
    <h1 class="hero--title">Chronometer</h1>
    <div class="hero--time">
      <p id="time"><span id="minutes">00</span><span>:</span><span id="seconds">00</span></p>
    </div>
    <div class="hero--button">
      <button onclick="startChronometer()" class="button hero--button1" type="button">Start</button>
      <button onclick="stopChronometer()" class="button hero--button2" type="button">Stop</button>
      <button onclick="resetChronometer()" class="button hero--button3" type="button">Reset</button>
    </div>
    `;
    secondsSpan = document.querySelector("#seconds");
    minutesSpan = document.querySelector("#minutes");
  }
  
  function executeTimer() {
    hero.innerHTML = `
      <h1 class="hero--title">Timer</h1>
      <div class="hero--time">
        <p id="time"><span id="minutes">00</span><span>:</span><span id="seconds">00</span></p>
      </div>
      <div class="hero--button">
          <form onsubmit="startTimer()" >
            <input type="number" placeholder="Minutos" id="minutesInput" name="minutes" > 
            <input type="number" placeholder="Segundos" id="secondsInput" name="seconds" > 
            <button class="button hero--button1 type="submit">Start</button>
          </form>
      </div>
    `;
    secondsSpan = document.querySelector("#seconds");
    minutesSpan = document.querySelector("#minutes");
  }
  function startTimer() {
    event.preventDefault();
    const minutes = parseInt(event.target.minutes.value);
    const seconds = parseInt(event.target.seconds.value);
  
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
    secondsValue = seconds;
    minutesValue = minutes;
  
    currentInterval = setInterval(() => {
      secondsValue -= 1;
      if (secondsValue === -1) {
        secondsValue = 59;
        minutesValue -= 1;
      }
      if (minutesValue === 0 && secondsValue === 0) {
        const container = document.querySelector(".hero--time");
        const title = document.createElement("h2");
        title.textContent = "El timer ha terminado";
        container.appendChild(title);
        clearInterval(currentInterval); 
      }
      minutesSpan.textContent = formatValue(minutesValue);
      secondsSpan.textContent = formatValue(secondsValue);
    }, 1000);
  }
  function executePomodoro() {
    hero.innerHTML = `
    <h1 class="hero--title">Pomodoro</h1>
      <div class="hero--time">
        <p id="time"><span id="minutes">25</span><span>:</span><span id="seconds">00</span></p>
      </div>
      <div class="hero--button">
        <button class="button hero--button1 type="button" onclick="startPomodoro()" >Start</button>
        <button class="button hero--button2 type="button" onclick="stopPomodoro()" >Stop</button>
      </div>
    `;
    secondsSpan = document.querySelector("#seconds");
    minutesSpan = document.querySelector("#minutes");
  }
  
  function startPomodoro() {
    currentPomodoro = event.target;
    currentPomodoro.disabled = true;
    minutesValue = 25;
    secondsValue = 0;

    currentInterval = setInterval(() => {
      secondsValue -= 1;
      if (secondsValue === -1) {
        secondsValue = 59;
        minutesValue -= 1;
        minutesSpan.textContent = formatValue(minutesValue);
      }
      if (minutesValue === 0 && secondsValue === 0) {
        const container = document.querySelector(".hero--time");
        const title = document.createElement("h2");
        title.textContent = "El pomodoro ha terminado";
        document.title = "Se terminó el pomodoro";
        container.appendChild(title);
        clearInterval(currentInterval);
        alert("Se acabo el pomodoro");  
      }
      secondsSpan.textContent = formatValue(secondsValue);
    }, 1000);
  }
  
function stopPomodoro(){
  if (currentPomodoro) {
    currentPomodoro.disabled = false;
    } 
  clearInterval(currentInterval)
  }