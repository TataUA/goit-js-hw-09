import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import convertMs from './convertMs.js';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('[data-start]');
      startBtn.setAttribute('disabled', 'disabled');

let finalDate = null;
let timeDifference = null;
let intervalId = null;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    finalDate = selectedDates[0].getTime();
    if(finalDate < currentDate) {
    Notify.failure('Please choose a date in the future');
    startBtn.setAttribute('disabled', 'disabled');
    return;
    } else {
      clearInterval(intervalId);
      startBtn.removeAttribute('disabled');
    }
  },
});

startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  startBtn.setAttribute('disabled', 'disabled');
  intervalId = setInterval(handleTime, 1000);
};

function handleTime() {
  const dateNow = Date.now();
  timeDifference = finalDate - dateNow;
  
  if (timeDifference <= 0) {
    clearInterval(intervalId);
    timeDifference = 0;
  }
  addLeadingZero();
}

function addLeadingZero() {
  const {days, hours, minutes, seconds} = convertMs(timeDifference);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}