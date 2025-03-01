document.addEventListener("profilEvent", function (event) {
    console.log(event.detail.message);
    const token = localStorage.getItem("access_token");

    if (!token) {
        document.getElementById("app").innerHTML = "<p class='text-danger'>Vous devez être connecté pour voir cette page.</p>";
        return;
    }

    const usernameSpan = document.getElementById("username");
    const emailSpan = document.getElementById("email");
    // const editProfileBtn = document.getElementById("editProfileBtn");
    // const editProfileForm = document.getElementById("editProfileForm");
    // const profilForm = document.getElementById("profilForm");
    // const cancelEditBtn = document.getElementById("cancelEdit");

    // Charger les infos de l'utilisateur
    function loadProfile() {
        fetch("/api/user/", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => response.json())
        .then(data => {
            usernameSpan.textContent = data.username;
            emailSpan.textContent = data.email;
            document.getElementById("newUsername").value = data.username;
            document.getElementById("newEmail").value = data.email;
        })
        .catch(() => {
            document.getElementById("app").innerHTML = "<p class='text-danger'>Erreur de chargement du profil.</p>";
        });
    }

    loadProfile();
    console.log("profil.js chargé !");
    // // Activer l'édition du profil
    // editProfileBtn.addEventListener("click", function () {
    //     editProfileForm.classList.remove("d-none");
    // });

    // // Annuler l'édition
    // cancelEditBtn.addEventListener("click", function () {
    //     editProfileForm.classList.add("d-none");
    // });

    // // Sauvegarder les modifications
    // profilForm.addEventListener("submit", function (e) {
    //     e.preventDefault();

    //     const newUsername = document.getElementById("newUsername").value;
    //     const newEmail = document.getElementById("newEmail").value;

    //     fetch("/api/profil/", {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //         body: JSON.stringify({ username: newUsername, email: newEmail })
    //     })
    //     .then(response => response.json())
    //     .then(() => {
    //         editProfileForm.classList.add("d-none");
    //         loadProfile();
    //     })
    //     .catch(() => {
    //         alert("Erreur lors de la mise à jour du profil.");
    //     });
    // });
});
