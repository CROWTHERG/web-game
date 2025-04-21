// Dummy data – in real use, fetch from backend or local storage
const players = [
    { username: "SkyBlazer", score: 5200, avatar: "assets/avatars/avatar1.png" },
    { username: "PixelRunner", score: 4800, avatar: "assets/avatars/avatar2.png" },
    { username: "ZapMaster", score: 4300, avatar: "assets/avatars/avatar3.png" },
  ];
  
  const tbody = document.getElementById("leaderboard-body");
  
  players.sort((a, b) => b.score - a.score);
  
  players.forEach((player, index) => {
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${player.avatar}" alt="avatar" class="avatar-small"></td>
      <td>${player.username}</td>
      <td>${player.score}</td>
    `;
  
    tbody.appendChild(row);
  });

  