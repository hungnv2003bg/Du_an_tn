import { useSelector } from "react-redux";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
function BieuDo12Thang({ title = "Tên biểu đồ", data = [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110] }) {
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: 'Doanh số theo tháng',
                subtext: '(Đơn vị: cái)',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data,
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c} cái',
                        fontSize: 12
                    }
                }

            ]
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
            <div ref={chartRef} style={{ marginLeft: "10%", width: '80%', height: '400px' }} />
        </>
    );
}

export default BieuDo12Thang;
