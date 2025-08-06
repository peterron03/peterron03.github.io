const button = document.getElementById('switchButton');
const paragraph = document.getElementById('buttonText');

let status = Number(localStorage.getItem("buttonClicks1")) || 0;
paragraph.textContent = `The Button has been clicked ${status} times`;

button.addEventListener('click', () => {
  const r = Math.round(Math.random() * 255)
  const g = Math.round(Math.random() * 255)
  const b = Math.round(Math.random() * 255)

  button.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
  status += 1;
  localStorage.setItem("buttonClicks1", status);
  paragraph.textContent = `The Button has been clicked ${status} times`;
});
