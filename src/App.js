import './styles.css';
import React, { useEffect, useState, } from 'react';
import { render } from './tree_dag';
import {getData, toggleNode} from "./data";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const _data = await getData();
      setData(_data);
    })();
  }, []);

  useEffect(() => {
    render(data, () => toggleNode(data, setData));
  }, [data]);

  return (
    <div className="octopus">
      {/* <h1>HELLO!</h1> */}
      <svg id="dag-tree" className="dag-tree"></svg>
    </div>
  );
}

export default App;
