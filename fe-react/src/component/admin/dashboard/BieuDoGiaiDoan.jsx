import * as echarts from "echarts";

import { useEffect, useRef } from "react";
function BieuDoGiaiDoan({}) {
  let base = +new Date(1988, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let data = [[base, Math.random() * 300]];
  let data2 = [[base, Math.random() * 100]];
  for (let i = 1; i < 20000; i++) {
    let now = new Date((base += oneDay));
    data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
    data2.push([
      +now,
      Math.round((Math.random() - 0.5) * 20 + data2[i - 1][1]),
    ]);
  }
  const chartRef = useRef(null);
  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Định nghĩa dữ liệu và tùy chọn biểu đồ
    const option = {
      title: {
        left: "center",
        text: "Thống kê chi tiết ngày",
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
      },

      series: [
        {
          name: "Fake Data",
          type: "line",
          data: data,
        },
        {
          name: "Fake Data2",
          type: "line",
          data: data2,
        },
      ],
    };
    chart.setOption(option);

    // Đảm bảo rằng biểu đồ được tự động thay đổi kích thước khi cửa sổ trình duyệt thay đổi
    window.addEventListener("resize", () => {
      chart.resize();
    });

    // Xóa sự kiện khi component unmounted
    return () => {
      chart.dispose();
      window.removeEventListener("resize", () => {
        chart.resize();
      });
    };
  }, [data]);
  return (
    <>
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </>
  );
}
export default BieuDoGiaiDoan;
