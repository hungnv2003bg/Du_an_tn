// import MyComponent from './Example/MyComponent';
import {
    Col,
    Modal,
    Row,
    Select,
    Spin,
    Tag,
    notification,
} from "antd";

import html2pdf from "html2pdf.js";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import BieuDo12Thang from "./BieuDo12Thang";
import { useGpt } from "../../../../plugins/gpt";
import { danhGiaSanPham, soSanhTheoNam } from "../context";
import BieuDoTheoOption from "./BieuDoTheoOption";
import { useCrm } from "../crmStore";
import SoSanhKhoangThoiGian from "./SoSanhKhoangThoiGian";
const { RangePicker } = DatePicker;
function ModalDanhGiaChiTiet({ data }) {
    const generatePdf = () => {
        const content = document.getElementById('content-to-export');
        const pdfOptions = {
            margin: 0,
            filename: 'Đánh giá chi tiết sản phẩm.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' } // Đặt orientation thành 'landscape'
        };
        html2pdf(content, pdfOptions);
    };
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [chiTietDoanhSo, setChiTietDoanhSo] = useState(undefined)
    const [nam, setNam] = useState({
        truoc: 2023,
        sau: 2024
    })
    const [done, setDone] = useState(false)
    const showContentSpan1 = useRef(undefined)
    const showContentSpan2 = useRef(undefined)
    const showContentSpan3 = useRef(undefined)

    function handleSetText(content, ref) {
        let i = 0
        let dataChat = ""
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval)
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i]
                if (ref.current) {
                    ref.current.innerHTML = dataChat
                }
                i++
            }
        }, 3)
    }
    async function handleLayChiTiet() {
        const data2 = await useCrm.actions.layChiTiet({
            sanPhamId: data.sanPham.id,
            ...nam
        })
        setChiTietDoanhSo(data2.data)
        handleSendContext2GPT(danhGiaSanPham(data))
        handleSendContext2GPT2(soSanhTheoNam(data2.data, nam, data))
    }

    async function handleSendContext2GPT(context) {
        const data2 = await useGpt.actions.chat(context)
        handleSetText(data2.data.choices[0].message.content, showContentSpan2)
    }
    async function handleSendContext2GPT2(context) {
        const data2 = await useGpt.actions.chat(context)
        handleSetText(data2.data.choices[0].message.content, showContentSpan3)
        setDone(true)
    }
    // useEffect(() => {
    //     if (done) {
    //         if (showContentSpan2) {
    //             handleSendContext2GPT(danhGiaSanPham(data))
    //             handleSendContext2GPT2(soSanhTheoNam(chiTietDoanhSo, nam, data))
    //         }
    //     }
    // }, [done])
    useEffect(() => {
        if (isShow) {
            handleOption()
            handleLayChiTiet()
            if (showContentSpan1) {
                handleSetText("Dưới đây là đánh giá chi tiết về " + data.sanPham.tenSanPham + " của tôi.", showContentSpan1)
            }
        }
    }, [isShow])
    useEffect(() => {
        if (isShow) {
            handleLayChiTiet()
        }
    }, [nam])
    const [options, setOptions] = useState([])
    function handleOption() {
        var arr = []
        for (var i = 2000; i <= new Date().getFullYear(); i++) {
            arr.push({
                value: i,
                label: i
            })
        }
        setOptions(arr)
    }
    return (
        <>
            {contextHolder}
            <Tag color="processing">
                <span onClick={() => {
                    setIsShow(true)
                }} className="sussgest"> Đánh giá chi tiết</span>
            </Tag>
            <Modal title="Đánh giá chi tiết sản phẩm"
                centered
                width={1400}
                open={isShow}
                onOk={() => {
                    setIsShow(false)
                }

                }
                onCancel={() => {
                    setIsShow(false)
                }}>
                <div
                    id="content-to-export"
                    style={{
                        width: "100%"
                    }}
                >
                    <p ref={showContentSpan1}></p>
                    <BieuDo12Thang data={data.doanhSo} />
                    <p ref={showContentSpan2} style={{
                        marginBottom: "140px"
                    }}></p>
                    {
                        done ? "" : <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>  <Spin size="large" /></div>
                    }
                    {
                        done && <> <BieuDoTheoOption data={chiTietDoanhSo && chiTietDoanhSo.thongKeChiTiet12} />
                            <p style={{
                                marginBottom: "0px",
                                color: "red"
                            }}>Cụ thể hơn thì dưới đây là so sánh doanh số và doanh thu với năm ngoái.</p>
                            <p style={{
                                marginBottom: "4px",
                                color: "red"
                            }}>Bạn cũng có thể lựa chọn so sánh theo năm khác.</p>
                            <Row style={{
                                marginBottom: "4px"
                            }}>
                                {/* <Col span={24}>
                                    <Select
                                        defaultValue={nam.truoc}
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={(e) => {
                                            setNam({
                                                ...nam,
                                                truoc: e
                                            })
                                        }}
                                        options={options}
                                    />
                                    <Select
                                        defaultValue={nam.sau}
                                        style={{
                                            width: 120,
                                            marginLeft: "4px"
                                        }}
                                        onChange={(e) => {
                                            handleSendContext2GPT()
                                            setNam({
                                                ...nam,
                                                sau: e
                                            })
                                        }}
                                        options={options}
                                    />
                                </Col> */}
                            </Row>
                            <SoSanhKhoangThoiGian title={
                                {
                                    title: "Doanh số " + nam.truoc + " và " + nam.sau,
                                    sub: '(Đơn vị: cái)',
                                    nam: nam,
                                    type: true
                                }
                            } data={chiTietDoanhSo && chiTietDoanhSo.soSanhDoanhSo} />
                            <p style={{
                                marginTop: "60px"
                            }}></p>
                            <SoSanhKhoangThoiGian title={
                                {
                                    title: "Doanh thu " + nam.truoc + " và " + nam.sau,
                                    sub: '(Đơn vị: đồng)',
                                    nam: nam,
                                    type: false
                                }
                            } data={chiTietDoanhSo && chiTietDoanhSo.soSanhDoanhThu} />
                            <Row style={{
                                marginBottom: "40px"
                            }}>
                                <p ref={showContentSpan3} style={{
                                    marginTop: "90px"
                                }}></p>
                                <Col span={24}>
                                    <a href="#" onClick={() => {
                                        generatePdf()
                                    }}>tải xuống báo cáo pdf.</a>
                                </Col>
                            </Row> </>}
                </div>
            </Modal>
        </>
    );
}

export default ModalDanhGiaChiTiet;
