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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
          if (context.parsed.y !== null) {
            label += "$" + context.parsed.y + "k";
          }
          return label;
        },
      },
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
