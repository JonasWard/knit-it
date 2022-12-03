import {ShaderMaterial, Scene, Effect} from '@babylonjs/core';

Effect.ShadersStore['aVertexShader'] = "\r\n" +
"precision highp float;\r\n" +
"// Attributes\r\n" +
"attribute vec3 position;\r\n" +
"attribute vec2 uv;\r\n" +
"// Uniforms\r\n" +
"uniform mat4 worldViewProjection;\r\n" +
"// Varying\r\n" +
"varying vec2 vUV;\r\n" +
"void main(void) {\r\n" +
"    gl_Position = worldViewProjection * vec4(position, 1.0);\r\n" +
"    vUV = uv;\r\n" +
"}\r\n";

Effect.ShadersStore['aFragmentShader'] = "\r\n" + "precision highp float;\r\n" + "varying vec2 vUV;\r\n" + "uniform sampler2D textureSampler;\r\n" + "void main(void) {\r\n" + "    gl_FragColor = vec4(1, 0.2, 0.3, 1);\r\n" + "}\r\n";


export const createMaterial = (shaderName: string, scene: Scene, ) => {
  return new ShaderMaterial(
  'shader'+shaderName,
  scene,
  {
    vertex: 'a',
    fragment: 'a',
    attributes: ["position", "normal", "uv"],
    uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
  },
  )
};