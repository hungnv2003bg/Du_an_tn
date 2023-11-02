import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Alert, DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import StatisticsApi from "../../../api/statistic/StatisticsApi";

const { RangePicker } = DatePicker;
const CalculateOrder = () => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: dayjs().subtract(6, "month"),
    endDate: dayjs(),
  });
  const [startDate, setStartDate] = useState(dayjs().subtract(6, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState([
    {
      type: "dxl",
      value: 27,
    },
    {
      type: "h",
      value: 25,
    },
    {
      type: "dg",
      value: 18,
    },
    {
      type: "ht",
      value: 15,
    },
  ]);

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const startDate = dates[0].format("YYYY/MM/DD");
      const endDate = dates[1].format("YYYY/MM/DD");
      setStartDate(dates[0]);
      setEndDate(dates[1]);
      setSelectedDate({
        startDate,
        endDate,
      });
      // Thực hiện các xử lý khác với khoảng ngày đã chọn
    }
  };
  useEffect(async () => {
    try {
      const res = await StatisticsApi.GetCalculateOrderStatusData(selectedDate);
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }, [selectedDate]);
  const totalOrderCount = data?.reduce((acc, item) => acc + item.orderCount, 0);
  const config = {
    appendPadding: 10,
    data,
    angleField: "orderCount",
    colorField: "orderStatus",
    color: ({ orderStatus }) => {
      if (orderStatus === "Đang xử lý") {
        return "#70a1ff";
      } else if (orderStatus === "Hủy bỏ") {
        return "#ff4757";
      } else if (orderStatus === "Đang giao") {
        return "#ffa502";
      }else if (orderStatus === "Khách hàng hủy") {
        return "#FF4500";
      }else if (orderStatus === "Xác nhận đơn") {
        return "#9ACD32";
      }
      return "#2ed573";
    },
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: () => `Tổng đơn ${totalOrderCount}`,
      },
    },
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#F9FCFD",
          padding: 36,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: "10px",
          }}>
          {" "}
          <RangePicker
            value={[startDate, endDate]}
            onChange={handleDateChange}
            allowClear={false}
          />
        </div>
        {data && data.length > 0 ? (
          <Pie {...config} />
        ) : (
          <div
            style={{
              marginTop: 24,
              textAlign: "center",
            }}>
            <Alert message="Dữ liệu rỗng" type="warning" showIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default CalculateOrder;
