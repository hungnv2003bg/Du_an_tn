import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Col, Row, Statistic ,Space} from 'antd';
import axios from 'axios';
import { DollarOutlined } from '@ant-design/icons';

import { DatePicker, Button, message } from 'antd';


const formatter = (value) => <CountUp end={value} separator="," />;






function NgayThang() {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalThang, setTotalThang] = useState(null);

  const { RangePicker } = DatePicker;


  useEffect(() => {
    // Fetch total revenue for the day
    axios.get('http://localhost:8089/api/thong-ke/doanh-thu-ngay1')
      .then(response => {
        const revenue = response.data;
        setTotalRevenue(revenue);
      })
      .catch(error => {
        console.error('Error fetching total revenue for the day:', error.response?.data || error.message);
      });
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  useEffect(() => {
    // Fetch total revenue for the month
    axios.get('http://localhost:8089/api/thong-ke/tong-doanh-thu-trong-thang1')
      .then(response => {
        const revenue = response.data;
        setTotalThang(revenue);
      })
      .catch(error => {
        console.error('Error fetching total revenue for the month:', error.response?.data || error.message);
      });
  }, []);


  const [dateRange, setDateRange] = useState([]);
  const [totalKhoang, setTotalKhoang] = useState(null);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleCalculateTotalRevenue = () => {
    if (!Array.isArray(dateRange) || dateRange.length < 2) {
      // Date range not selected, show error message or take appropriate action
      message.error('Không được để trống');
      return;
    }


    const [selectedDateStart, selectedDateEnd] = dateRange;

    axios.get('http://localhost:8089/api/thong-ke/tong-khoang-ngay', {
      params: {
        selectedDateStart: selectedDateStart.format('YYYY-MM-DD'),
        selectedDateEnd: selectedDateEnd.format('YYYY-MM-DD'),
      },
    })
      .then(response => {
        const revenue = response.data;
        setTotalKhoang(revenue);
      })
      .catch(error => {
        console.error('Error fetching total revenue:', error.response?.data || error.message);
      });
  };

  // const formatter = (value) => `$ ${value}`;




  return (
    <Row gutter={16}>
      <Col span={8}>
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          <Statistic title="Doanh số trong ngày" value={totalRevenue} formatter={formatter} />
          <DollarOutlined style={{ marginTop: '25px', color: 'gold' }} />
        </h3>
      </Col>
      <Col span={8}>
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          <Statistic title="Doanh số trong tháng(hiện tại)" value={totalThang} formatter={formatter} />
          <DollarOutlined style={{ marginTop: '25px', color: 'gold' }} />
        </h3>
      </Col>
      <Col span={8}>
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
              <Space>
                <RangePicker value={dateRange} onChange={handleDateChange} />
                <Button type="primary" onClick={handleCalculateTotalRevenue}>
                  Chọn
                </Button>
              </Space>
          </h3>

          {totalKhoang !== null && (
            <div>
              <h5 style={{ display: 'flex', alignItems: 'center' }}>
                <Statistic title="Doanh số trong khoảng" value={totalKhoang} formatter={formatter} />
                <DollarOutlined style={{ marginTop: '25px', color: 'gold' }} />
              </h5>
            </div>
          )}
        </div>
      </Col>

    </Row>
  );
}

export default NgayThang;
