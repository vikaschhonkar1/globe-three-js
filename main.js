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

  // camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const render = () => {
    renderer.render(scene, camera);
  };
  render();
}

window.onload = main;
