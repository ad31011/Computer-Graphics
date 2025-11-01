import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

init();
animate();

function init() {
  // === SKENA ===
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcfe8ff);

  // === KAMERA ===
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(35, 35, 40);
  camera.lookAt(0, 0, 0);

  // === RENDERUESI ===
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;            //  aktivizon hijet
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // hije më të buta
  document.body.appendChild(renderer.domElement);

  // === KONTROLLET ===
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // === TOKA ===
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({ color: 0x4f7354 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true; //  toka merr hije
  scene.add(ground);

  // === RRUGA VERTIKALE ===
  const verticalRoad = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.1, 40),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  verticalRoad.position.set(0, 0.05, 10);
  verticalRoad.receiveShadow = true;
  scene.add(verticalRoad);

  // === RRUGA HORIZONTALE ===
  const horizontalRoad = new THREE.Mesh(
    new THREE.BoxGeometry(40, 0.1, 5),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a })
  );
  horizontalRoad.position.set(-10, 0.06, 5);
  horizontalRoad.receiveShadow = true;
  scene.add(horizontalRoad);

  // === NDËRTESA 814 ===
  const building814 = new THREE.Mesh(
    new THREE.BoxGeometry(13, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0x3b6fb6 })
  );
  building814.position.set(-2, 3, -9);
  building814.castShadow = true; //  hedh hije
  building814.receiveShadow = true;
  scene.add(building814);
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });


  // === NDËRTESA 805-806 ===
  const building806 = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 13),
    new THREE.MeshStandardMaterial({ color: 0x3b6fb6 })
  );
  building806.position.set(10, 3, 2);
  building806.castShadow = true;
  building806.receiveShadow = true;
  scene.add(building806);

  // === LH1 ===
  const lh1Geometry = new THREE.BoxGeometry(12, 4, 6);
  const lh1Material = new THREE.MeshStandardMaterial({ color: 0x9b9b9b });
  const lh1 = new THREE.Mesh(lh1Geometry, lh1Material);
  lh1.position.set(-15, 4, 16);
  lh1.rotation.z = -Math.PI / 10;
  lh1.castShadow = true;
  lh1.receiveShadow = true;
  scene.add(lh1);

  // === SHTYLLAT POSHTË LH1 ===
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0xbdbdbd });
  const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 6, 12), legMaterial);
  const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 6, 12), legMaterial);

  leg1.position.set(-14.5, 2.5, 17.5);
  leg2.position.set(-13.5, 2.5, 15);
  leg1.castShadow = true;
  leg2.castShadow = true;
  leg1.receiveShadow = true;
  leg2.receiveShadow = true;
  scene.add(leg1, leg2);

  // === PEMË ===
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 4),
    new THREE.MeshStandardMaterial({ color: 0x5b3a1a })
  );
  trunk.position.set(-4, 2, 14);
  trunk.castShadow = true;
  trunk.receiveShadow = true;

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(3, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x2ecc40 })
  );
  leaves.position.set(-4, 5, 14);
  leaves.castShadow = true;
  leaves.receiveShadow = true;

  scene.add(trunk, leaves);

// === 3 PEMË  ===
function addTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x5b3a1a })
  );
  trunk.position.set(x, 2, z);
  trunk.castShadow = true;

  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x2ecc40 })
  );
  leaves.position.set(x, 5, z);
  leaves.castShadow = true;

  scene.add(trunk, leaves);
}

// Pemët në rresht
addTree(-20, -20);
addTree(0, -20);
addTree(-10, -20);
// Pemët ekzistuese
addTree(-20, -20);
addTree(-10, -20);
addTree(0, -20);


addTree(10, -20);
addTree(20, -20);







  // === LLAMPË ===
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 5),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  pole.position.set(14, 2.5, 16);
  pole.castShadow = true;
  pole.receiveShadow = true;

  const bulbMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshStandardMaterial({ emissive: 0xfff6b0, emissiveIntensity: 1 })
  );
  bulbMesh.position.set(14, 5.3, 16);
  bulbMesh.castShadow = true;

  const bulbLight = new THREE.PointLight(0xfff6b0, 2, 20);
  bulbLight.position.set(14, 5.3, 16);
  bulbLight.castShadow = true;
  bulbLight.shadow.mapSize.width = 1024;
  bulbLight.shadow.mapSize.height = 1024;

  scene.add(pole, bulbMesh, bulbLight);

  // === DRITA AMBIENTE DHE DIELLORE ===
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 1.2);
  sun.position.set(50, 60, 40);
  sun.castShadow = true;

  //  hijet e diellit
  sun.shadow.mapSize.width = 4096;
  sun.shadow.mapSize.height = 4096;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 150;
  sun.shadow.camera.left = -50;
  sun.shadow.camera.right = 50;
  sun.shadow.camera.top = 50;
  sun.shadow.camera.bottom = -50;

  scene.add(sun);
  scene.background = new THREE.Color(0xbfdcff);


  // === RESIZE EVENT ===
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// === ULËSE  ===
const seatMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b }); // dru
const legMat = new THREE.MeshStandardMaterial({ color: 0x333333 });  // metal

function createBench(x, z, rotation = 0) {
  const bench = new THREE.Group();

  // Ulësja 
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(6, 0.4, 1.4),
    seatMat
  );
  seat.position.y = 0.6;
  seat.castShadow = true;
  seat.receiveShadow = true;
  bench.add(seat);

  // Këmbët
  const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.8, 8), legMat);
  const leg2 = leg1.clone();
  const leg3 = leg1.clone();
  const leg4 = leg1.clone();

  leg1.position.set(-2.5, 0.3, -0.5);
  leg2.position.set(2.5, 0.3, -0.5);
  leg3.position.set(-2.5, 0.3, 0.5);
  leg4.position.set(2.5, 0.3, 0.5);
  bench.add(leg1, leg2, leg3, leg4);

  // Pozicionimi dhe orientimi
  bench.position.set(x, 0, z);
  bench.rotation.y = Math.PI / 2; // vertikale
  bench.castShadow = true;

  scene.add(bench);
}

// === Dy ulëse  ===
createBench(7.8, 16);  // e para — më afër rrugës
createBench(7.8, 23);  // e dyta — pak më poshtë





// === LLAMPË  ===
const pole814 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.15, 0.15, 5, 16),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
pole814.position.set(-20, 2.5, -6); // afër ndërtesës blu 814
pole814.castShadow = true;

const bulb814 = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 16, 16),
  new THREE.MeshStandardMaterial({
    emissive: 0xfff9b0,
    emissiveIntensity: 1.5,
  })
);
bulb814.position.set(-20, 5.3, -6);
bulb814.castShadow = true;

const bulbLight814 = new THREE.PointLight(0xfff6b0, 2.5, 25);
bulbLight814.position.set(-6, 5.3, -6);
bulbLight814.castShadow = true;

// Shto në skenë
scene.add(pole814, bulb814, bulbLight814);

const sunSphere = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfff1a1, emissive: 0xffe066 })
);
sunSphere.position.set(40, 20, -30);
scene.add(sunSphere);


// === LOOP ANIMACIONI ===
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
