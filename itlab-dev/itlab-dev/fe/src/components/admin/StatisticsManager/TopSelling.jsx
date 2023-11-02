import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import { Alert, DatePicker } from "antd";
import StatisticsApi from "../../../api/statistic/StatisticsApi";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import locale for Vietnamese language

const { RangePicker } = DatePicker;

const TopSelling = ({ SetLoading }) => {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState([
    {
      type: "Sản phẩm 2",
      value: 3,
    },
    {
      type: "Sản phẩm 3",
      value: 1,
    },
    {
      type: "Sản phẩm 4",
      value: 1,
    },
    {
      type: "Sản phẩm 5",
      value: 1,
    },

  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(async () => {
    try {
      SetLoading(true);
      const res = await StatisticsApi.GetTopSellingProducts(selectedDate);
      const mappedData = res.map((item) => ({
        type: item.product.nameProduct,
        value: item.totalQuantity,
      }));
      SetLoading(false);
      setData(mappedData);
    } catch (error) {
      SetLoading(false);
    }
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
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <div style={{
        backgroundColor: '#F9FCFD',
        padding: 36
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
          <div style={{
            marginTop: 24,
            textAlign: 'center'
          }}>
            <Alert message="Dữ liệu rỗng" type="warning" showIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default TopSelling;
