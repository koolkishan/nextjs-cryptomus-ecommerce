import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { makePieChartOptions } from "@/lib/utils";
import { orderTypes } from "@/types";

interface PieChartProps {
  orders: orderTypes[];
}

const PieChart = ({ orders }: PieChartProps) => {
  const { canceledPercentage, deliveredPercentage, pendingPercentage } =
    makePieChartOptions(orders);

  const options = {
    chart: {
      type: "pie",
      animation: true,
      backgroundColor: "transparent",
    },
    title: {
      text: "Order Status",
      style: {
        color: "white",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>", // Display percentage in tooltip
    },
    credits: { enabled: false },
    accessibility: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          distance: -50,
          style: {
            fontWeight: "bold",
            textOutline: "0px contrast",
          },
        },
        showInLegend: true,
        colors: ["#7839ee", "#5718ca", "#b239ee", "#7839ee"],
      },
    },
    legend: {
      align: "bottom",
      verticalAlign: "middle",
      layout: "vertical",
      itemMarginTop: 5,
      itemStyle: {
        color: "white",
        fontSize: "16px",
      },
      itemHoverStyle: {
        color: "white",
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          {
            name: "Pending",
            y: pendingPercentage,
          },
          {
            name: "Canceled",
            y: canceledPercentage,
          },
          {
            name: "Delivered",
            y: deliveredPercentage,
          },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
