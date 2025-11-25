import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

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

/*const geometry = new THREE.BoxGeometry(5,5,5);
const material = new THREE.MeshStandardMaterial({ color: 0xFF007F});
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);*/

const geometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
//const geometry = new THREE.ConeGeometry(5,10,32);
// const geometry = new THREE.CylinderGeometry(0.5,0.5,2,10);
//const geometry = new THREE.SphereGeometry(3,32,32);

const material = new THREE.MeshStandardMaterial({
  color: 0xF2D2BD,
  metalness: 0.4,
  roughness: 0.3,
  emissive: 0x220044,
});

//const material = new THREE.MeshStandardMaterial({ color: 0xF2D2BD , wireframe:true});
//const material = new THREE.MeshLambertMaterial({ color: 0x8844ff});

const object = new THREE.Mesh(geometry, material);
scene.add(object);

const ambientLight = new THREE.AmbientLight(0x9F2B68, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x9F2B68, 1);
directionalLight.position.set(1, 1, 5);
scene.add(directionalLight);

ambientLight.intensity = 0.4;
THREE.DirectionalLight.intensity = 1.2;

/**const material = new THREE.MeshPhongMaterial({
  color:0x8844ff,
  specular:0xffffff,
  shininess:50
});



//change object position
/*cubeMesh.position.x=0.7;
cubeMesh.position.y=-0.6;
cubeMesh.position.z=-10;*/
//ose
//cubeMesh.position.set(0.7,-0.6,1);

//console.log("Distance to camera:", cubeMesh.position.distanceTo(camera.position));


//axes helper
// const axes = new THREE.AxesHelper(9);
// scene.add(axes);

//scale objects
//cubeMesh.scale.x=2
//cubeMesh.scale.y=0.25
//cubeMesh.scale.z=0.5

//rotating objects
//cubeMesh.rotation.x=Math.PI*0.25
//cubeMesh.rotation.y=Math.PI*0.25


//applying all transformations at once

/*cubeMesh.position.x=0.7
cubeMesh.position.y=-0.6
cubeMesh.position.z=1
cubeMesh.scale.x=2
cubeMesh.scale.y=0.25
cubeMesh.scale.z=0.5
cubeMesh.rotation.x=Math.PI*0.25
cubeMesh.rotation.y=Math.PI*0.25*/




// const ambientLight = new THREE.AmbientLight(0x9F2B68, 1);
// scene.add(ambientLight);



// const light = new THREE.DirectionalLight(0x9F2B68, 1);
// directionalLight.position.set(2, 2, 5);
// scene.add(directionalLight);


// scene graph
/*const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xF88379 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xFF69B4 })
);
cube2.position.x = 0; 
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xA95C68 })
);
cube3.position.x = 1.5;
group.add(cube3);
*/

function animate() {
  requestAnimationFrame(animate);
  //cubeMesh.rotation.x += 0.01;
  //cubeMesh.rotation.y += 0.01;

  // rotate torus (object)
  object.rotation.x += 0.01;
  object.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();