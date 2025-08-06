const combinedVisits = document.getElementById('combinedPlaceVisits');
const combinedFavorites = document.getElementById('combinedPlaceFavorites');
const combinedPlayers = document.getElementById('combinedPlayerCount');
const refreshButton = document.getElementById('refreshButton');

const gameLabels = {
  "6691764291": {
    name: document.getElementById('gameName'),
    visits: document.getElementById('placeVisits'),
    favoritedCount: document.getElementById('placeFavorites'),
    playing: document.getElementById('playerCount'),
    url: "https://www.roblox.com/games/80342862330041/Liars-Table",
  },

  "7254273783": {
    name: document.getElementById('gameName2'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
    url: "https://www.roblox.com/games/80342862330041/Liars-Table",
  },

  "7595032117": {
    name: document.getElementById('gameName3'),
    visits: document.getElementById('placeVisits3'),
    favoritedCount: document.getElementById('placeFavorites3'),
    playing: document.getElementById('playerCount3'),
    url: "https://www.roblox.com/games/80342862330041/Liars-Table",
  },

  "3688802054": {
    name: document.getElementById('gameName4'),
    visits: document.getElementById('placeVisits4'),
    favoritedCount: document.getElementById('placeFavorites4'),
    playing: document.getElementById('playerCount4'),
    url: "https://www.roblox.com/games/80342862330041/Liars-Table",
  }
}

const labelNames = {
  name: "",
  visits: "visits",
  favoritedCount: "favorites",
  playing: "players",
}

function addCommas(number) {
  if (isNaN(number)) return number
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
          if (key == "url") {
            labels.name.href = labels.url;
          } else if (labels.hasOwnProperty(key)) {
            labels[key].textContent = `${addCommas(data.data[0][key])} ${labelNames[key]}`;

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

  combinedVisits.textContent = `${addCommas(Number(combinedStats.visits))} visits`;
  combinedFavorites.textContent = `${addCommas(Number(combinedStats.favoritedCount))} favorites`;
  combinedPlayers.textContent = `${addCommas(Number(combinedStats.playing))} players`;
}

refreshButton.addEventListener('click', updatePlayerCountNew);

updatePlayerCountNew();
