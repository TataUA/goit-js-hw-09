import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const dataValue = {};

  for([key, value] of formData.entries()) {
    dataValue[key] = +value;
  }
  let {delay, step, amount} = dataValue;

  for(let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
  formEl.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
      resolve({position, delay});
      } else {
      reject({position, delay});
      }
    }, delay);
  });
}