import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { Col, Drawer, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GrSystem } from "react-icons/gr";
import { MdConnectWithoutContact, MdOutlinePolicy } from "react-icons/md";
function MenuLeft({ open, setOpen }) {
  const [placement, setPlacement] = useState("left");
  var nguoiDung = JSON.parse(localStorage.getItem("user"))?.data;
  function handleCloseMenu() {
    setOpen(false);
  }
  return (
    <>
      <Drawer
        title="Lỗi tắt"
        placement={placement}
        closable={false}
        onClose={handleCloseMenu}
        open={open}
        key={placement}
      >
        <Row>
          {nguoiDung?.quyenList.includes("ROLE_EMPLOYEE") && (
            <Col span={24}>
              <div
                className="item-nav"
                onClick={() => {
                  window.location = "http://localhost:3000/admin/dashboard";
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    color: "black",
                    marginBottom: 0,
                    marginLeft: "4px",
                  }}
                >
                  <GrSystem />
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    Quản trị hệ thống
                  </span>
                </p>
              </div>
            </Col>
          )}
          <Col span={24}>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginBottom: 0,
                  marginLeft: "4px",
                }}
              >
                <MdConnectWithoutContact />
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  Liên hệ
                </span>
              </p>
            </Link>
          </Col>
          <Col span={24}>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "black",
                  marginBottom: 0,
                  marginLeft: "4px",
                }}
              >
                <MdOutlinePolicy />
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  Chính sách
                </span>
              </p>
            </Link>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default MenuLeft;
