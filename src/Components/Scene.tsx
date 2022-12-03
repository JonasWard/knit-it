import { useEffect, useRef } from 'react';
import { Engine, Scene, EngineOptions, SceneOptions } from '@babylonjs/core';
import * as React from 'react';

interface ISceneProps {
  id: string;
  antialias: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onRender: (scene: Scene) => void;
  onSceneReady: (scene: Scene, canvas: HTMLCanvasElement) => void;
}

export const LocalScene: React.FC<ISceneProps> = ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady }) => {
  const reactCanvas: React.MutableRefObject<null | HTMLCanvasElement> = useRef(null);

  const [scene, setScene] = React.useState<Scene | undefined>(undefined);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (canvas) setScene(new Scene(new Engine(canvas), sceneOptions));
  }, [reactCanvas]);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (canvas && scene) {
      if (!canvas) return;

      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);

      if (scene.isReady()) onSceneReady(scene, canvas);
      else scene.onReadyObservable.addOnce((scene) => onSceneReady(scene, canvas));

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') onRender(scene);
        scene.render();
      });

      const resize = () => {
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        scene.getEngine().resize();
      };

      if (window) window.addEventListener('resize', resize);

      setScene(scene);

      return () => {
        scene.getEngine().dispose();
        if (window) window.removeEventListener('resize', resize);
      };
    }
  }, [reactCanvas, scene]);

  return <canvas ref={reactCanvas} />;
};

export default LocalScene;
