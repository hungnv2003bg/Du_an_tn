import React, { useState, useEffect, useCallback } from 'react';
import { DatePicker } from 'antd';
import * as echarts from 'echarts';
import moment from 'moment';

const { RangePicker } = DatePicker;

const YourComponent = () => {
  const [yearRange, setYearRange] = useState([moment().year() - 1, moment().year()]); // Default to the last two years
  const [yearlyProfits, setYearlyProfits] = useState({});
  const [chart, setChart] = useState(null);

  const createChartOption = useCallback(() => {
    if (!yearlyProfits || Object.keys(yearlyProfits).length === 0) {
      return {}; // Return an empty object or handle the case when yearlyProfits is not yet available
    }

    const months = Object.keys(yearlyProfits[Object.keys(yearlyProfits)[0]]);
    const sortedMonths = months.sort((a, b) => moment(a, 'MMMM').month() - moment(b, 'MMMM').month());

    const xAxisData = sortedMonths.slice(0, 12); // Display data for the first 12 months
    const seriesData = Object.keys(yearlyProfits).flatMap((year) => [
      {
        name: year + ' - Tổng Doanh Thu',
        type: 'line',
        data: xAxisData.map((month) => yearlyProfits[year][month].tongDoanhThu),
      },
      {
        name: year + ' - Chi Phí',
        type: 'line',
        data: xAxisData.map((month) => yearlyProfits[year][month].loiNhuanSauKhiTruChiPhi),
      }
    ]);

    return {
      title: {
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: Object.keys(yearlyProfits).flatMap((year) => [year + ' - Tổng Doanh Thu', year + ' - Chi Phí']),
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        data: xAxisData,
      },
      yAxis: {
        name: 'Values',
      },
      series: seriesData,
    };
  }, [yearlyProfits]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8089/api/thong-ke/bieu-do-tong-hop?startYear=${yearRange[0]}&endYear=${yearRange[1]}`);
        const data = await response.json();
        setYearlyProfits(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [yearRange]);

  useEffect(() => {
    if (chart) {
      chart.setOption(createChartOption());
    }
  }, [yearlyProfits, chart, createChartOption]);

  useEffect(() => {
    const chartDom = document.getElementById('chart');
    const newChart = echarts.init(chartDom);
    setChart(newChart);

    // Set the canvas size
    newChart.resize({
      width: 1100,
      height: 400,
    });

    return () => {
      newChart.dispose();
    };
  }, []);

  return (
    <div>
      <RangePicker
        picker="year"
        onChange={(dates, dateStrings) => setYearRange([parseInt(dateStrings[0], 10), parseInt(dateStrings[1], 10)])}
      />
      {/* <h5>Thống kê theo năm thanh-bar</h5> */}

      <div id="chart" style={{ width: '90%', height: '400px'}} />
    </div>
  );
};

export default YourComponent;
