const button = document.getElementById('switchButton');
const paragraph = document.getElementById('buttonText');

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
