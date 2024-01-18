import { useSelector } from "react-redux";
import * as echarts from 'echarts';

import { useEffect, useRef } from "react";
import { Col, Row, Tag } from "antd";
function BieuDoTheoOption({ title = "Tên biểu đồ", data }) {
    const arr = data && data.map((item) => {
        return {
            value: item.soLuong,
            name: item.sanPhamChiTiet.tenSanPham
        }
    })
    const chartRef = useRef(null);
    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        const option = {
            title: {
                text: 'Biểu đồ chi tiết',
                subtext: '(Đơn vị: cái)',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Thông tin sản phẩm',
                    type: 'pie',
                    radius: '50%',
                    data: arr,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
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
            <div ref={chartRef} style={{ marginLeft: "10%", width: '80%', height: '600px' }} />
            <Row style={{
                marginBottom: "40px"
            }}>
                <ul style={{
                    marginBottom: "unset"
                }}>
                    {data && data.map((item) => {
                        return <li>{item.sanPhamChiTiet.tenSanPham} <span style={{
                            color: "red"
                        }}>số lượng đã bán:</span> {item.soLuong} cái</li>
                    })}
                </ul>
            </Row>
        </>
    );
}

export default BieuDoTheoOption;
