import '@babylonjs/core/Debug/debugLayer';
import * as React from 'react';
import Renderer from './Components/Renderer';
import './App.css';

export default () => {
  return <React.StrictMode>
    <Renderer />
  </React.StrictMode>
};
