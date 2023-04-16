// Configuration du cube
const CUBE_SIZE = 3; // taille du cube (3 pour 3x3)
const FACE_SIZE = 1; // taille de chaque face du cube
const GAP_SIZE = 0.05; // espacement entre chaque face

// Génère une séquence aléatoire de mouvements pour mélanger le cube
function generateRandomSequence() {
  const moves = ["F", "B", "U", "D", "L", "R"];
  const sequence = [];
  const numMoves = Math.floor(Math.random() * 20) + 10; // entre 10 et 30 mouvements

  for (let i = 0; i < numMoves; i++) {
    const randomIndex = Math.floor(Math.random() * moves.length);
    const move = moves[randomIndex];
    sequence.push(move);
  }

  return sequence.join(" ");
}

// Crée le cube en 3D
function createCube() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  const materials = [
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // blanc
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // rouge
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // vert
    new THREE.MeshBasicMaterial({ color: 0xffff00 }), // jaune
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // bleu
    new THREE.MeshBasicMaterial({ color: 0xffa500 }), // orange
  ];

  const cube = new THREE.Group();
  const geometry = new THREE.BoxGeometry(
    FACE_SIZE - GAP_SIZE,
    FACE_SIZE - GAP_SIZE,
    FACE_SIZE - GAP_SIZE
  );

  for (let i = 0; i < CUBE_SIZE; i++) {
    for (let j = 0; j < CUBE_SIZE; j++) {
      for (let k = 0; k < CUBE_SIZE; k++) {
        const cubelet = new THREE.Mesh(geometry, materials);
        cubelet.position.set(
          (i - CUBE_SIZE / 2 + 0.5) * FACE_SIZE,
          (j - CUBE_SIZE / 2 + 0.5) * FACE_SIZE,
          (k - CUBE_SIZE / 2 + 0.5) * FACE_SIZE
        );
        cube.add(cubelet);
      }
    }
}

scene.add(cube);

// Applique une séquence de mouvements au cube
const sequence = generateRandomSequence();
const moves = sequence.split(" ");

moves.forEach((move) => {
switch (move) {
case "F":
cube.rotation.x += Math.PI / 2;
break;
case "B":
cube.rotation.x -= Math.PI / 2;
break;
case "U":
cube.rotation.y += Math.PI / 2;
break;
case "D":
cube.rotation.y -= Math.PI / 2;
break;
case "L":
cube.rotation.z += Math.PI / 2;
break;
case "R":
cube.rotation.z -= Math.PI / 2;
break;
}
});

// Fonction d'animation du rendu
const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
}

createCube();