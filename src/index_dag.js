
import { update, initialize } from "./tree_dag.js";
import { get_data } from './data.js';
import { dagStratify } from 'd3-dag';

var data = get_data();

// initialize first tree
export const init = async () => {

    const create = dagStratify()
        .id(({ id }) => id)
        .parentIds(({ parents }) => parents);


    const dag = create(data);

    const [init_dag, svg] = initialize(dag);


    // create and render tree
    update(init_dag, svg, data);

}

init();