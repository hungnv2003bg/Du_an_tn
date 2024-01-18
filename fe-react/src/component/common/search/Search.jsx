import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import { fixMoney } from "../../../extensions/fixMoney";
function Search({ open, setOpen }) {
  const language = useSelector(selectLanguage);
  const [placement, setPlacement] = useState("top");
  function handleCloseMenu() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        placement={placement}
        closable={false}
        onClose={handleCloseMenu}
        open={open}
        key={placement}
        height={"50vh"}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="https://routine.vn/media/logo/websites/1/logo-black-2x.png"
            alt="logo"
            style={{
              height: "60px",
            }}
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <input
            type="text"
            style={{
              borderTop: "unset",
              borderLeft: "unset",
              borderRight: "unset",
              width: "60%",
              height: "40px",
            }}
            placeholder="Tìm kiếm"
          />
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "12px",
          }}
        >
          <Col span={24}>
            <h3
              style={{
                textAlign: "center",
              }}
            >
              Bán chạy nhất
            </h3>
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                height: "400px",
                width: "240px",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <img
                style={{
                  height: "320px",
                }}
                src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
              ></img>
              <h4>hihi</h4>
              <p>{fixMoney(20000)}</p>
            </div>
            <div
              style={{
                height: "400px",
                width: "240px",
                overflow: "hidden",
                marginLeft: "12px",
                marginRight: "12px",
                borderRadius: "5px",
              }}
            >
              <img
                style={{
                  height: "320px",
                  borderRadius: "5px",
                }}
                src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
              ></img>
              <h4>hihi</h4>
              <p>{fixMoney(20000)}</p>
            </div>
            <div
              style={{
                height: "400px",
                width: "240px",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <img
                style={{
                  height: "320px",
                }}
                src="https://www.kkday.com/vi/blog/wp-content/uploads/chup-anh-dep-bang-dien-thoai-25.jpg"
              ></img>
              <h4>hihi</h4>
              <p>{fixMoney(20000)}</p>
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default Search;
