const universeId = '6691764291'; // 🔁 Replace with your Universe ID
const playerCountText = document.getElementById('playerCount');
const refreshButton = document.getElementById('refreshButton');

async function updatePlayerCount() {
  try {
    const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const data = await response.json();
    const count = data.data[0].playing;
    playerCountText.textContent = `Current players: ${count}`;
  } catch (error) {
    playerCountText.textContent = error;
    console.error(error);
  }
}

refreshButton.addEventListener('click', updatePlayerCount);
