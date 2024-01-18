// import MyComponent from './Example/MyComponent';
import {
    Button,
    Col,
    Input,
    InputNumber,
    Modal,
    Row,
    Spin,
    notification,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useGpt } from "../../../plugins/gpt";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { modal, suKienTrongThang } from "./context";
import TaoSuKienGoiY from "./TaoSuKienGoiY";
const { RangePicker } = DatePicker;
function GoiYTheoThang({ thang, profit }) {
    const [isShow, setIsShow] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [text, setText] = useState(undefined);
    const [dataSus, setDataSus] = useState([""]);
    const [isFetching, setIsFetching] = useState(false);
    const dateFormat = "DD/MM/YYYY";
    const openNotification = (type, title, des, placement) => {
        if (type === "error") {
            api.error({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "warning") {
            api.warning({
                message: title,
                description: des,
                placement,
            });
        }
        if (type === "success") {
            api.success({
                message: title,
                description: des,
                placement,
            });
        }
    };
    async function handleSendContext2GPT(context) {
        const data = await useGpt.actions.chat(context);
        var dataNew = data.data.choices[0].message.content.split("=")[1];
        dataNew = JSON.parse(dataNew.replaceAll("\n", ""));
        setDataSus(dataNew);
    }

    const showContentSpan = useRef(undefined);
    function handleSetText(content) {
        let i = 0;
        let dataChat = "";
        const interval = setInterval(() => {
            if (i === content.length) {
                clearInterval(interval);
                setIsFetching(true);
            }
            if (content[i] != undefined) {
                dataChat = dataChat + content[i];
                if (showContentSpan.current?.innerHTML) {
                    showContentSpan.current.innerHTML = dataChat;
                }
                i++;
            }
        }, 1);
    }
    useEffect(() => {
        if (isShow) {
            handleSendContext2GPT(suKienTrongThang(thang));
        }
    }, [isShow]);
    return (
        <>
            {contextHolder}
            <span
                onClick={() => {
                    setIsShow(true);
                }}
                className="sussgest"
            >
                {" "}
                Tháng {thang}
            </span>
            <Modal
                title={"Các sự kiện trong tháng " + thang}
                open={isShow}
                onOk={() => {
                    setIsShow(false);
                }}
                onCancel={() => {
                    setIsShow(false);
                }}
            >
                {dataSus ? (
                    <>
                        <p
                            style={{
                                marginBottom: "4px",
                            }}
                        >
                            Danh sách các sự kiện có thể tổ chức giảm giá
                        </p>
                        {dataSus.map((item, index) => {
                            return (
                                <>
                                    <Row>
                                        <Col span={1}>
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                }}
                                            ></span>
                                        </Col>
                                        <Col span={22} offset={1}>
                                            <TaoSuKienGoiY suKien={item} />
                                        </Col>
                                    </Row>
                                </>
                            );
                        })}
                    </>
                ) : (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                )}
            </Modal>
        </>
    );
}

export default GoiYTheoThang;
