import * as React from 'react';

import * as three from 'three';

function setupScene() {
  const VIEWPORT_WIDTH = 500;
  const VIEWPORT_HEIGHT = 400;

  var scene = new three.Scene();
  var camera = new three.PerspectiveCamera(45,VIEWPORT_WIDTH/VIEWPORT_HEIGHT,0.1,1000);
  var renderer = new three.WebGLRenderer();
  renderer.setClearColor(new three.Color(0x000000));
  renderer.setSize(500,400);

  var axes = new three.AxesHelper(20);
  scene.add(axes);

  var planeGeometry = new three.PlaneGeometry(60,20);
  var planeMaterial = new three.MeshBasicMaterial({
      color:0xAAAAAA
  });
  var plane = new three.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -0.5*Math.PI;
  plane.position.set(15,0,0);
  scene.add(plane);

  var cubeGeometry = new three.BoxGeometry(4,4,4);
  var cubeMaterial = new three.MeshBasicMaterial({
      color:0xFF0000,
      wireframe:true
  });
  var cube = new three.Mesh(cubeGeometry,cubeMaterial);
  cube.position.set(-4,3,0);
  scene.add(cube);

  var sphereGeometry = new three.SphereGeometry(4,20,20);
  var sphereMaterial = new three.MeshBasicMaterial({
      color:0x7777ff,
      wireframe:true
  });

  var sphere = new three.Mesh(sphereGeometry,sphereMaterial);
  sphere.position.set(20,4,2);
  scene.add(sphere);

  camera.position.set(-30,40,30);
  camera.lookAt(scene.position);

  const container = document.querySelector('.mainAnimDiv');
  
  // clear container first
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
