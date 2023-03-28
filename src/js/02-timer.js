import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

disable(true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (selectedDates[0] <= currentTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    Notiflix.Notify.success('Please, click the button to start the timer');
    disable(false);
    console.log(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

btnStart.addEventListener('click', onStart);

function onStart() {
  disable(true);

  timerId = setInterval(() => {
    const timeStart = Date.now();

    let timeEnd = inputEl.value;
    timeEnd = Date.parse(timeEnd);

    const deltaTime = timeEnd - timeStart;

    const time = convertMs(deltaTime);
    updateTimer(time);

    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function disable(bool) {
  btnStart.disabled = bool;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
