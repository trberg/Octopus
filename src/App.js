import './styles.css';
import React, { useEffect, useState, } from 'react';
import { render } from './tree_dag';
import {getData} from "./data";

function App() {
  const [data, setData] = useState([]);
  function modifyData(modification) {
    const _data = getData(modification);
    setData(_data);
  }
  useEffect(() => {
    modifyData();
  });
  useEffect(() => {
    render(data, modifyData);
  }, [data]);

  return (
    <div className="octopus">
      {/* <h1>HELLO!</h1> */}
      <svg id="dag-tree" className="dag-tree"></svg>
    </div>
  );
}

export default App;
