import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import styles from "./styles.module.css";
import { faker } from "@faker-js/faker";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const colors = [
  { border: "#0ab39c", background: "rgb(10 179 156 / 6%)" },
  { border: "#f06548", background: "rgb(240 101 72 / 6%)" },
];

const D3LineChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();

  const genFakeData = () => {
    return labels.map((item, idx) => {
      const date = labels[idx];
      const value = faker.datatype.number({ min: 0, max: 500 });
      return { date, value };
    });
  };

  const createGraph = async () => {
    // Generate fake data
    const data = [genFakeData(), genFakeData()];
    // console.log("data", data);

    // set the dimensions of the graph
    const screen = wrapperRef?.current?.getBoundingClientRect();
    const margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = screen.width - margin.left - margin.right,
      height = (screen.width * 1) / 2 - margin.top - margin.bottom;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Define the div for the tooltip
    const div = d3
      .select(svgRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // set the ranges
    const x = d3.scalePoint().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    x.domain(labels);
    y.domain([
      0,
      d3.max(data.flat(), (d) => {
        return d.value;
      }),
    ]);

    var focusEl = svg.append("g").style("display", "none");

    // render area and line
    let options = { x, y, width, height, svg, focusEl };
    data.forEach((d, i) => {
      options.data = d;
      options.color = colors[i];
      renderAreaLine(options, i);
    });

    // add the X Axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g").call(d3.axisLeft(y).tickFormat((y) => "$" + y + "k"));
  };

  const renderAreaLine = (options, i) => {
    const { x, y, width, height, svg, data, color, focusEl } = options;

    // add the area
    const valueArea = d3
      .area()
      .curve(d3.curveNatural)
      .x(function (d) {
        return x(d.date);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.value);
      });

    svg
      .append("path")
      .data([data])
      .attr("class", "area")
      .attr("fill", color.background)
      .attr("d", valueArea);

    // add the valueline path
    const valueLine = d3
      .line()
      .curve(d3.curveNatural)
      .x((d) => {
        return x(d.date);
      })
      .y((d) => {
        return y(d.value);
      });

    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", color.border)
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);

    // append the circle at the intersection
    focusEl
      .append("circle")
      .attr("class", `y${i}`)
      .attr("fill", color.border)
      .attr("stroke", color.border)
      .attr("r", 4);
  };

  useEffect(() => {
    createGraph();
    console.log("init");
  }, []);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3LineChart;
