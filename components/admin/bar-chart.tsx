import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { makeBarchartOptions } from "@/lib/utils";
import { CtegoryWithProduct } from "@/types";

interface BarChartProps {
  allCategoryWithProduct: CtegoryWithProduct[] | [];
}

const BarChart = ({ allCategoryWithProduct }: BarChartProps) => {
  let categories;
  let totalProducts;
  let avgPrices;
  let avgDiscounts;

  if (allCategoryWithProduct) {
    let mappedData = makeBarchartOptions(allCategoryWithProduct);
    categories = mappedData.categories;
    totalProducts = mappedData.totalProducts;
    avgPrices = mappedData.avgPrices;
    avgDiscounts = mappedData.avgDiscounts;
  }

  // Define an array of colors for the categories
  const categoryColors = [
    "#7839ee",
    "#5718ca",
    "#b239ee",
    "#ee3990",
    "#7839ee",
  ];

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "Category Statistics",
      style: {
        color: "white",
      },
    },
    xAxis: {
      categories: categories,
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      title: {
        text: "Price",
        align: "middle",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
    tooltip: {
      valuePrefix: "$",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        colorByPoint: true,
      },
    },
    credits: { enabled: false },
    accessibility: {
      enabled: false,
    },
    legend: {
      align: "right",
      verticalAlign: "middle",
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
        name: "",
        data: avgPrices,
        colors: categoryColors,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
