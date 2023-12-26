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

  const spotLight = new three.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 15, 0);
  spotLight.angle = Math.PI / 5;
  spotLight.castShadow = true;
  spotLight.intensity = 1000;
  spotLight.distance = 0;
  spotLight.penumbra = 0.2;
  spotLight.shadow.mapSize = new three.Vector2(1024, 1024);
  scene.add(spotLight);

  const ambientLight = new three.AmbientLight(0x353535);
  scene.add(ambientLight);

  const planeGeometry = new three.PlaneGeometry(60, 20);
  const planeMaterial = new three.MeshLambertMaterial({
          color:0x353535
      });
  const plane = new three.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -0.8*Math.PI;
  plane.position.set(0,0,0);
  scene.add(plane);

  camera.position.set(10, 30, 5);
  camera.lookAt(scene.position);

  const loader = new GLTFLoader();
  loader.load(
        '/loading_model.glb',
        (gltf) => {
          gltf.scene.scale.multiplyScalar(8);
          const torus = gltf.scene.getObjectByName('TorusFinalWithText');
          torus.rotation.z = 80;
          torus.rotation.x = 40;
          console.log(torus);
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
  const currentColorAndOldColorPerId = {};

  console.log(scene.children);
  scene.traverse(object => {
        if (object.material) {
          const color = object.material.color;
          if (color) {
            currentColorAndOldColorPerId[object.id] = {
              currentColor: object.material.color,
              oldColor: { r: color.r, g: color.g, b: color.b } 
            }
          }
        }
      });

  let mousePosition = new three.Vector2();

  const raycaster = new three.Raycaster();
  function changeColorOnMouseOver() {
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      const color = intersects[i].object.material.color;
      if (color) {
        color.set(color.r + 0.2, color.g + 0.2, color.b + 0.2);
      }
    }

    renderer.render(scene, camera);

    for (let i = 0; i < intersects.length; i++) {
      const intersectedColors =
          currentColorAndOldColorPerId[intersects[i].object.id];
      if (intersectedColors) {
        intersectedColors.currentColor
            .set(intersectedColors.oldColor.r,
                intersectedColors.oldColor.g,
                intersectedColors.oldColor.b);
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
