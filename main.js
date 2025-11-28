const combinedVisits = document.getElementById('combinedPlaceVisits');
const combinedFavorites = document.getElementById('combinedPlaceFavorites');
const combinedPlayers = document.getElementById('combinedPlayerCount');
const discordMembers = document.getElementById('discordMemberCount');
const groupMembers = document.getElementById('groupMemberCount');
const refreshButton = document.getElementById('refreshButton');
const loadingScreen = document.getElementById('loadingScreen');

const gameLabels = {
  "8936156714": {
    name: document.querySelector('#gameName a'),
    visits: document.getElementById('placeVisits'),
    favoritedCount: document.getElementById('placeFavorites'),
    playing: document.getElementById('playerCount'),
    icon: document.getElementById('gameIcon'),
  },

  "7254273783": {
    name: document.querySelector('#gameName2 a'),
    visits: document.getElementById('placeVisits2'),
    favoritedCount: document.getElementById('placeFavorites2'),
    playing: document.getElementById('playerCount2'),
    icon: document.getElementById('gameIcon2'),
  },

  "7959983325": {
    name: document.querySelector('#gameName5 a'),
    visits: document.getElementById('placeVisits5'),
    favoritedCount: document.getElementById('placeFavorites5'),
    playing: document.getElementById('playerCount5'),
    icon: document.getElementById('gameIcon5'),
  },

  "7595032117": {
    name: document.querySelector('#gameName3 a'),
    visits: document.getElementById('placeVisits3'),
    favoritedCount: document.getElementById('placeFavorites3'),
    playing: document.getElementById('playerCount3'),
    icon: document.getElementById('gameIcon3'),
  },

  "3688802054": {
    name: document.querySelector('#gameName4 a'),
    visits: document.getElementById('placeVisits4'),
    favoritedCount: document.getElementById('placeFavorites4'),
    playing: document.getElementById('playerCount4'),
    icon: document.getElementById('gameIcon4'),
  },
};

const groupId = 4620969;
const groupId2 = 35513941;
const groupId3 = 11724448;
const groupId4 = 681892642;
const discordInvite = "letsmakegames";

const labelNames = {
  name: "",
  visits: "visits",
  favoritedCount: "favorites",
  playing: "players",
};

function addCommas(number) {
  if (isNaN(number)) return number;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updatePlayerCountNew() {
  combinedVisits.textContent = "Loading...";
  combinedFavorites.textContent = "Loading...";
  combinedPlayers.textContent = "Loading...";
  groupMembers.textContent = "Loading...";
  discordMembers.textContent = "Loading...";

  let combinedStats = {
    visits: 0,
    favoritedCount: 0,
    playing: 0,
  };

  const gameDataArray = [];

  for (const gameId in gameLabels) {
    if (gameLabels.hasOwnProperty(gameId)) {
      const labels = gameLabels[gameId];

      for (const key in labels) {
        if (labels.hasOwnProperty(key) && key !== "icon") {
          labels[key].textContent = "Loading...";
        }
      }

      try {
        const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${gameId}`);
        const data = await response.json();

        const thumbResponse = await fetch(
          `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${gameId}&size=512x512&format=Png`
        );
        const thumbData = await thumbResponse.json();

        const playingCount = data.data[0].playing || 0;
        const visitsCount = data.data[0].visits || 0;

        for (const key in labels) {
          if (labels.hasOwnProperty(key)) {
            if (key === "icon") continue;

            if (key === "name") {
              labels.name.textContent = data.data[0].name;
              labels.name.href = `https://www.roblox.com/games/${data.data[0].rootPlaceId}`;
              labels.name.target = "_blank";
              labels.icon.src = thumbData.data[0].imageUrl;
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

        gameDataArray.push({
          gameId,
          element: labels.name.closest('.game'),
          players: playingCount,
          visits: visitsCount,
        });

      } catch (error) {
        labels.name.textContent = `Error: ${error.message}`;
      }
    }
  }

  combinedVisits.textContent = `${addCommas(combinedStats.visits)} visits`;
  combinedFavorites.textContent = `${addCommas(combinedStats.favoritedCount)} favorites`;
  combinedPlayers.textContent = `${addCommas(combinedStats.playing)} players`;

  const groupResponse = await fetch(`https://groups.roproxy.com/v1/groups/${groupId}`);
  const groupData = await groupResponse.json();
  const groupResponse2 = await fetch(`https://groups.roproxy.com/v1/groups/${groupId2}`);
  const groupData2 = await groupResponse2.json();
  const groupResponse3 = await fetch(`https://groups.roproxy.com/v1/groups/${groupId2}`);
  const groupData3 = await groupResponse3.json();
  const groupResponse4 = await fetch(`https://groups.roproxy.com/v1/groups/${groupId2}`);
  const groupData4 = await groupResponse4.json();
  const discordResponse = await fetch(
    `https://discord.com/api/v9/invites/${discordInvite}?with_counts=true&with_expiration=true`
  );
  const discordData = await discordResponse.json();

  groupMembers.textContent = `${addCommas(groupData.memberCount + groupData2.memberCount + groupData3.memberCount + groupData4.memberCount)} robloxians`;
  discordMembers.textContent = `${addCommas(discordData.approximate_member_count)} discordians`;

  // Sort games
  const container = document.querySelector('.games-list');
  gameDataArray
    .sort((a, b) => {
      if (b.players !== a.players) return b.players - a.players;
      return b.visits - a.visits;
    })
    .forEach(data => container.appendChild(data.element));

  await sleep(500);
  if (loadingScreen) loadingScreen.style.display = 'none';
}

refreshButton.addEventListener('click', updatePlayerCountNew);

updatePlayerCountNew();
