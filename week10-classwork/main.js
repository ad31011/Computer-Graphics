import * as THREE from 'three'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

// === SCENE & CAMERA ===
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 12

// === RENDERER ===
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// === TEXTURE LOADER ===
const loader = new THREE.TextureLoader()

// 🪵 Wood textures
const woodColor = loader.load('textures/Stylized_Wood_Floor_001_basecolor.png')
const woodNormal = loader.load('textures/Stylized_Wood_Floor_001_normal.png')
const woodRough = loader.load('textures/Stylized_Wood_Floor_001_roughness.png')

// 🪨 Stone textures
const stoneColor = loader.load('textures/Stylized_Stone_Floor_010_basecolor.png')
const stoneNormal = loader.load('textures/Stylized_Stone_Floor_010_normal.png')
const stoneRough = loader.load('textures/Stylized_Stone_Floor_010_roughness.png')


// =====================================================
// 1️⃣ TORUS (Objecti 1) — me teksturë DRURI (WOOD)
// =====================================================
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 0.7, 32, 120),
  new THREE.MeshStandardMaterial({
    map: woodColor,
    normalMap: woodNormal,
    roughnessMap: woodRough,
    roughness: 0.8
  })
)
torus.position.x = -7
scene.add(torus)


// =====================================================
// 2️⃣ LATHE (Objecti 2) — Vazo me teksturë GURI (STONE)
// =====================================================
const points = []
points.push(new THREE.Vector2(0, -3))
points.push(new THREE.Vector2(1.4, -1.5))
points.push(new THREE.Vector2(2, 0))
points.push(new THREE.Vector2(1.3, 2))
points.push(new THREE.Vector2(0.6, 3))

const lathe = new THREE.Mesh(
  new THREE.LatheGeometry(points, 120),
  new THREE.MeshStandardMaterial({
    map: stoneColor,
    normalMap: stoneNormal,
    roughnessMap: stoneRough,
    roughness: 0.7
  })
)
lathe.position.x = 0
scene.add(lathe)


// =====================================================
// 3️⃣ CUBE (Objecti 3) — me teksturë GURI (STONE)
// =====================================================
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    map: stoneColor,
    normalMap: stoneNormal,
    roughnessMap: stoneRough,
    roughness: 0.6
  })
)
cube.position.x = 7
scene.add(cube)


// =====================================================
//  LIGHTING (e rëndësishme për PBR textures)
// =====================================================
const pointLight = new THREE.PointLight(0xffffff, 1.4)
pointLight.position.set(10, 10, 10)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)


// =====================================================
//  ANIMATION LOOP
// =====================================================
function animate() {
  requestAnimationFrame(animate)

  torus.rotation.y += 0.01
  lathe.rotation.y += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
