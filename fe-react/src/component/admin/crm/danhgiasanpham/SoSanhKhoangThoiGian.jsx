import { useSelector } from "react-redux";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
import { Col, Row } from "antd";
function SoSanhKhoangThoiGian({ title = {
    title: "Tên biểu đồ",
    sub: '(Đơn vị: cái)',
    nam: {
        truoc: "2022",
        sau: "2023"
    },
    type: false,
},
    data = [{
        _2022: 0,
        _2023: 0
    }] }) {
    const arr = data.map((item, index) => {
        return [
            "Tháng " + Number(index + 1), item._2022, item._2023
        ]
    })
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: title.title,
                subtext: title.sub,
                top: 'top',
                left: 'left'
            },
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', (title.type ? "Doanh số " : "Doanh thu ") + title.nam.truoc, (title.type ? "Doanh số " : "Doanh thu ") + title.nam.sau],
                    ...arr
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [{ type: 'bar' }, { type: 'bar' }]
        };
        chart.setOption(option);
        // Đảm bảo rằng biểu đồ được tự động thay đổi kích thước khi cửa sổ trình duyệt thay đổi
        window.addEventListener('resize', () => {
            chart.resize();
        });

        // Xóa sự kiện khi component unmounted
        return () => {
            chart.dispose();
            window.removeEventListener('resize', () => {
                chart.resize();
            });
        };
    }, [data]);
    return (
        <>
            <div ref={chartRef} style={{ marginLeft: "10%", width: '80%', height: '600px' }} />
        </>
    );
}

export default SoSanhKhoangThoiGian;
