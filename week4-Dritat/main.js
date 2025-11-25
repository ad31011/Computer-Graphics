import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import GUI from 'lil-gui'

const gui = new GUI()
const scene = new THREE.Scene()

// === MATERIAL ===
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.6 })

// === OBJECTS ===

// Replace sphere → Icosahedron (blue)
const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.7, 0),
  new THREE.MeshStandardMaterial({ color: 0x00aaff, roughness: 0.2, metalness: 0.8 })
)
sphere.position.x = -2

// Replace cube → Cylinder (orange)
const cube = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1.2, 32),
  new THREE.MeshStandardMaterial({ color: 0xff8800, roughness: 0.3, metalness: 0.7 })
)

// Replace torus → TorusKnot (magenta)
const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.4, 0.15, 100, 16),
  new THREE.MeshStandardMaterial({ color: 0xff00ff, roughness: 0.3, metalness: 0.9 })
)
torus.position.x = 2

// Plane (purple)
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(6, 6),
  new THREE.MeshStandardMaterial({ color: 0x3b0a45, side: THREE.DoubleSide })
)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65

scene.add(sphere, cube, torus, plane)

// === LIGHTS ===

// Soft white ambient
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)

// Cyan directional
const directionalLight = new THREE.DirectionalLight(0x00ffff, 1.2)
directionalLight.position.set(1, 0.5, 0)
scene.add(directionalLight)
scene.add(new THREE.DirectionalLightHelper(directionalLight, 0.2))

// Hemisphere (yellow top / blue bottom)
const hemisphereLight = new THREE.HemisphereLight(0xffff00, 0x0000ff, 1.0)
scene.add(hemisphereLight)
scene.add(new THREE.HemisphereLightHelper(hemisphereLight, 0.5))

// Point light (bright pink)
const pointLight = new THREE.PointLight(0xff0099, 3, 10, 1)
pointLight.position.set(2, 0.5, 2)
scene.add(pointLight)
scene.add(new THREE.PointLightHelper(pointLight, 0.2))

// Rect area light (green)
const rectAreaLight = new THREE.RectAreaLight(0x00ff88, 6, 6, 1)
rectAreaLight.position.set(-1, 1, 3)
scene.add(rectAreaLight)
scene.add(new RectAreaLightHelper(rectAreaLight, 0.3))

// Spotlight (bright red)
const spotLight = new THREE.SpotLight(0xff3300, 4, 10, Math.PI * 0.2, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.target.position.x = -0.75
scene.add(spotLight)
scene.add(spotLight.target)
scene.add(new THREE.SpotLightHelper(spotLight, 0.3))

// === CAMERA & RENDERER ===
const sizes = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 7)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

// === RESIZE HANDLER ===
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

// === ANIMATE ===
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

