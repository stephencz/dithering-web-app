import React from 'react';
import { useState } from 'react';

import ToolBar from './components/ToolBar/ToolBar';
import ImagePreview from './components/ImagePreview/ImagePreview';
import InfoBar from './components/InfoBar/InfoBar';

import './App.scss';
import { DitheringOptions } from './Constants';

const App = () => {

  const [appState, setAppState] = useState({
    originalImage: null,
    renderedImage: null,
    dither: DitheringOptions.FLOYD_STEINBERG,
    quantize: null,
    resize: null
  });

  return (
    <div className="app">
      <ToolBar appState={ appState} setAppState={ setAppState }/>
      <ImagePreview />
      <InfoBar />
    </div>    
  );

}

export default App;
