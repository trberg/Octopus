import './styles.css';
import React, { useEffect } from 'react';
import { init } from './index_dag';

function App() {
  useEffect(() => { init() });

  return (
    <div className="octopus">
      {/* <h1>HELLO!</h1> */}
      <svg id="dag-tree" className="dag-tree"></svg>
    </div>
  );
}

export default App;
