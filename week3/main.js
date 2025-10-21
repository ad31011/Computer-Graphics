import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1E1E2F); // dark navy background

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 11;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === GEOMETRY & MATERIAL ===
const geometry = new THREE.TorusGeometry(3, 0.8, 16, 100);

const material = new THREE.MeshPhongMaterial({
  color: 0x00BFFF,      // Deep Sky Blue
  specular: 0xffffff,
  shininess: 80,
});

const object = new THREE.Mesh(geometry, material);
scene.add(object);

// === LIGHTS ===
const ambientLight = new THREE.AmbientLight(0xADD8E6, 0.8); // light blue ambient
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFD700, 1.2); // golden light
directionalLight.position.set(2, 3, 5);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(lightHelper);

// === ANIMATION ===
function animate() {
  requestAnimationFrame(animate);

  object.rotation.x += 0.01;
  object.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();
