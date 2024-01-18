import * as echarts from "echarts";

import { useEffect, useRef } from "react";
function ThongKeBar({
  title = "Tên biểu đồ",
  subTitle = "fake-data",
  data = [
    {
      von: 0,
      doanhThu: 0,
    },
  ],
}) {
  const chartRef = useRef(null);
  const von = data.map((item) => {
    return item.von;
  });
  const doanhThu = data.map((item) => {
    return item.doanhThu;
  });
  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    // Định nghĩa dữ liệu và tùy chọn biểu đồ
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      title: {
        text: title,
        trigger: "axis",
      },
      legend: {
        data: ["Vốn", "Thu"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          // prettier-ignore
          data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Vốn",
          type: "bar",
          data: von,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
        },
        {
          name: "Thu",
          type: "bar",
          data: doanhThu,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
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
export default ThongKeBar;
