import React from "react";
import styles from "./styles.module.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

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
          let label = context.label || "";

          if (label) {
            label += ": ";
          }
          if (context.dataIndex !== null && context.dataset != null) {
            label += context.dataset.data[context.dataIndex] + " orders";
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

const labels = ["Canada", "Greenland", "Russia", "HaNoi", "HongKong"];
export const data = {
  labels,
  responsive: true,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const CustomPolarAreaChart = () => {
  return <PolarArea options={options} data={data} />;
};

export default CustomPolarAreaChart;
