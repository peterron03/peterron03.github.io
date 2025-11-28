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
  visits: "visits",
  favoritedCount: "favorites",
  playing: "players",
};

function addCommas(number) {
  return isNaN(number) ? number : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function safeSet(el, text) {
  if (el) el.textContent = text;
}

async function updatePlayerCountNew() {
  safeSet(combinedVisits, "Loading...");
  safeSet(combinedFavorites, "Loading...");
  safeSet(combinedPlayers, "Loading...");
  safeSet(groupMembers, "Loading...");
  safeSet(discordMembers, "Loading...");

  let combinedStats = { visits: 0, favoritedCount: 0, playing: 0 };
  const gameDataArray = [];

  for (const gameId in gameLabels) {
    const labels = gameLabels[gameId];

    // Set loading text safely
    for (const key in labels) {
      if (key !== "icon" && labels[key]) labels[key].textContent = "Loading...";
    }

    try {
      const response = await fetch(`https://games.roproxy.com/v1/games?universeIds=${gameId}`);
      const data = await response.json();

      if (!data.data || !data.data[0]) {
        safeSet(labels.name, "No data");
        continue;
      }

      const gameInfo = data.data[0];

      // Thumbnail
      const thumbResponse = await fetch(
        `https://thumbnails.roproxy.com/v1/games/icons?universeIds=${gameId}&size=512x512&format=Png`
      );
      const thumbData = await thumbResponse.json();

      if (thumbData.data && thumbData.data[0] && labels.icon) {
        labels.icon.src = thumbData.data[0].imageUrl;
      }

      // Name and link
      if (labels.name) {
        labels.name.textContent = gameInfo.name;
        labels.name.href = `https://www.roblox.com/games/${gameInfo.rootPlaceId}`;
      }

      // Stats
      for (const key of ["visits", "favoritedCount", "playing"]) {
        const val = gameInfo[key] ?? 0;
        if (labels[key]) labels[key].textContent = `${addCommas(val)} ${labelNames[key]}`;
        combinedStats[key] += Number(val);
      }

      // Sorting reference
      const containerEl = labels.name?.closest(".game") ?? null;
      gameDataArray.push({
        element: containerEl,
        players: gameInfo.playing ?? 0,
        visits: gameInfo.visits ?? 0,
      });

    } catch (err) {
      safeSet(labels.name, "Error loading");
      console.error(err);
    }
  }

  safeSet(combinedVisits, `${addCommas(combinedStats.visits)} visits`);
  safeSet(combinedFavorites, `${addCommas(combinedStats.favoritedCount)} favorites`);
  safeSet(combinedPlayers, `${addCommas(combinedStats.playing)} players`);

  // Groups
  const groups = await Promise.all([
    fetch(`https://groups.roproxy.com/v1/groups/${groupId}`).then(r => r.json()),
    fetch(`https://groups.roproxy.com/v1/groups/${groupId2}`).then(r => r.json()),
    fetch(`https://groups.roproxy.com/v1/groups/${groupId3}`).then(r => r.json()),
    fetch(`https://groups.roproxy.com/v1/groups/${groupId4}`).then(r => r.json())
  ]);

  const totalMembers = groups.reduce((sum, g) => sum + (g.memberCount ?? 0), 0);
  safeSet(groupMembers, `${addCommas(totalMembers)} robloxians`);

  // Discord
  try {
    const discordData = await fetch(
      `https://discord.com/api/v9/invites/${discordInvite}?with_counts=true&with_expiration=true`
    ).then(r => r.json());

    safeSet(discordMembers, `${addCommas(discordData.approximate_member_count)} discordians`);
  } catch (err) {
    safeSet(discordMembers, "Error loading Discord");
  }

  // Sort Games
  const container = document.querySelector(".games-list");
  gameDataArray
    .filter(g => g.element)
    .sort((a, b) => b.players - a.players || b.visits - a.visits)
    .forEach(g => container.appendChild(g.element));

  loadingScreen.style.display = "none";
}

refreshButton.addEventListener("click", updatePlayerCountNew);
updatePlayerCountNew();
