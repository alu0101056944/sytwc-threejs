import * as React from 'react';

import ContentAndSidebar from './content-and-sidebar';

import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { fetchInnerHTML } from '../../static/fetch_innerhtml';
import { modelInnerHTML } from '../../static/model_innerhtml';

function setupScene() {
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = 400;

  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(45, VIEWPORT_WIDTH / VIEWPORT_HEIGHT,
      0.1, 1000);

  const renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new three.Color(0x232323));
  renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  renderer.shadowMap.enabled = true;

  const ambientLight = new three.AmbientLight(0x373737);
  scene.add(ambientLight);

  const loader = new GLTFLoader();
  new Promise((resolve, reject) => {
      loader.load(
          '/animation1_emission.glb',
          gltf => {
            resolve();
            scene.add(gltf.scene);
            gltf.scene.traverse(object => {
                  object.castShadow = true;
                  object.receiveShadow = true;
                });

            const centerCube =
                  gltf.scene.getObjectByName('Cube007');
            const spotLight = new three.SpotLight(0xFFFFFF);
            spotLight.position.set(4, 4, 0);
            spotLight.angle = Math.PI / 4.5;
            spotLight.target = centerCube;
            spotLight.castShadow = true;
            spotLight.shadow.bias = -0.0005;
            scene.add(spotLight);

            camera.rotation.z = Math.PI / 2;
            camera.position.set(7.8, 5, 0);
            const center = new three.Vector3(scene.position.x,
                  scene.position.y + 4, scene.position.z);
            camera.lookAt(center);

            const mixer = new three.AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => mixer.clipAction(clip).play());
            const clock = new three.Clock();

            // clear container first
            const container = document.querySelector('.glBlock');
            if (container.children.length > 0) {
              for (const child of container.children) {
                child.remove();
              }
            }
            container.appendChild(renderer.domElement);

            const modelCube = scene.children[1].getObjectByName('Model_cube');
            modelCube.scale.set(0.9, 0.9, 0.9);
            const fetchCube = scene.children[1].getObjectByName('Fetch_cube');
            fetchCube.scale.set(0.9, 0.9, 0.9)

            let mousePosition = new three.Vector2();
            window.addEventListener('pointermove', (event) => {
              const rect = renderer.domElement.getBoundingClientRect();
              mousePosition.x =
                  ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
              mousePosition.y =
                  - ((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
            });

            function gameloop() {
              const delta = clock.getDelta();
              if (mixer) {
                mixer.update(delta);
              }
              update(scene, camera, mousePosition);
              renderer.render(scene, camera);
              requestAnimationFrame(gameloop);
            }
            gameloop();
          },
          undefined,
          (error) => reject(error)
        );
      });
}

function update(scene, camera, mousePosition) {
  document.body.style.cursor = "auto";
  const fetchCube = scene.children[1].getObjectByName('Fetch_cube');
  fetchCube.scale.set(0.9, 0.9, 0.9);
  const modelCube = scene.children[1].getObjectByName('Model_cube');
  modelCube.scale.set(0.9, 0.9, 0.9);

  const raycaster = new three.Raycaster();
  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === fetchCube.id) {
      fetchCube.scale.set(0.7, 0.7, 0.7);
      window.addEventListener('click', () => {
            const sidebarDOMNode = document.querySelector('.sidebar');
            if (sidebarDOMNode) {
              for (const child of sidebarDOMNode.children) {
                child.remove();
              }
              const fetchTabContainer = document.createElement('div');
              fetchTabContainer.style.color = 'white';
              fetchTabContainer.innerHTML = fetchInnerHTML;
              sidebarDOMNode.append(fetchTabContainer);
            }
          }, { once: true });
      document.body.style.cursor = "pointer";
    } else if (intersects[i].object.id === modelCube.id) {
      modelCube.scale.set(0.7, 0.7, 0.7);
      window.addEventListener('click', () => {
            const sidebarDOMNode = document.querySelector('.sidebar');
            if (sidebarDOMNode) {
              for (const child of sidebarDOMNode.children) {
                child.remove();
              }
              const fetchTabContainer = document.createElement('div');
              fetchTabContainer.style.color = 'white';
              fetchTabContainer.innerHTML = modelInnerHTML;
              sidebarDOMNode.append(fetchTabContainer);
            }
          }, { once: true });
      document.body.style.cursor = "pointer";
    }
  }
}

const FirstGLBlock = () => {
  React.useEffect(setupScene, []);

  return (
    <ContentAndSidebar
        key='content1'
        sidebarContent={<p>It's information content here</p>}>
      <div className='glBlock'>
        {/* The canvas is attached here */}
      </div>
    </ContentAndSidebar>
  );
}

export default FirstGLBlock
