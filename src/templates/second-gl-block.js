import * as React from 'react';

import ContentAndSidebar from './content-and-sidebar';

import * as three from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { kpiInnerHTML } from '../../static/kpi_innerhtml';

function setupScene() {
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = 400;

  const scene = new three.Scene();
  const camera = new three.PerspectiveCamera(45, VIEWPORT_WIDTH / VIEWPORT_HEIGHT,
      0.1, 1000);

  const renderer = new three.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new three.Color(0x191919));
  renderer.setSize(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
  renderer.shadowMap.enabled = true;

  const ambientLight = new three.AmbientLight(0x373737);
  scene.add(ambientLight);

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  const loader = new GLTFLoader();
  new Promise((resolve, reject) => {
      loader.load(
          '/DamagedHelmet.glb',
          gltf => {
            resolve();
            scene.add(gltf.scene);

            camera.rotation.z = Math.PI / 2;
            camera.position.set(1.5, 0, 2);
            const center = new three.Vector3(scene.position.x,
              scene.position.y - 0.15, scene.position.z);
            camera.lookAt(center);

            // clear container first
            const container = document.querySelector('.glBlock2');
            if (container.children.length > 0) {
              for (const child of container.children) {
                child.remove();
              }
            }
            container.appendChild(renderer.domElement);

            function gameloop() {
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

const SecondGLBlock = () => {
  React.useEffect(setupScene, []);

  React.useEffect(() => {
        const sidebarContentDiv =
            document.querySelector('.sidebarContent2');
        sidebarContentDiv.innerHTML = kpiInnerHTML;
      }, []);

  return (
    <ContentAndSidebar
        key='content2'
        sidebarContent={
            <div className='sidebarContent2'>
              {/* The content is inserted here by JS */}
            </div>
          }>
      <div className='glBlock2'>
        {/* The canvas is attached here */}
      </div>
    </ContentAndSidebar>
  );
}

export default SecondGLBlock
