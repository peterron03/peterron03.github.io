const combinedVisits = document.getElementById('combinedPlaceVisits');
const combinedFavorites = document.getElementById('combinedPlaceFavorites');
const combinedPlayers = document.getElementById('combinedPlayerCount');
const refreshButton = document.getElementById('refreshButton');

const gameLabels = {
  "6691764291": {
    name: document.querySelector('#gameName a'),
    visits: document.getElementById('placeVisits'),
    favoritedCount: document.getElementById('placeFavorites'),
    playing: document.getElementById('playerCount'),
    url: "https://www.roblox.com/games/80342862330041/Liars-Table",
  },

  "7254273783": {
    name: document.querySelector('#gameName2 a'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
    url: "https://www.roblox.com/games/112221376891112/Egg-Hunt-Obby",
  },

  "7595032117": {
    name: document.querySelector('#gameName3 a'),
    visits: document.getElementById('placeVisits3'),
    favoritedCount: document.getElementById('placeFavorites3'),
    playing: document.getElementById('playerCount3'),
    url: "https://www.roblox.com/games/101594057349002/True-or-False",
  },

  "3688802054": {
    name: document.querySelector('#gameName4 a'),
    visits: document.getElementById('placeVisits4'),
    favoritedCount: document.getElementById('placeFavorites4'),
    playing: document.getElementById('playerCount4'),
    url: "https://www.roblox.com/games/10018650748/Tennis-Serve-Simulator",
  }
}

const labelNames = {
  name: "",
  visits: "visits",
  favoritedCount: "favorites",
  playing: "players",
}

function addCommas(number) {
  if (isNaN(number)) return number;
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
  };

  for (const gameId in gameLabels) {
    if (gameLabels.hasOwnProperty(gameId)) {
      const labels = gameLabels[gameId];

      // Show loading for each stat
      for (const key in labels) {
        if (labels.hasOwnProperty(key) && key !== "url") {
          labels[key].textContent = "Loading...";
        }
      }

      try {
        const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${gameId}`);
        const data = await response.json();

        for (const key in labels) {
          if (labels.hasOwnProperty(key) && key !== "url") {
            if (key === "name") {
              labels.name.textContent = data.data[0].name;
              labels.name.href = labels.url;
              labels.name.target = "_blank"; // open link in new tab
            } else {
              let val = data.data[0][key];
              if (val === undefined || val === null) val = 0;
              labels[key].textContent = `${addCommas(val)} ${labelNames[key]}`;
              if (combinedStats.hasOwnProperty(key)) {
                combinedStats[key] += Number(val);
              }
            }
          }
        }
      } catch (error) {
        labels.name.textContent = `Error: ${error.message}`;
      }
    }
  }

  combinedVisits.textContent = `${addCommas(combinedStats.visits)} visits`;
  combinedFavorites.textContent = `${addCommas(combinedStats.favoritedCount)} favorites`;
  combinedPlayers.textContent = `${addCommas(combinedStats.playing)} players`;
}

refreshButton.addEventListener('click', updatePlayerCountNew);

// Run once on load
updatePlayerCountNew();
