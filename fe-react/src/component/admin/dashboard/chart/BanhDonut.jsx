import { useSelector } from "react-redux";
import { selectLanguage } from "../../../../language/selectLanguage";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
function BanhDonut() {
    const language = useSelector(selectLanguage);
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        // Định nghĩa dữ liệu và tùy chọn biểu đồ
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
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
    }, []);
    return (
        <>
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </>
    );
}

export default BanhDonut;
