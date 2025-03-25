function initGUIS(scene) {
    const gui = new dat.GUI();

    // Liste des couleurs disponibles
    const couleurOptions = {
        Rouge: 0xff0000,
        Bleu: 0x0000ff,
        Vert: 0x00ff00,
        Magenta: 0xff00ff,
    };

    // Contrôleurs pour les arceaux
    const arceauxControls = {
        choixcouleur: "Rouge", // Couleur par défaut
        changecouleur: function () {
            const couleurHex = couleurOptions[this.choixcouleur];
            changearceauxcouleur(scene, couleurHex);
        },
    };

    const arceauxFolder = gui.addFolder("Arceaux");
    arceauxFolder
        .add(arceauxControls, "choixcouleur", Object.keys(couleurOptions))
        .name("Couleur")
        .onChange(() => {
            arceauxControls.changecouleur();
        });
    arceauxFolder.open();
}

function changearceauxcouleur(scene, couleurHex) {
    scene.traverse((child) => {
        if (child.userData.isArchway) {
            if (child.material) {
                child.material.color.set(couleurHex);
            }
        }
    });
}

