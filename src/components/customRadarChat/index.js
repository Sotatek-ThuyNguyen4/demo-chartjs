import React from "react";
import styles from "./styles.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const options = {
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
      usePointStyle: true,
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.dataIndex !== null && context.dataset != null) {
            label += context.dataset.data[context.dataIndex];
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
};

const labels = ["2016", "2017", "2018", "2019", "2020", "2021"];
export const data = {
  labels,
  responsive: true,
  datasets: [
    {
      label: "Pending",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      borderColor: "#f7b84b",
      backgroundColor: "#f7b84b",
      borderWidth: 2,
      fill: {
        target: "origin",
        above: "rgb(247 184 75 / 6%)",
        below: "rgb(247 184 75 / 6%)",
      },
      pointRadius: 0,
    },
    {
      label: "Loss",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
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
    {
      label: "Won",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
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
  ],
};

const CustomRadarChart = () => {
  return <Radar options={options} data={data} />;
};

export default CustomRadarChart;
