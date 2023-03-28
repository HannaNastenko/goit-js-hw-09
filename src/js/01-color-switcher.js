const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

setAttr(btnStop);

function onStart(event) {
  changeBgColor();

  timerId = setInterval(() => {
    changeBgColor();
  }, 1000);

  setAttr(btnStart);
  removeAttr(btnStop);
}

function onStop() {
  clearInterval(timerId);
  removeAttr(btnStart);
  setAttr(btnStop);
}

function removeAttr(elem) {
  elem.removeAttribute('disabled');
}

function setAttr(elem) {
  elem.setAttribute('disabled', true);
}

function changeBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
