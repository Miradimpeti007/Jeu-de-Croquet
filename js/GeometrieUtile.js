const PrecisionArrondi = 50;
const epsilon = 0.00000001;

function testZero(x) {
  var val = parseFloat(Number(x).toPrecision(PrecisionArrondi));
  if (parseFloat(Math.abs(x).toPrecision(PrecisionArrondi)) < epsilon) val = 0;
  return val;
}

function PlanPlat(scene, largPlan, hautPlan, nbSegmentLarg, nbSegmentHaut, colh) {
  let planGeometry = new THREE.PlaneGeometry(largPlan, hautPlan, nbSegmentLarg, nbSegmentHaut);
  let materielPhong = new THREE.MeshPhongMaterial({ color: colh });
  let planPhong = new THREE.Mesh(planGeometry, materielPhong);
  planPhong.castShadow = true;
  planPhong.receiveShadow = true;
  scene.add(planPhong);
  return planPhong;
}

function vecteur(MaScene, A, B, CoulHexa, longCone, RayonCone) {
  var vecAB = new THREE.Vector3(B.x - A.x, B.y - A.y, B.z - A.z);
  vecAB.normalize();
  MaScene.add(new THREE.ArrowHelper(vecAB, A, B.distanceTo(A), CoulHexa, longCone, RayonCone));
}

function PlanSphere(scene, rayons, lPara, lMeri, colh) {
  let sphereGeom = new THREE.SphereGeometry(rayons, lPara, lMeri);
  var materiels1 = new THREE.MeshPhongMaterial({ color: colh });
  var sphere = new THREE.Mesh(sphereGeom, materiels1);
  scene.add(sphere);
  return sphere;
}

function repere(MaScene, x, y, z, x1, y1, z1) {
  var PointO3 = new THREE.Vector3(x, y, z);
  var vecI = new THREE.Vector3(x1, 0, 0);
  var vecJ = new THREE.Vector3(0, y1, 0);
  var vecK = new THREE.Vector3(0, 0, z1);
  vecteur(MaScene, PointO3, vecI, 0xFF0000, 0.25, 0.125);
  vecteur(MaScene, PointO3, vecJ, 0x00FF00, 0.25, 0.125);
  vecteur(MaScene, PointO3, vecK, 0x0000FF, 0.25, 0.125);
}

function creerPotVertical() {
  const points = [];
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.05, 0.1));
  points.push(new THREE.Vector2(0.05, 0.5));
  points.push(new THREE.Vector2(0.05, 1));
  const geometry = new THREE.LatheGeometry(points, 32);
  const materiel = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  return new THREE.Mesh(geometry, materiel);
}

function creerCylindre() {
  const geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.4, 32);
  const materiel = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const Cylindre = new THREE.Mesh(geometry, materiel);
  Cylindre.rotation.z = Math.PI / 2;
  Cylindre.position.y = 1.1;
  return Cylindre;
}

function creerTores(positionX) {
  const ToresGeometry = new THREE.TorusGeometry(0.1, 0.05, 16, 100, Math.PI / 2);
  const Toresmateriel = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const Tores = new THREE.Mesh(ToresGeometry, Toresmateriel);
  Tores.position.set(positionX - 0.1, 1, 0);
  Tores.rotation.z = Math.PI / 2;
  return Tores;
}

function createarceaux() {
  const groupe = new THREE.Group();
  const potGauche = creerPotVertical();
  potGauche.position.set(-0.8, 0, 0);
  potGauche.userData.isArchway = true;
  const potDroit = creerPotVertical();
  potDroit.position.set(0.8, 0, 0);
  potDroit.userData.isArchway = true;
  const horizontalCylindre = creerCylindre();
  horizontalCylindre.userData.isArchway = true;
  const toreGauche = creerTores(-0.6);
  toreGauche.userData.isArchway = true;
  const toreDroit = creerTores(0.6);
  toreDroit.rotation.y = Math.PI;
  toreDroit.position.setX(toreDroit.position.x + 0.2);
  toreDroit.userData.isArchway = true;
  groupe.add(potGauche);
  groupe.add(potDroit);
  groupe.add(horizontalCylindre);
  groupe.add(toreGauche);
  groupe.add(toreDroit);
  groupe.userData.isArchwayGroup = true;
  return groupe;
}

function creerArceaux(x, y, z) {
  const arceaux = createarceaux();
  arceaux.position.set(x, y, z);
  return arceaux;
}

function creerMontantVertical(hauteur, rayon, segmentsLatte, materiau) {
  let montant = new THREE.Group();
  let profilLatte1 = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(rayon, 0),
    new THREE.Vector2(rayon * 0.9, hauteur / 3)
  ];
  let profilLatte2 = [
    new THREE.Vector2(rayon * 0.9, hauteur / 3),
    new THREE.Vector2(rayon * 0.8, 2 * hauteur / 3),
    new THREE.Vector2(rayon * 0.7, hauteur)
  ];
  let profilLatte3 = [
    new THREE.Vector2(rayon * 0.7, hauteur),
    new THREE.Vector2(rayon * 0.6, hauteur + 0.5)
  ];
  let geometrieLatte1 = new THREE.LatheGeometry(profilLatte1, segmentsLatte);
  let Latte1 = new THREE.Mesh(geometrieLatte1, materiau);
  montant.add(Latte1);
  let geometrieLatte2 = new THREE.LatheGeometry(profilLatte2, segmentsLatte);
  let Latte2 = new THREE.Mesh(geometrieLatte2, materiau);
  montant.add(Latte2);
  let geometrieLatte3 = new THREE.LatheGeometry(profilLatte3, segmentsLatte);
  let Latte3 = new THREE.Mesh(geometrieLatte3, materiau);
  montant.add(Latte3);
  return montant;
}

function creerDemiCone() {
  const geometry = new THREE.ConeGeometry(0.6, 0.7, 0.5, 32, 0, true, Math.PI);
  const materiel = new THREE.MeshStandardMaterial({ color: 0xFF00FF, side: THREE.DoubleSide });
  const demiCone = new THREE.Mesh(geometry, materiel);
  return demiCone;
}

function creermallet(ballePosition) {
  const malletGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 32);
  const malletmateriel = new THREE.MeshStandardMaterial({ color: 0X008b8b });
  const mallet = new THREE.Mesh(malletGeometry, malletmateriel);
  const hautGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 32);
  const hautmateriel = new THREE.MeshStandardMaterial({ color: 0x008b8b });
  const haut = new THREE.Mesh(hautGeometry, hautmateriel);
  haut.position.set(0, -0.5, 0);
  haut.rotation.z = Math.PI / 2;
  mallet.add(haut);
  mallet.position.set(8, 1, 0.7);
  const direction = new THREE.Vector3();
  direction.subVectors(ballePosition, mallet.position).normalize();
  const qa = new THREE.Quaternion();
  qa.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
  mallet.quaternion.copy(qa);
  return mallet;
}

function afficheVecteur(V, nom, lieu) {
  var mes = nom + " : (";
  for (var i = 0; i < 2; i++)
    mes += V.getComponent(i) + " , ";
  mes += V.getComponent(2) + " ) <br /><br /> Avec TestZero :<br />";
  mes += nom + " : (";
  for (var i = 0; i < 2; i++)
    mes += testZero(V.getComponent(i)) + " , ";
  mes += testZero(V.getComponent(2)) + " ) <br />";
  document.getElementById(lieu).innerHTML += mes;
}

function vecteurProdVec(MaScene, A, u, v, CoulHexa, longCone, RayonCone) {
  let w = new THREE.Vector3(0, 0, 0);
  let C = new THREE.Vector3(0, 0, 0);
  w.crossVectors(u, v);
  w.normalize();
  C.addVectors(A, w);
  vecteur(MaScene, A, C, CoulHexa, longCone, RayonCone);
}
