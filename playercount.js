const gameNameText = document.getElementById('gameName');
const visitsText = document.getElementById('placeVisits');
const favoritesText = document.getElementById('placeFavorites');
const playerCountText = document.getElementById('playerCount');
const refreshButton = document.getElementById('refreshButton');

async function updatePlayerCount() {
  gameNameText.textContent = "Loading...";
  playerCountText.textContent = "Loading...";
  visitsText.textContent = "Loading...";
  favoritesText.textContent = "Loading...";
  try {
    const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=6691764291`);
    const data = await response.json();
    const gameName = data.data[0].name;
    const visits = data.data[0].visits;
    const favorites = data.data[0].favoritedCount;
    const count = data.data[0].playing;
    gameNameText.textContent = gameName;
    playerCountText.textContent = `${count} players`;
    visitsText.textContent = `${count} visits`;
    favoritesText.textContent = `${count} favorites`;
  } catch (error) {
    playerCountText.textContent = `Error: ${error.message}`;
    console.error(error);
  }
}

refreshButton.addEventListener('click', updatePlayerCount);

updatePlayerCount();
