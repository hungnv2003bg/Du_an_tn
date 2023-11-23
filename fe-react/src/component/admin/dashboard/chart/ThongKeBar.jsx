import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../language/selectLanguage";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
function ThongKeBar() {
    const language = useSelector(selectLanguage);
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        // Định nghĩa dữ liệu và tùy chọn biểu đồ
        const option = {
            title: {
                text: 'Rainfall vs Evaporation',
                subtext: 'Fake Data'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Rainfall', 'Evaporation']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    // prettier-ignore
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Rainfall',
                    type: 'bar',
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                    ],
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max' },
                            { type: 'min', name: 'Min' }
                        ]
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }]
                    }
                },
                {
                    name: 'Evaporation',
                    type: 'bar',
                    data: [
                        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                    ],
                    markPoint: {
                        data: [
                            { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
                            { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    },
                    markLine: {
                        data: [{ type: 'average', name: 'Avg' }]
                    }
                }
            ]
        }

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
    }, []);
    return (
        <>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </>
    );
}

export default ThongKeBar;
