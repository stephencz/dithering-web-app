import React from 'react';
import { useState } from 'react';

import ToolBar from './components/ToolBar/ToolBar';
import ImagePreview from './components/ImagePreview/ImagePreview';

import './App.scss';
import { DitheringOptions, QuantizationOptions, ResizeOptions } from './Constants';

const App = () => {

  const [appState, setAppState] = useState({
    originalImage: null,
    renderedImage: null,
    dither: DitheringOptions.NONE,
    quantization: QuantizationOptions.NONE,
    shouldResize: false,
    resize: ResizeOptions.NONE,
    resizeWidth: 0,
    resizeHeight: 0
  });

  return (
    <div className="app">
      <ToolBar appState={ appState} setAppState={ setAppState }/>
      <ImagePreview appState={ appState } />
    </div>    
  );

}

export default App;
