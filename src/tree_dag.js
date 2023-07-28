import { circleMouseover, circleMouseout, mouseDownCheckChildren, circleSize, circleClick } from "./circles_dag.js";
import { text_wrap } from './labels_dag.js';
import { sugiyama } from 'd3-dag';
import *  as d3 from 'd3';
import * as $ from 'jquery';
import './styles.css'


// set configuration values
const loadConfigs = () => {
    var configs = {};
    configs.margin = { top: 20, right: 30, bottom: 0, left: 30 };

    // initiate svg so widths and heights can be configured
    const svg = d3.select("svg#dag-tree")
        .style("background-color", "#fffff")
        .append("g")
        .attr("transform", "translate(" + configs.margin.left + "," + configs.margin.top + ")");

    return svg;
}

// *************** Generate the first version of the dag ****************
export function initialize(dag) {

    var doc_height = $(document).height();
    var doc_width = $(document).width();


    var nodeSizeHeight = doc_height / (dag.height().value + 2)
    var nodeSizeWidth = doc_width / 16

    var configs = {};
    configs.margin = { top: 20, right: 30, bottom: 0, left: 30 };

    // initiate svg so widths and heights can be configured
    const layout = sugiyama()
        .nodeSize(node => node === undefined ? [0, 0] : [nodeSizeWidth, nodeSizeHeight]);

    window.sug_layout = layout;
    //const layers = d3.sugify(dag);
    //console.log(layout);

    const { width, height } = layout(dag);
    window.dag = dag;

    const svg = d3.select("svg#dag-tree")
        .attr("width", doc_width)
        .attr("height", doc_height)
        .style("background-color", "#fffff");
    //.append("g")
    //    .attr("transform", "translate(" + configs.margin.left + "," + configs.margin.top + ")");
    // console.log(dag);
    return [dag, svg];
}


// ************** Generate the tree diagram	 *****************
export function update(dag, svgSelection, data) {

    try {

        // layout dag
        window.sug_layout(dag);

        // timing configuration     s
        var duration = 2500,
            exit_duration = 2500,
            wait_time = 800,
            easement = d3.easeElastic,
            exit_easement = d3.easeBack;


        // Function to generate link between nodes
        const gen_link = d3.link(d3.curveBumpY)
            .x(d => d.x)
            .y(d => d.y);

        // ===== LINKS =====
        // Setup initial link attributes
        var link = svgSelection.selectAll("path")
            .data(dag.links(), function (d) { return `${d.source.data.id}-${d.target.data.id}`; });

        // initiate the links
        link.join(
            function (enter) {
                //console.log("ENTER")
                return enter.append('path')
                    .attr("id", (d) => { return "n" + `${d.source.data.id}-${d.target.data.id}`; })
                    .attr("class", "link")
                    .attr("d", (d) => gen_link(d))
                    .transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .attr("d", (d) => gen_link(d))
                    .style("stroke", ({ target }) => { return `${target.data.color}` })
                    .style("stroke-width", ({ source, target }) => {
                        var minValue = Math.min(...[source.data.counts, target.data.counts])
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
                    .ease(d3.easeLinear)
                    .duration(duration)
                    .attr("d", (d) => gen_link(d))
                    .style("stroke", ({ target }) => { return `${target.data.color}` })
                    .style("stroke-width", ({ source, target }) => {
                        var minValue = Math.min(...[source.data.counts, target.data.counts])
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
                    .attr("d", (d) => transform_links(d, gen_link, 'exit'))
                    .style("opacity", 1e-6)
                    .attr("stroke-width", 0)
                    .remove();
            }
        );


        // ===== NODES =====
        // setup intial node attributes
        const nodes = svgSelection
            .selectAll("circle")
            .data(dag.descendants(), function (d) { return d.data.id });

        // initiate the nodes
        nodes.join(
            function (enter) {
                return enter.append("circle")
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")" })
                    .attr("id", (n) => "n" + n.data.id)
                    .attr("stroke", "black")
                    .attr("fill", (n) => n.data.color)
                    .attr("r", 0)
                    .on("mouseover", function (d) { circleMouseover(d) })
                    .on("mousedown", function (e, d) { mouseDownCheckChildren(e, d) })
                    .on("mouseup", function (d) { circleMouseover(d) })
                    .on("mouseout", function (d) { circleMouseout(d) })
                    .on("click", (e, d) => circleClick(e, d, dag, svgSelection, data))
                    .transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .attr("transform", (n) => transform_nodes(n, 'enter'))
                    .attr("r", (n) => circleSize(n));
            },
            function (update) {
                return update.raise().transition()
                    .delay(wait_time)
                    .ease(d3.easeLinear)
                    .duration(duration)
                    .attr("transform", (n) => transform_nodes(n, 'update'))
                    .attr("fill", (n) => n.data.color);
                //.attr("r", (n) => circleSize(n) );
            },
            function (exit) {
                return exit.transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                    .attr("transform", (n) => transform_nodes(n, 'exit'))
                    .style("opacity", 1e-6)
                    .attr("fill", (d) => {
                        //console.log(d.data); 
                        return "black";
                    })
                    .attr("r", 0.5)
                    .remove();
            }
        );


        // ===== TEXT =====
        // Add text to nodes
        const text = svgSelection
            .selectAll("text")
            .data(dag.descendants(), function (d) { return d.data.id });

        text.join(
            function (enter) {
                return enter.append("text")
                    .text((d) => d.data.name)
                    .attr("id", (d) => "n" + d.data.id)
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")" })
                    .attr("font-weight", "800")
                    .attr("font-family", "sans-serif")
                    .attr("text-anchor", "middle")
                    .attr("font-size", 0)
                    .attr("alignment-baseline", "baseline")
                    .attr("fill", "black")
                    .transition()
                    .delay(wait_time)
                    .ease(easement)
                    .duration(duration)
                    .call(text_wrap, 20)
                    .attr("font-size", 10);
            },
            function (update) {
                return update.raise().transition()
                    .delay(wait_time)
                    .ease(d3.easeLinear)
                    .duration(duration)
                    .attr("transform", (d) => { return "translate(" + d.x + "," + d.y + ")" });
            },
            function (exit) {
                return exit.transition()
                    .ease(exit_easement)
                    .duration(exit_duration)
                    .attr("font-size", 1)
                    .attr("transform", (n) => transform_nodes(n, 'exit'))
                    .style("opacity", 1e-6)
                    .remove();
            }
        );

    } catch (error) {
        console.log(error);
    }
};

function transform_links(d, diagonal, stage) {

    console.log("LINKS");
    console.log(stage);
    // setting the transition path for the exiting links
    if (stage == 'exit') {
        var event_circle = d.source,
            event_circle_x = event_circle.x,
            event_circle_y = event_circle.y,
            event_circle_coord = { x: event_circle_x, y: event_circle_y };

        return diagonal({ source: event_circle_coord, target: event_circle_coord })
    }
}

function transform_nodes(d, stage) {
    //console.log(d);
    //console.log(stage);

    if (stage == "enter") {

       return "translate(" + d.x + "," + d.y + ")";
    } else if (stage == 'exit') {

            // d3.select(event.target).data()[0]
       var event_circle = d,
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

    // if (d3.event) {
    //     if (d3.event.type == "load") {

    //     } else if (d3.event && d3.event.isTrusted && d3.event.type == 'click') {
    //         var event_node = d3.select(d3.event.target).data()[0],
    //             x = event_node.x,
    //             y = event_node.y;
    //         return "translate(" + x + "," + y + ")";
    //     } else if (d3.event && d3.event.isTrusted && d3.event.type == 'click') {

    //         var cur_node = d;

    //         var event_node = d3.select(d3.event.target).data()[0],
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


// loads the configureation variables and initiates the tree
export async function tree(root) {

    // await loadConfigs();
    // set configurations

    // update tree
    update(root);
}

