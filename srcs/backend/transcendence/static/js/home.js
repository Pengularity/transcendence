document.addEventListener("DOMContentLoaded", function () {

    checkLoginStatus();
    const app = document.getElementById("app");

    function loadPage(page) {
        fetch(`static/pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;
                const event = new CustomEvent(`${page}Event`,{
                    detail: { message: `La page ${page} est chargée !` }
                });
                document.dispatchEvent(event);
                console.log(`trying to send ${page}Event`);
            })
            .catch(() => {
                app.innerHTML = "<p class='text-danger'>Erreur de chargement...</p>";
            });
    }

    document.querySelectorAll("[data-page]").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const page = this.getAttribute("data-page");
            loadPage(page);
            history.pushState({ page }, "", `#${page}`);
        });
    });

    // Charger la bonne page si l'utilisateur actualise
    const page = location.hash.replace("#", "") || "home";
    loadPage(page);

});

