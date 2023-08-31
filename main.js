console.log("Hello Three JS");

// rotation variables
let targetRotationX = 0.05;
let targetRotationY = 0.02;

// mouse position for adding event listener
let mouseX = 0;
let mouseXOnMouseDown = 0;
let mouseY = 0;
let mouseYOnMouseDown = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// for movement
const slowingFactor = 0.98;
const dragFactor = 0.0002;

function onDocumentMouseDown(event) {
  event.preventDefault();
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
  mouseXOnMouseDown = event.clientX - windowHalfX;
  mouseYOnMouseDown = event.clientY - windowHalfY;
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  targetRotationX = (mouseX - mouseXOnMouseDown) * dragFactor;
  mouseY = event.clientY - windowHalfY;
  targetRotationY = (mouseY - mouseYOnMouseDown) * dragFactor;
}

function onDocumentMouseUp(event) {
  document.removeEventListener("mousemove", onDocumentMouseMove, false);
  document.removeEventListener("mouseup", onDocumentMouseUp, false);
}

// main components of three js scenes are :
// camera
// light
// renderer

function main() {
  // scene
  const scene = new THREE.Scene();

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#globe"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //creating earthGeometry
  const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({
    // wireframe: true,
    map: new THREE.TextureLoader().load("assets/earthmap.jpeg"),
    bumpMap: new THREE.TextureLoader().load("assets/earthbump.jpeg"),
    bumpScale: 0.01,
  });
  const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

  scene.add(earthMesh);

  //   add ambient light
  const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientlight);

  //   point light
  const pointerlight = new THREE.PointLight(0xffffff, 0.9);
  // set light position
  pointerlight.position.set(5, 3, 5);
  scene.add(pointerlight);

  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 1.7; // to see whole sphere

  const render = () => {
    earthMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), targetRotationX);
    earthMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), targetRotationY);
    targetRotationY = targetRotationY * slowingFactor;
    targetRotationX = targetRotationX * slowingFactor;
    renderer.render(scene, camera);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  animate();
  document.addEventListener("mousedown", onDocumentMouseDown, false);
}

window.onload = main;
