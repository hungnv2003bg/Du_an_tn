// import MyComponent from './Example/MyComponent';
import { Button, Col, Modal, Row, Select, notification } from "antd";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import { useEffect, useRef, useState } from "react";
import { useGpt } from "../../../plugins/gpt";
import { cmr } from "./context";
import "./style.css";
import { useCrm } from "./crmStore";
import DanhGiaTop10SanPham from "./danhgiasanpham/DanhGiaTop10SanPham";
import ThongKeBar from "./BarChart";
function CRM() {
  const [api, contextHolder] = notification.useNotification();
  const [isFetching, setIsFetching] = useState(false);
  const [profit, setProfit] = useState(undefined);
  const [sussgest, setSussgest] = useState(false);
  const [nam, setNam] = useState(2024);
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
    setIsFetching(true);
    const data = await useGpt.actions.chat(context);
    handleSetText(
      data.data.choices[0].message.content +
      `\n
        Dưới đây là một vài gợi ý về chiến lược kinh doanh
        `
    );
    setIsFetching(false);
  }

  const onButtonPress = () => handleSendContext2GPT(cmr(profit));

  const showContentSpan = useRef(undefined);
  function handleSetText(content) {
    let i = 0;
    let dataChat = "";
    const interval = setInterval(() => {
      if (i === content.length) {
        clearInterval(interval);
        setSussgest(true);
      }
      if (content[i] != undefined) {
        dataChat = dataChat + content[i];
        if (showContentSpan?.current) {
          showContentSpan.current.innerHTML = dataChat;
        }
        i++;
      }
    }, 3);
  }
  async function handleLayDoanhThu12Thang() {
    const data = await useCrm.actions.layDoanhThu12Thang(nam);
    setProfit(data.data);
  }
  const [year, setYear] = useState([]);
  useEffect(() => {
    handleLayDoanhThu12Thang();
    arrYear();
  }, [nam]);
  const arrYear = () => {
    var arr = [];
    for (var i = 2000; i <= new Date().getFullYear(); i++) {
      arr.push({
        value: i,
        label: i,
      });
    }
    setYear(arr);
  };
  return (
    <>
      {contextHolder}
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Col span={24}>
                <Select
                  style={{
                    width: 220,
                  }}
                  onChange={(e) => {
                    setNam(e);
                  }}
                  defaultValue={nam}
                  options={year}
                />
                <ThongKeBar
                  subTitle="Đơn vị Đ"
                  data={profit}
                  title={"Doanh thu theo tháng " + nam}
                />{" "}
              </Col>
              <Col span={24}>
                <Button
                  style={{
                    marginLeft: "12px",
                  }}
                  type="primary"
                  onClick={onButtonPress}
                  loading={isFetching}
                  disabled={isFetching}
                >
                  Đánh giá doanh thu doanh số năm {nam}
                </Button>
              </Col>
            </Row>

            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <span ref={showContentSpan}></span>
              {sussgest && (
                <>
                  {/* <ModalTaoSuKien profit={profit} />
                                - */}
                  <DanhGiaTop10SanPham nam={nam} />
                </>
              )}
            </Row>
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <Col span={24}>
                {/* <Button
                                    style={{
                                        marginRight: "12px",
                                    }}
                                    type="primary"

                                >
                                    Sự kiện giảm giá
                                </Button> */}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default CRM;
