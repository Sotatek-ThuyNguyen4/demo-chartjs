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

const D3LineChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();

  const createGraph = async () => {
    let data = labels.map((item, idx) => {
      const date = labels[idx];
      const value = faker.datatype.number({ min: 0, max: 500 });
      return { date, value };
    });
    console.log(data);

    const screen = wrapperRef?.current?.getBoundingClientRect();
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = screen.width - margin.left - margin.right,
      height = (screen.width * 1) / 2 - margin.top - margin.bottom;

    var svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x = d3.scalePoint().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(labels);
    y.domain([
      0,
      d3.max(data, (d) => {
        return d.value;
      }),
    ]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    var valueLine = d3
      .line()
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
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  };

  useEffect(() => {
    createGraph();
    console.log("init");
  }, [svgRef]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3LineChart;
