import React from 'react';
import logo from './logo.svg';
import './App.css';
import HOOKS from './HOOKS/hooks';
import Basic from './HighOrderComponent/BasicClass';
import PictureLoader from './Components/Picture-Loader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hooks</h1>
        <HOOKS />
        <h1>Basic</h1>
        <Basic />
        <h1>Picture Loader</h1>
        <PictureLoader />
      </header>
    </div>
  );
}

export default App;
