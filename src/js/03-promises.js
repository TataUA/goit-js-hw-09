import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const dataValue = {};

  for(const [key, value] of formData.entries()) {
    dataValue[key] = +value;
  }  
  let {delay, step, amount} = dataValue;
  
  if(delay < 0 || step < 0 || amount <= 0) {
    return Notify.failure(`Sorry, you entered incorrect data`);
  }

  for(let i = 1; i <= amount; i += 1) {
     createPromise(i, delay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
  }
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