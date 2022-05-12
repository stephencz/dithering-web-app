import React from 'react';

import ToolBar from './components/ToolBar/ToolBar';
import ImagePreview from './components/ImagePreview/ImagePreview';
import InfoBar from './components/InfoBar/InfoBar';

import './App.scss';

const App = () => {

  return (
    <div className="app">
      <ToolBar />
      <ImagePreview />
      <InfoBar />
    </div>    
  );

}

export default App;
