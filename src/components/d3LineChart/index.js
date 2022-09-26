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

const title = ["Revenue", "Expenses"];

const D3LineChart = () => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const tooltipRef = useRef();
  const labelBottomRef = useRef();

  const genFakeData = () => {
    return labels.map((item, idx) => {
      const date = idx;
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

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    x.domain([0, labels.length - 1]);
    y.domain([
      0,
      d3.max(data.flat(), (d) => {
        return d.value;
      }),
    ]);

    var focusEl = svg.append("g").style("display", "none");
    var tooltipEl = d3.select(tooltipRef.current);

    // render area and line
    let options = { x, y, width, height, svg, focusEl };
    data.forEach((d, i) => {
      options.data = d;
      options.color = colors[i];
      renderAreaLine(options, i);

      const tooltipData = tooltipEl.select("ul").append("li");
      tooltipData.append("span").style("background-color", colors[i].border);
      tooltipData.append("span").attr("class", `data${i}`);
    });

    // add the X Axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickFormat((x) => labels[x]));

    // add the Y Axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickFormat((y) => "$" + y + "k"));

    // add the X gridlines
    svg
      .append("line")
      .attr("class", "x-grid")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height)
      .style("opacity", 0)
      .style("stroke-dasharray", "5, 7")
      .style("stroke-width", 1)
      .style("stroke", "rgb(182, 182, 182)")
      .style("fill", "none");

    // add the Y gridlines
    svg
      .append("g")
      .attr("class", "y-grid")
      .style("color", "rgba(243, 246, 249, 0.75)")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""));

    const mousemove = (e) => {
      const bisectDate = d3.bisector(function (d) {
        return d.date;
      }).left;
      const x0 = x.invert(d3.pointer(e, this)[0]);

      data.forEach((dt, idx) => {
        const i = bisectDate(dt, x0, 1),
          d0 = dt[i - 1],
          d1 = dt[i],
          d = x0 - d0?.date > d1?.date - x0 ? d1 : d0;
        focusEl
          .select(`circle.y${idx}`)
          .attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
        svg
          .select("line.x-grid")
          .attr("x1", x(d.date))
          .attr("x2", x(d.date))
          .style("opacity", 1);

        const tooltipLeft =
          x(d.date) < width / 2 ? x(d.date) + 85 : x(d.date) - 95;
        const tooltipTop =
          y(d.value) + 150 > height ? height - 140 : y(d.value);
        const tooltipTitle = labels[d.date];

        tooltipEl
          .style("left", `${tooltipLeft}px`)
          .style("top", `${tooltipTop}px`)
          .style("opacity", 1);
        tooltipEl.select("#title").text(tooltipTitle);
        tooltipEl.select(".data").text(tooltipTitle);

        tooltipEl
          .select(`.data${idx}`)
          .html(title[idx] + ": <b>$" + d.value + "k</b>");

        d3.select(labelBottomRef.current)
          .style("left", `${x(d.date) + 50}px`)
          .text(tooltipTitle)
          .style("opacity", 1);
      });
    };

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function () {
        focusEl.style("display", null);
      })
      .on("mouseout", function () {
        focusEl.style("display", "none");
        svg.select("line.x-grid").style("opacity", 0);
        d3.select(tooltipRef.current)
          .transition()
          .duration(200)
          .style("opacity", 0);
        d3.select(labelBottomRef.current)
          .transition()
          .duration(200)
          .style("opacity", 0);
      })
      .on("mousemove", mousemove);
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
    <div ref={wrapperRef} className={styles.wrapper}>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className={styles.tooltip}>
        <div className={styles.header}>
          <span id="title"></span>
        </div>
        <div className={styles.content}>
          <ul></ul>
        </div>
      </div>
      <div ref={labelBottomRef} className={styles.labelBottom}></div>
    </div>
  );
};

export default D3LineChart;
