import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import StatisticsApi from "../../../api/statistic/StatisticsApi";
import dayjs from "dayjs";
import { Alert, DatePicker } from "antd";
const { RangePicker } = DatePicker;
const AccountCountsByMonth = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: dayjs().subtract(6, "month"),
    endDate: dayjs(),
  });
  const [startDate, setStartDate] = useState(dayjs().subtract(6, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  useEffect(() => {
    asyncFetch();
  }, [selectedDate]);
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
  const asyncFetch = async () => {
    try {
      const res = await StatisticsApi.GetAccountCountsByMonth(selectedDate);
      // setData(res);
      const outputArray = res.map((item) => {
        const date = new Date(item.month);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return {
          Date: `${year}-${month.toString().padStart(2, "0")}`,
          scales: item.count,
        };
      });
      setData(outputArray);
    } catch (error) {
      console.log(error);
    }
  };
  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
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
          <Line {...config} />
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

export default AccountCountsByMonth;
