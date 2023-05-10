const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerID = null;

startBtn.addEventListener('click', onStartClick);

stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
    timerID = setInterval(() => {
    let color = getRandomHexColor();
    body.style.backgroundColor = color;
    }, 1000);

    startBtn.setAttribute("disabled", "disabled");
    stopBtn.removeAttribute("disabled");
};

function onStopClick() {
    clearInterval(timerID);

    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "disabled");

};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };
