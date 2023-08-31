console.log("Hello Three JS");

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
    earthMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 0.01);
    renderer.render(scene, camera);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  animate();
}

window.onload = main;
