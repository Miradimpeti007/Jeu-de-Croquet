function init() {
    let n = "";
    do {
        n = prompt("Saisir le niveau : 'd' pour débutant et 'e' pour expert");
    } while (n !== "d" && n !== "e");

    // création de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true });
    rendu.shadowMap.enabled = true;
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
    rendu.setClearColor(new THREE.Color(0xffffff));
    rendu.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
    document.body.appendChild(rendu.domElement);

    controle.enableDamping = true;
    cameraLumiere(scene, camera);
    lumiere(scene);

    PlanPlat(scene, 20, 10, 32, 32, 0x00ff55);
    initGUI(scene, camera, rendu);

    // Ajout des arceaux
    const arceaux1 = creerArceaux(4, 1, -0.5);
    arceaux1.rotation.set(1.57, Math.PI / 2, 0);
    const arceaux2 = creerArceaux(1, -0.3, -0.5);
    arceaux2.rotation.set(1.57, Math.PI / 2, 0);
    const arceaux3 = creerArceaux(-2, 0.7, -0.5);
    arceaux3.rotation.set(1.57, Math.PI / 2, 0);

    scene.add(arceaux1);
    scene.add(arceaux2);
    scene.add(arceaux3);

    const demiCone = creerDemiCone();
    demiCone.position.set(-7, 1, 0.1);
    demiCone.rotation.set(-13, 3.4, 4.5);
    scene.add(demiCone);

    // Création de la balle
    let balle = PlanSphere(scene, 0.2, 32, 32, 0xFF8100);
    balle.position.set(7, 1, 0.2);

    balleAnimation(scene, balle, rendu, camera, getTrajectoir(n));

    initGUIS(scene);

    rendu.render(scene, camera);
}

function balleAnimation(scene, balle, rendu, camera, courbes) {
    let indexCourbe = 0;
    let t = 0;
    let pause = false;
    const mallet = creermallet(balle.position);
    scene.add(mallet);

    mallet.visible = false;

    function animate() {
        if (pause) return;

        if (indexCourbe >= courbes.length) {
            indexCourbe = 0;
            t = 0;
        }

        const courbe = courbes[indexCourbe];
        const position = courbe.getPointAt(t);
        balle.position.copy(position);

        if (t === 0) {
            const startPos = courbe.getPointAt(0);
            mallet.position.set(startPos.x + 0.5, startPos.y, 0.6);
            mallet.rotation.set(1.5, Math.PI, -1);

            mallet.visible = true;
            AnimationMallet(mallet, rendu, scene, camera, startPos.x, startPos.y, startPos.z);
        }

        t += 0.005;
        if (t > 1) {
            t = 0;
            indexCourbe++;
            pause = true;
            mallet.visible = false;

            setTimeout(() => {
                pause = false;
                animate();
            }, 1000);
            return;
        }

        rendu.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}

function AnimationMallet(mallet, rendu, scene, camera, x, y, z) {
    let angle = 0;
    const maxAngle = Math.PI;

    function animate() {
        if (angle <= maxAngle) {
            mallet.rotation.z = Math.sin(angle);
            angle += 0.05;
        } else {
            mallet.rotation.z = 0;
            return;
        }

        rendu.render(scene, camera);
        requestAnimationFrame(animate);
    }

    mallet.visible = true;
    animate();
}
