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
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = three.PCFSoftShadowMap

  const spotLight = new three.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 10, 2);
  spotLight.angle = Math.PI / 3;
  spotLight.castShadow = true;
  spotLight.intensity = 200;
  spotLight.distance = 15;
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
  plane.position.set(0,0,0);
  scene.add(plane);

  const loader = new GLTFLoader();
  new Promise((resolve, reject) => {
      loader.load(
          '/torus_final.glb',
          gltf => {
            resolve();
            const torus = gltf.scene.getObjectByName('TorusFinalWithText');
            torus.position.set(0, 5, 0);
            spotLight.target = torus;
            scene.add(gltf.scene.children[0]);
            camera.position.set(0, 8.2, 0);
            camera.lookAt(torus.position);
            camera.rotation.z = Math.PI / 2;

            const mixer = new three.AnimationMixer(torus);
            gltf.animations.forEach(clip => mixer.clipAction(clip).play());
            const clock = new three.Clock();
            animate();
            async function animate() {
              requestAnimationFrame(animate);
              var delta = clock.getDelta();
              if (mixer) mixer.update(delta);
              renderer.render(scene, camera);
            }

            // clear container first
            const container = document.querySelector('.mainAnimDiv');
            if (container.children.length > 0) {
              for (const child of container.children) {
                child.remove();
              }
            }
            container.appendChild(renderer.domElement);

            renderer.render(scene, camera);
          },
          undefined,
          (error) => reject(error)
        );
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
