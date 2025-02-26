// tournament.js

console.log("tournament.js is loaded and running!");

// Objet global pour stocker l'état du tournoi
let tournament = {
  participants: [],
  bracket: [],
  currentMatchIndex: 0,
  status: "registration"
};

window.initTournamentPage = function() {
  console.log("Init Tournament Page");

  // Sélecteurs
  const formAdd = document.getElementById("add-participant-form");
  const aliasInput = document.getElementById("participant-alias");
  const typeSelect = document.getElementById("participant-type");
  const participantsList = document.getElementById("participants-list");
  const startBtn = document.getElementById("start-tournament-btn");

  // Listener sur le formulaire
  if (formAdd) {
    formAdd.addEventListener("submit", (e) => {
      e.preventDefault();
      const alias = aliasInput.value.trim();
      const type = typeSelect.value;
      if (!alias) return;

      tournament.participants.push({ alias, type });
      aliasInput.value = "";
      updateParticipantsList();
    });
  }

  // Met à jour la liste
  function updateParticipantsList() {
    participantsList.innerHTML = "";
    tournament.participants.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.alias} (${p.type})`;
      participantsList.appendChild(li);
    });
    // Activer startBtn si >= 2 participants
    startBtn.disabled = (tournament.participants.length < 2);
  }

  // Bouton "Démarrer"
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startTournament();
    });
  }

  // Exemple minimaliste de "startTournament"
  function startTournament() {
    console.log("Starting the tournament!");
    // Cache la section d'inscription, montre la section bracket, etc.
    document.getElementById("registration-section").style.display = "none";
    document.getElementById("bracket-section").style.display = "block";
    // ...
  }
}
