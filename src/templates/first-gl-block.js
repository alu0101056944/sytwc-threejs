import * as React from 'react';

import ContentAndSidebar from './content-and-sidebar';
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
  // renderer.shadowMap.type = three.PCFSoftShadowMap;

  const spotLight = new three.SpotLight(0xFFFFFF);
  spotLight.position.set(2, 9, 0);
  spotLight.angle = Math.PI / 3;
  spotLight.castShadow = true;
  spotLight.intensity = 20;
  // spotLight.distance = 15;
  // spotLight.penumbra = 0.2;
  // spotLight.shadow.mapSize = new three.Vector2(1024, 1024);
  scene.add(spotLight);

  const spotLight2 = new three.SpotLight(0xFFFFFF);
  spotLight2.position.set(4, 3, 0);
  spotLight2.angle = Math.PI / 2;
  spotLight2.castShadow = true;
  spotLight2.intensity = 20;
  // spotLight2.distance = 15;
  // spotLight2.penumbra = 0.2;
  // spotLight2.shadow.mapSize = new three.Vector2(1024, 1024);
  scene.add(spotLight2);

  // const ambientLight = new three.AmbientLight(0x353535);
  // scene.add(ambientLight);

  const loader = new GLTFLoader();
  new Promise((resolve, reject) => {
      loader.load(
          '/animation1.glb',
          gltf => {
            resolve();
            scene.add(gltf.scene);
            gltf.scene.traverse(object => {
                  object.castShadow = true;
                  object.receiveShadow = true;
                });

            camera.rotation.z = Math.PI / 2;
            camera.position.set(8, 5, 0);
            const center = new three.Vector3(scene.position.x,
                  scene.position.y + 4, scene.position.z);
            camera.lookAt(center);
            const mixer = new three.AnimationMixer(gltf.scene);
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
            const container = document.querySelector('.glBlock');
            if (container.children.length > 0) {
              for (const child of container.children) {
                child.remove();
              }
            }
            container.appendChild(renderer.domElement);

            updateColorOnMouseHover(scene, camera, renderer);

            renderer.render(scene, camera);
          },
          undefined,
          (error) => reject(error)
        );
      });
}

function updateColorOnMouseHover(scene, camera, renderer) {
  const currentColorAndOldColorPerId = {};

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
  )
}

export default FirstGLBlock
