import './styles.css';
import React, { useEffect, useState, } from 'react';
import { render } from './tree_dag';
import {getData, toggleNode, makeGraph} from "./data";

function App() {
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState();

  useEffect(() => {
    (async () => {
      const _data = await getData();
      const G = makeGraph(data);
      setData(_data);
      setGraph(G);
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
