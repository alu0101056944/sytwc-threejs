import * as React from 'react';

import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function setupScene() {
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = 400;

  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(45, VIEWPORT_WIDTH / VIEWPORT_HEIGHT,
      0.1, 1000);

  const renderer = new three.WebGLRenderer();
  renderer.setClearColor(new three.Color(0x232323));
  renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

  const axes = new three.AxesHelper(20);
  scene.add(axes);

  // const sphereGeometry = new three.SphereGeometry(4, 20, 20);
  // const sphereMaterial = new three.MeshBasicMaterial({
  //         color:0x7777ff,
  //         wireframe:true
  //     });
  // const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
  // sphere.position.set(0, 0, 0);
  // scene.add(sphere);

  camera.position.set(10, 30, 5);
  camera.lookAt(scene.position);

  const loader = new GLTFLoader();
  loader.load(
        '/another_test_with_gradient.glb',
        (gltf) => {
          const object = gltf.scene.getObjectByName('TorusFinalWithText');
          scene.add(object);
          // camera.lookAt(object);
          // object.rotation.x = 40;
        },
        undefined,
        (error) => console.error(error)
      );

  console.log(scene.children);

  // clear container first
  const container = document.querySelector('.mainAnimDiv');
  if (container.children.length > 0) {
    for (const child of container.children) {
      child.remove();
    }
  }
  container.appendChild(renderer.domElement);

  renderer.render(scene, camera);
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
