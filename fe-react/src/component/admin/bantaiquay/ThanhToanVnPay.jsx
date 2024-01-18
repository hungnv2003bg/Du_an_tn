import { Col, Row } from "antd";
import Header from "../layout/header/Header";
import MenuAdmin from "../layout/menu/MenuAdmin";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useBanTaiQuayStore } from "./useBanTaiQuayStore";
function ThanhToanVnPay() {
  const [trangThai, setTrangThai] = useState(undefined);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const vnp_TransactionStatus = params.get("vnp_TransactionStatus");
  const vnp_TxnRef = params.get("vnp_TxnRef");
  async function handleCheckThanhToan() {
    const data = await useBanTaiQuayStore.actions.checkThanhToan({
      maHd: vnp_TxnRef,
      status: vnp_TransactionStatus,
    });
    setTrangThai(data.data);
  }
  useEffect(() => {
    handleCheckThanhToan();
  }, []);
  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Row
              style={{
                backgroundColor: "#ffffff",
                padding: "12px 12px",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {trangThai === 1 ? (
                  <>
                    <img
                      src={require("../../../assets/thanhcong.png")}
                      alt="s"
                    />
                    <h4
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      Thanh toán thành công
                    </h4>
                  </>
                ) : (
                  <>
                    <img
                      src={require("../../../assets/fail-_icon-1.png")}
                      alt="s"
                    />
                    <h4
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      Thanh toán thất bại
                    </h4>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThanhToanVnPay;
