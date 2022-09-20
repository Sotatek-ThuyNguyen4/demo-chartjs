import React from "react";
import styles from "./styles.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const VerticalLine = {
  id: "verticalLine",
  afterDraw: function (chart, args, options) {
    if (
      options.display &&
      chart.tooltip._active &&
      chart.tooltip._active.length
    ) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      ctx.save();

      // Line
      ctx.beginPath();
      ctx.setLineDash([5, 7]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.strokeStyle;
      ctx.stroke();
      ctx.restore();

      // Bottom Label
      ctx.beginPath();
      ctx.fillStyle = "rgb(173 181 189 / 30%)";
      ctx.strokeStyle = "rgb(173 181 189)";
      ctx.moveTo(x, bottomY - 6);
      ctx.lineTo(x + 8, bottomY);
      ctx.lineTo(x + 20, bottomY);
      ctx.lineTo(x + 20, bottomY + 36);
      ctx.lineTo(x - 20, bottomY + 36);
      ctx.lineTo(x - 20, bottomY);
      ctx.lineTo(x - 8, bottomY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  },
  defaults: {
    display: false,
    strokeStyle: "#b8add2",
    lineWidth: 1,
  },
};

const CustomTooltip = {
  id: "customTooltip",
  afterDraw: function (chart, args, options) {
    if (
      options.display &&
      chart.tooltip._active &&
      chart.tooltip._active.length
    ) {
      const activePoint =
        chart.tooltip._active[0].element.y < chart.tooltip._active[1].element.y
          ? chart.tooltip._active[0]
          : chart.tooltip._active[1];
      const ctx = chart.ctx;
      const leftX = chart.scales.x.left;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      const x =
        leftX + 180 < activePoint.element.x
          ? activePoint.element.x
          : activePoint.element.x + 200;
      const y =
        topY + 60 < activePoint.element.y
          ? activePoint.element.y
          : activePoint.element.y + 60;

      ctx.save();

      ctx.beginPath();
      ctx.strokeStyle = "rgb(33, 37, 41, 0.4)";
      ctx.roundRect(x - 180, y - 50, 170, 110, 10);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "#dee2e6";
      ctx.moveTo(x - 170, y - 50);
      ctx.lineTo(x - 28, y - 50);
      ctx.arcTo(x - 10, y - 50, x - 10, y - 30, 10);
      ctx.lineTo(x - 10, y - 20);
      ctx.lineTo(x - 180, y - 20);
      ctx.lineTo(x - 180, y - 40);
      ctx.arcTo(x - 180, y - 50, x - 110, y - 50, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.font = "14px inherit bold";
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "black";
      ctx.fillText(chart.tooltip.title[0], x - 170, y - 26);
      ctx.restore();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.strokeStyle = "rgb(173 181 189)";
      ctx.moveTo(x - 180, y - 20);
      ctx.lineTo(x - 10, y - 20);
      ctx.arcTo(x - 10, y + 60, x - 18, y + 60, 10);
      ctx.lineTo(x - 172, y + 60);
      ctx.arcTo(x - 180, y + 60, x - 180, y + 50, 10);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      chart.tooltip._active.forEach((dataset, index) => {
        const dataPoint = dataset.index;
        ctx.textAlign = "left";
        ctx.fillStyle = "#b8add2";
        ctx.font = "14px";

        ctx.beginPath();
        ctx.fillStyle = chart.tooltip.labelColors[0].backgroundColor;
        ctx.arc(x - 164, y + 2, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = chart.tooltip.labelColors[1].backgroundColor;
        ctx.arc(x - 164, y + 32, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.font = "bolder 14px";
        ctx.fillText(chart.data.datasets[0].label + ":", x - 148, y + 10);
        ctx.fillText(chart.data.datasets[1].label + ":", x - 148, y + 40);
        ctx.fillText(
          "$" + chart.data.datasets[0].data[dataPoint] + "k",
          x - 90,
          y + 10
        );
        ctx.fillText(
          "$" + chart.data.datasets[1].data[dataPoint] + "k",
          x - 85,
          y + 40
        );
      });
    }
  },
  defaults: {
    display: false,
    strokeStyle: "#b8add2",
    lineWidth: 1,
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  VerticalLine,
  CustomTooltip
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: function () {},
    },
    verticalLine: {
      display: true,
    },
    customTooltip: {
      display: true,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      display: true,
      borderType: "solid",
      lineWidth: 0,
      scaleLabel: {
        show: true,
      },
      ticks: {
        fontColor: "#8f9092",
        callback: function (value) {
          return "$" + value + "k";
        },
      },
    },
  },
  interaction: {
    intersect: false,
    mode: "index",
    axis: "x",
  },
};

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
export const data = {
  labels,
  responsive: true,
  datasets: [
    {
      label: "Revenue",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      tension: 0.5,
      borderColor: "#0ab39c",
      backgroundColor: "#0ab39c",
      borderWidth: 2,
      fill: {
        target: "origin",
        above: "rgb(10 179 156 / 6%)",
        below: "rgb(10 179 156 / 6%)",
      },
      pointRadius: 0,
    },
    {
      label: "Expenses",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      tension: 0.5,
      borderColor: "#f06548",
      backgroundColor: "#f06548",
      borderWidth: 2,
      fill: {
        target: "origin",
        above: "rgb(240 101 72 / 6%)",
        below: "rgb(240 101 72 / 6%)",
      },
      pointRadius: 0,
    },
  ],
  stroke: {
    curve: "smooth",
    width: 2,
  },
};

const CustomLineChart = () => {
  return <Line options={options} data={data} />;
};

export default CustomLineChart;
