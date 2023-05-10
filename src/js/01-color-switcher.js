refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn : document.querySelector('[data-stop]'),
}
let timerID = null;

refs.startBtn.addEventListener('click', onStartClick);

refs.stopBtn.addEventListener('click', onStopClick);

function onStartClick() {
    timerID = setInterval(() => {
    let color = getRandomHexColor();
    refs.body.style.backgroundColor = color;
    }, 1000);

    refs.startBtn.setAttribute("disabled", "disabled");
    refs.stopBtn.removeAttribute("disabled");
};

function onStopClick() {
    clearInterval(timerID);

    refs.startBtn.removeAttribute("disabled");
    refs.stopBtn.setAttribute("disabled", "disabled");

};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };
