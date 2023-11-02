import React, { useEffect, useState } from "react";
import { DualAxes } from "@ant-design/plots";
import StatisticsApi from "../../../api/statistic/StatisticsApi";
import { Alert, DatePicker, Tag } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import locale for Vietnamese language
import { useRef } from "react";
const { RangePicker } = DatePicker;
const CalculateMonthly = () => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: dayjs().subtract(6, "month"),
    endDate: dayjs(),
  });
  const [startDate, setStartDate] = useState(dayjs().subtract(6, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const totleRevenue = useRef(0);
  const [data, setData] = useState([
    {
      MonthYear: "1991/2/2",
      Revenue: 3,
      OrderCount: 10,
    },
    {
      MonthYear: "1992",
      Revenue: 4,
      OrderCount: 4,
    },
    {
      MonthYear: "1993",
      Revenue: 3.5,
      OrderCount: 5,
    },
    {
      MonthYear: "1994",
      Revenue: 5,
      OrderCount: 5,
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
      const res = await StatisticsApi.GetCalculateMonthlyRevenue(selectedDate);
      totleRevenue.current = res.reduce(
        (total, item) => total + item.Revenue,
        0
      );
      console.log(res);
      setData(res);
    } catch (error) {
      //   SetLoading(false);
    }
  }, [selectedDate]);

  const config = {
    data: [data, data],
    xField: "MonthYear",
    yField: ["Revenue", "OrderCount"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
    yAxis: {
      Revenue: {
        label: {
          formatter: (value) => `${value} VND`,
        },
      },
      OrderCount: {
        label: {
          formatter: (value) => `${value} Đơn Hàng`,
        },
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
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "10px",
          }}>
          {" "}
          <div>
            {" "}
            <Tag color="blue">
              Doanh thu {" của " + data && data.length + " tháng: "}
            </Tag>
            <Tag color="red">
              {totleRevenue.current.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </Tag>
          </div>
          <RangePicker
            value={[startDate, endDate]}
            onChange={handleDateChange}
            allowClear={false}
          />
        </div>
        {data && data.length > 0 ? (
          <DualAxes {...config} />
        ) : (
          <div
            style={{
              marginTop: 24,
              textAlign: "center",
            }}>
            <Alert message="Warning" type="warning" showIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default CalculateMonthly;
