import Gallery from "react-image-gallery";
import "./style.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Col, Image, Modal, Row, Slider } from "antd";
import { useState } from "react";
import { CiRuler } from "react-icons/ci";
import { tinhSize } from "./tinhSize";
function ChonSize() {
    const [isModalOpen, setIsOpenModal] = useState(false)
    const [chieuCao, setChieuCao] = useState(140)
    const [canNang, setCanNang] = useState(30)
    const formatter1 = (value) => `${value}kg`;
    const formatter2 = (value) => `${value}cm`;
    const [size, setSize] = useState("Chọn chiều cao và cân nặng")
    function handleTinhSize(chieuCao, canNang) {
        const sizeTinh = tinhSize(chieuCao, canNang);
        setSize(sizeTinh)
    }
    return (
        <>
            <span
                onClick={() => {
                    setIsOpenModal(true)
                }}
                style={{
                    position: "absolute",
                    right: 0,
                    fontSize: "14px",
                    textDecoration: "underline",
                    fontWeight: 400,
                }}

                className="huongdan"
            >
                <CiRuler
                    style={{
                        fontSize: "24px",
                    }}
                />
                Hướng dẫn chọn size
            </span>
            <Modal title="Chọn size" open={isModalOpen} width={768} onOk={() => {
                setIsOpenModal(false)
            }} onCancel={() => {
                setIsOpenModal(false)
            }}>
                <Row >
                    <Col span={24} style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Image src="https://file.hstatic.net/1000352218/file/size_ao_6c6aec0fa6ec4d1f84ba2cb42567a032_grande.jpg" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p>Chiều cao (cm)</p>
                    </Col>
                    <Col span={21}>
                        <Slider
                            tooltip={{
                                formatter2,
                            }}
                            onChange={(e) => {
                                setChieuCao(e)
                                handleTinhSize(e, canNang)
                            }}
                            value={chieuCao} min={130} max={200} />
                    </Col>
                    <Col span={2} offset={1}>200cm</Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <p>Cân nặng (kg)</p>
                    </Col>
                    <Col span={21}>
                        <Slider
                            tooltip={{
                                formatter1,
                            }}
                            value={canNang}
                            onChange={(e) => {
                                setCanNang(e)
                                handleTinhSize(chieuCao, e)
                            }} min={30} max={150} />
                    </Col>
                    <Col span={2} offset={1}>150kg</Col>
                </Row>

                <Row>
                    <Col span={24} >
                        <p>Size phù hợp: <span style={{
                            fontWeight: 600,
                            fontSize: '15px'
                        }} > {size}</span></p>
                    </Col>
                </Row>
            </Modal >
        </>
    );
}

export default ChonSize;
