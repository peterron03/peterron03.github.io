const button = document.getElementById('switchButton');
const paragraph = document.getElementById('buttonText');

// Initialize display
let status = Number(localStorage.getItem("buttonClicks1")) || 0;
paragraph.textContent = `The Button has been clicked ${status} times`;

button.addEventListener('click', () => {
  status += 1;
  localStorage.setItem("buttonClicks1", status);
  paragraph.textContent = `The Button has been clicked ${status} times`;
});
