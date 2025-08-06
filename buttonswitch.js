const button = document.getElementById('switchButton');
const paragraph = document.getElementById('buttonText');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.textContent  === 'Turn On') {
    button.textContent  = 'Turn Off';
    paragraph.textContent = 'The button is ON!';
  } else {
    button.textContent  = 'Turn On';
    paragraph.textContent = 'The button is OFF.';
  }
}
