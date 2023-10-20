import *  as d3 from 'd3';
import { dagStratify, sugiyama } from 'd3-dag';
import {once, isEmpty, uniq, flatten,} from 'lodash';

import { get_data } from './data.js';
import { circleMouseover, circleMouseout, mouseDownCheckChildren, circleSize, circleClick } from "./circles_dag.js";
import { text_wrap } from './labels_dag.js';
import './styles.css'


const dagCreator = once(function () {
    const createDag = dagStratify()    // makes create function to create dag from nodes with id and parents properties
        .id(({ id }) => id)
        .parentIds(({ parents }) => parents);
    return createDag;
});

export function render(data, toggleNode) {
    if (isEmpty(data)) {
        return;
    }
    data = Object.values(data);
    const createDag = dagCreator();
    const dag = createDag(data);

    // was: const [init_dag, svg] = initialize(dag);
    const doc_height = window.innerHeight;
    const doc_width = window.innerWidth;
    const nodeSizeHeight = doc_height / (dag.height().value + 2)
    const nodeSizeWidth = doc_width / 16

    // initiate svg so widths and heights can be configured
    const layout = sugiyama()
        .nodeSize(node => node === undefined ? [0, 0] : [nodeSizeWidth, nodeSizeHeight]);

    const svg = d3.select("svg#dag-tree")   // move this to happen once
        .attr("width", doc_width)
        .attr("height", doc_height)
        .style("background-color", "#fffff");
        //.append("g")
        //    .attr("transform", "translate(" + configs.margin.left + "," + configs.margin.top + ")");

    try {

        // layout dag
        layout(dag);

        // timing configuration     s
        const duration = 5000,
            exit_duration = 2500,
            wait_time = 800,
            //easement = d3.easeElastic,
            easement = d3.easeLinear,
            //exit_easement = d3.easeBack;
            exit_easement = d3.easeLinear;


        // Function to generate link between nodes
        const gen_link = d3.link(d3.curveBumpY)
            .x(d => d.x)
            .y(d => d.y);

        // ===== LINKS =====
        // Setup initial link attributes
        const link = svg.selectAll("path")
            .data(dag.links(), function (d) { return `${d.source.data.id}-${d.target.data.id}`; });

        // initiate the links
        link.join(
            function (enter) {
                //console.log("ENTER")
                return enter.append('path')
                    .attr("id", (d) => { return "n" + `${d.source.data.id}-${d.target.data.id}`; })
                    .attr("class", "link")
                    .attr("d", (d) => gen_link(d))
                    .style("stroke-width", 0)
                    .transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .attr("d", (d) => gen_link(d))
                    .style("stroke", ({ target }) => { return `${target.data.color}` })
                    .style("stroke-width", ({ source, target }) => {
                        const minValue = Math.min(...[source.data.counts, target.data.counts])
                        if (minValue == 0) {
                            return 1;
                        } else {
                            return minValue;
                        }
                    })
                    ;
            },
            function (update) {
                // console.log("UPDATE")
                return update.transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .attr("d", (d) => gen_link(d))
                    .style("stroke", ({ target }) => { return `${target.data.color}` })
                    .style("stroke-width", ({ source, target }) => {
                        const minValue = Math.min(...[source.data.counts, target.data.counts])
                        if (minValue == 0) {
                            return 1;
                        } else {
                            return minValue;
                        }
                    });
            },
            function (exit) {
                // console.log("EXIT");
                return exit.transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                    //.attr("d", (d) => transform_links(d, gen_link, 'exit'))
                    .style("opacity", 1e-6)
                    .attr("stroke-width", 0)
                    .remove();
            }
        );

        
        // ===== NODES =====
        // setup g elements to append text and circles
        let g = svg
                .selectAll("g")
                .data(dag.descendants(), function (d) { return d.data.id });

        g.join(
            function (enter) {
                g = enter.append("g")
                    .attr("id", (d) => "n" + d.data.id)
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")" });
                    // append circle
                    //console.log(g);
                    //debugger
                    g.append("circle")
                        .attr("id", (d) => "circle" + d.data.id)
                        .attr("stroke", "black")
                        .attr("fill", (n) => n.data.color)
                        .on("mouseover", function (d) { circleMouseover(d) })
                        .on("mousedown", function (e, d) { mouseDownCheckChildren(e, d) })
                        .on("mouseup", function (d) { circleMouseover(d) })
                        .on("mouseout", function (d) { circleMouseout(d) })
                        .on("click", (e, d) => circleClick(e, d, dag, svg, data, toggleNode))
                        .transition()
                        .delay(wait_time)
                        .ease(easement)
                        .duration(duration)
                            .attr("r", (n) => circleSize(n));
                g.append("text")
                        .attr("id", (d) => "text" + d.data.id)
                        .text((d) => d.data.name)
                        .attr("font-weight", "800")
                        .attr("font-family", "sans-serif")
                        .attr("text-anchor", "middle")
                        .attr("font-size", 0)
                        .attr("alignment-baseline", "baseline")
                        .attr("fill", "black")
                        //.attr("x", 0)
                        .attr("y", (d) => circleSize(d)+5)
                        .transition()
                        .delay(wait_time)
                        .ease(easement)
                        .duration(duration)
                            .call(text_wrap, 20)
                            .attr("font-size", 10);
                return g;
            },
            function (update) {
                return update.raise().transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")" });
            },
            function (exit) {
                exit.selectAll("circle").transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                        .attr("r", 0);

                

                exit.transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                        .attr("transform", (d) => {return "translate(" + d.x + "," + d.y + ")"})
                        .remove();

                exit.selectAll("text").transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                        .attr("font-size",1)
                        .attr("fill", "white");

            }
        );
    } catch (error) {
        console.error(error);
    }
};

function transform_links(d, diagonal, stage) {

    //console.log("LINKS");
    //console.log(stage);
    // setting the transition path for the exiting links
    if (stage == 'exit') {
        const event_circle = d.source,
            event_circle_x = event_circle.x,
            event_circle_y = event_circle.y,
            event_circle_coord = { x: event_circle_x, y: event_circle_y };

        return diagonal({ source: event_circle_coord, target: event_circle_coord })
    }
}

function transform_nodes(d, stage) {
    //console.log(d);
    //console.log(stage);

    return "translate(" + d.x + "," + d.y + ")";

    if (stage == "enter") {

        return "translate(" + d.x + "," + d.y + ")";
    } else if (stage == "update") {

        return "translate(" + d.x + "," + d.y + ")";
    } else if (stage == 'exit') {

        //     // d3.select(event.target).data()[0]
        const event_circle = d,
            x = event_circle.x,
            y = event_circle.y;

        return "translate(" + x + "," + y + ")";
    } else {

        return "translate(" + d.x + "," + d.y + ")";
    }

    /*handleLoad(); {
        console.log("load event");

        return "translate(" + d.x + "," + d.y + ")";
    }

    handleClick()*/

    // if (event) {
    //     if (event.type == "load") {

    //     } else if (event && event.isTrusted && event.type == 'click') {
    //         var event_node = d3.select(event.target).data()[0],
    //             x = event_node.x,
    //             y = event_node.y;
    //         return "translate(" + x + "," + y + ")";
    //     } else if (event && event.isTrusted && event.type == 'click') {

    //         var cur_node = d;

    //         var event_node = d3.select(event.target).data()[0],
    //             x = event_node.x,
    //             y = event_node.y;
    //         return "translate(" + cur_node.x + "," + cur_node.y + ")";
    //     } else {
    //         return "translate(" + d.parent.x + "," + d.parent.y + ")";
    //     }
    // } else {
    //     return "translate(" + d.x + "," + d.y + ")";
    // }

}
