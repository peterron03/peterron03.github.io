const button = document.querySelector('input');
const paragraph = document.querySelector('p');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'Turn On') {
    button.value = 'Turn Off';
    paragraph.textContent = 'The button is ON!';
  } else {
    button.value = 'Turn On';
    paragraph.textContent = 'The button is OFF.';
  }
}
