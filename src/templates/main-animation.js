import * as React from 'react';

import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function setupScene() {
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = 400;

  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(45, VIEWPORT_WIDTH / VIEWPORT_HEIGHT,
      0.1, 1000);

  const renderer = new three.WebGLRenderer();
  renderer.setClearColor(new three.Color(0x232323));
  renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const axes = new three.AxesHelper(20);
  scene.add(axes);

  const spotLight = new three.SpotLight(0xffffff);
  spotLight.position.set(0, 5, 0);
  spotLight.angle = Math.PI / 5;
  spotLight.castShadow = true;
  spotLight.intensity = 1000;
  spotLight.distance = 0;
  spotLight.penumbra = 0.2;
  spotLight.shadow.mapSize = new three.Vector2(1024, 1024);

  const ambientLight = new three.AmbientLight(0x404040);
  scene.add(ambientLight);

  var planeGeometry=new three.PlaneGeometry(60,20);
  var planeMaterial=new three.MeshLambertMaterial({
      color:0xffffff,

  });
  var plane=new three.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x=-0.5*Math.PI;
  plane.position.set(0,0,0);
  plane.receiveShadow=true;
  scene.add(plane);

  const sphereGeometry = new three.SphereGeometry(4, 20, 20);
  const sphereMaterial = new three.MeshBasicMaterial({
          color:0x0077ff,
          wireframe:true
      });
  const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 0, 0);
  scene.add(sphere);
  
  var cubeGeometry=new three.BoxGeometry(4,4,4);
  var cubeMaterial=new three.MeshLambertMaterial({
      color:0x00FF00,
      wireframe:false
  });
  var cube=new three.Mesh(cubeGeometry,cubeMaterial);
  cube.position.set(-4,3,0);
  cube.castShadow=true;
  // spotLight.target=cube;
  scene.add(cube);

  camera.position.set(10, 30, 5);
  camera.lookAt(scene.position);

  const loader = new GLTFLoader();
  loader.load(
        '/Soldier.glb',
        (gltf) => {
          scene.add(gltf.scene.children[0]);
        },
        undefined,
        (error) => console.error(error)
      );

  // clear container first
  const container = document.querySelector('.mainAnimDiv');
  if (container.children.length > 0) {
    for (const child of container.children) {
      child.remove();
    }
  }
  container.appendChild(renderer.domElement);

  updateColorOnMouseHover(scene, camera, renderer);

  renderer.render(scene, camera);
}

function updateColorOnMouseHover(scene, camera, renderer) {
  const colorPerObjectId = {};
  let mousePosition = new three.Vector2();

  const raycaster = new three.Raycaster();
  function changeColorOnMouseOver() {
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      const object = intersects[i].object;
      const color = object.material.color;
      if (color) {
        colorPerObjectId[object.id] =
            { r: color.r, g: color.g, b: color.b } ?? null;
        color.set(0xff0000);
      }
    }

    renderer.render(scene, camera);

    // back to original colors after render
    for (let i = 0; i < intersects.length; i++) {
      const object = intersects[i].object;
      const color = object.material.color;
      if (color) {
        color.set(colorPerObjectId[object.id].r, colorPerObjectId[object.id].g,
                colorPerObjectId[object.id].b);
      }
    }
  }
  
  window.addEventListener('pointermove', (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mousePosition.x =
            ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
        mousePosition.y =
            - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
        changeColorOnMouseOver();
      });
}

const MainAnimation = () => {
  React.useEffect(setupScene, []);

  return (
    <div className='mainAnimDiv'>
      {/* setupScene function attaches the renderer as child of this node */}
    </div>
  )
}

export default MainAnimation
