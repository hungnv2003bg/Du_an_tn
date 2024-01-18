import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Table,
  message,
} from "antd";
import axios from "axios";
import MenuAdmin from "../layout/menu/MenuAdmin";
import Header from "../layout/header/Header";
import BanhDonut from "./chart/BanhDonut";
import BanhDonut2 from "./chart/BanhDonut2";

import "./style.css";
import { useCrm } from "../crm/crmStore";
import ThongKeBar from "../crm/BarChart";
import DoanhSoNgay from "./DoanhSoNgay";
import BieuDoGiaiDoan from "./BieuDoGiaiDoan";
import dayjs from "dayjs";
import { useDashBoardStore } from "./useDashBoardStore";
function DashBoard() {
  const [nam, setNam] = useState(2024);
  const [profit, setProfit] = useState(undefined);
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

  const [ngayThang, setNgayThang] = useState({});
  async function handleTheoNgay() {
    const data = await useDashBoardStore.actions.theoNgay(ngayThang);
  }
  useEffect(() => {
    handleTheoNgay();
  }, [ngayThang]);
  return (
    <>
      <div>
        <Header />
        <MenuAdmin />
        <div className="body-container">
          <div className="content">
            <Row style={{ backgroundColor: "#ffffff", padding: "12px 12px" }}>
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
              />
            </Row>
            {/* <Row style={{ backgroundColor: "#ffffff", padding: "12px 12px" }}>
              <DatePicker
                onChange={(e) => {
                  setNgayThang({
                    ...ngayThang,
                    batDau: dayjs(e).format("YYYY-MM-DD"),
                  });
                }}
                placeholder="Ngày bắt đầu"
              />
              <DatePicker
                onChange={(e) => {
                  setNgayThang({
                    ...ngayThang,
                    ketThuc: dayjs(e).format("YYYY-MM-DD"),
                  });
                }}
                style={{
                  marginLeft: "12px",
                }}
                placeholder="Ngày kết thúc"
              />
              <BieuDoGiaiDoan />
            </Row> */}
            <Row style={{ marginTop: "12px" }}>
              <div style={{ width: "49%", backgroundColor: "#ffffff" }}>
                <BanhDonut />
              </div>
              <div
                style={{
                  width: "49%",
                  marginLeft: "2%",
                  backgroundColor: "#ffffff",
                }}
              >
                <BanhDonut2 />
              </div>
            </Row>

            <div
              style={{
                marginTop: "12px",
                width: "100%",
                backgroundColor: "#ffffff",
                padding: "12px 12px",
              }}
            >
              <DoanhSoNgay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
