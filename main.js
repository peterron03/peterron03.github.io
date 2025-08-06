const combinedVisits = document.getElementById('combinedPlaceVisits');
const combinedFavorites = document.getElementById('combinedPlaceFavorites');
const combinedPlayers = document.getElementById('combinedPlayerCount');

const gameLabels = {
  "6691764291": {
    name: document.getElementById('gameName'),
    visits: document.getElementById('placeVisits'),
    favoritedCount: document.getElementById('placeFavorites'),
    playing: document.getElementById('playerCount'),
  },

  "7254273783": {
    name: document.getElementById('gameName2'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
  },

  "7595032117": {
    name: document.getElementById('gameName2'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
  },

  "3688802054": {
    name: document.getElementById('gameName2'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
  }
}

const labelNames = {
  name: "",
  visits: "visits",
  favoritedCount: "favorites",
  playing: "players",
}

async function updatePlayerCountNew() {
  combinedVisits.textContent = "Loading...";
  combinedFavorites.textContent = "Loading...";
  combinedPlayers.textContent = "Loading...";

  let combinedStats = {
    visits: 0,
    favoritedCount: 0,
    playing: 0,
  }

  for (const gameId in gameLabels) {
    if (gameLabels.hasOwnProperty(gameId)) {
      const labels = gameLabels[gameId];
    
      for (const key in labels) {
        if (labels.hasOwnProperty(key)) {
          labels[key].textContent = "Loading...";
        }
      }
      
      try {
        const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${gameId}`);
        const data = await response.json();
  
        for (const key in labels) {
          if (labels.hasOwnProperty(key)) {
            labels[key].textContent = `${data.data[0][key]} ${labelNames[key]}`;

            if (combinedStats.hasOwnProperty(key)) {
              combinedStats[key] += Number(data.data[0][key]);
            }
          }
        }
      } catch (error) {
        labels.name.textContent = `Error: ${error.message}`;
      }
    }
  }

  combinedVisits.textContent = combinedStats.visits;
  combinedFavorites.textContent = combinedStats.favoritedCount;
  combinedPlayers.textContent = combinedStats.playing;
}

/* async function updatePlayerCount() {
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
    const playerCount = data.data[0].playing;
    gameNameText.textContent = gameName;
    playerCountText.textContent = `${playerCount} players`;
    visitsText.textContent = `${visits} visits`;
    favoritesText.textContent = `${favorites} favorites`;
  } catch (error) {
    playerCountText.textContent = `Error: ${error.message}`;
    console.error(error);
  }
} */

refreshButton.addEventListener('click', updatePlayerCountNew);

updatePlayerCountNew();
