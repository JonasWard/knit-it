import {
  Camera,
  ArcRotateCamera,
  Color4,
  CreatePlane,
  Scene,
  Vector3,
  Mesh,
  HemisphericLight,
} from '@babylonjs/core';
import * as React from 'react';
import GeometrySidebar from './Sidebar';
import SceneComponent from './Scene';
import { createMaterial } from '../shaders/customShaderMaterial';

const onSceneReady = (scene: Scene, canvas: HTMLCanvasElement) => {
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  light.intensity = 1.5;
  scene.clearColor = new Color4(1, 1, 1, 1);
  const mesh = CreatePlane('aPlane', { size: 10000, sideOrientation: Mesh.DOUBLESIDE }, scene);
  mesh.material = createMaterial('aName', scene);

  scene.registerBeforeRender(() => {});

  const camera: ArcRotateCamera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 2,
    55,
    Vector3.Zero(),
    scene
  );
  camera.mode = Camera.ORTHOGRAPHIC_CAMERA
};

const onRender = (scene: Scene) => {};

const Renderer: React.FC = () => {
  return (
    <div>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id='babylon-canvas'
        engineOptions={undefined}
        adaptToDeviceRatio={undefined}
        sceneOptions={undefined}
      />
      <GeometrySidebar/>
    </div>
  );
};

export default Renderer;
