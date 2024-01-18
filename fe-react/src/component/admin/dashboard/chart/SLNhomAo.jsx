import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

const ThongKeComponent = () => {
  const [thongKeData, setThongKeData] = useState(undefined);

  useEffect(() => {
    const fetchThongKeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8089/api/thong-ke/soluongao"
        );
        setThongKeData(response.data);
      } catch (error) {
        console.error("Error fetching thong ke data:", error.message);
      }
    };

    fetchThongKeData();
  }, [thongKeData]);

  const getChartOption = () => {
    if (!thongKeData) {
      return;
    }
    return {
      dataset: {
        source: [
          ["product", "quantity"],
          ...thongKeData.map(([productType, quantity]) => [
            productType,
            quantity,
          ]),
        ],
      },
      grid: { containLabel: true },
      xAxis: { type: "value" },
      yAxis: { type: "category" },
      series: [
        {
          type: "bar",
          encode: {
            x: "quantity",
            y: "product",
          },
        },
      ],
    };
  };

  return (
    <div>
      <h4>Thống kê nhóm áo</h4>
      <ReactECharts option={getChartOption()} style={{ height: "400px" }} />
    </div>
  );
};

export default ThongKeComponent;
