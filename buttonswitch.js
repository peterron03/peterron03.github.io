const button = document.querySelector('switchButton');
const paragraph = document.querySelector('buttonText');

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
