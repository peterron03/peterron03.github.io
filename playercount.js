document.addEventListener('DOMContentLoaded', () => {
  const playerCountText = document.getElementById('playerCount');
  const refreshButton = document.getElementById('refreshButton');

  async function updatePlayerCount() {
    playerCountText.textContent = "Loading...";
    try {
      const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=6691764291`);
      const data = await response.json();
      const count = data.data[0].playing;
      playerCountText.textContent = `Current players: ${count}`;
    } catch (error) {
      playerCountText.textContent = `Error: ${error.message}`;
      console.error(error);
    }
  }

  refreshButton.addEventListener('click', updatePlayerCount);

  // Run immediately after page loads
  updatePlayerCount();
});
