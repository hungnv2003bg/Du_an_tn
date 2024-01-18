// import MyComponent from './Example/MyComponent';
import { Image, Modal, Spin, Table, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { DatePicker } from "antd";
import { useCrm } from "../crmStore";
import { fixMoney } from "../../../../extensions/fixMoney";
import { cmr, doanhSo10SanPhamDanhGia } from "../context";
import { useGpt } from "../../../../plugins/gpt";
import ModalDanhGiaChiTiet from "./ModalDanhGiaChiTiet";
function DanhGiaTop10SanPham({ nam }) {
  const [isShow, setIsShow] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [done, setDone] = useState(false);
  const showContentSpan = useRef(undefined);
  const showContentSpan2 = useRef(undefined);
  function handleSetText(content) {
    let i = 0;
    let dataChat = "";
    const interval = setInterval(() => {
      if (i === content.length) {
        clearInterval(interval);
      }
      if (content[i] != undefined) {
        dataChat = dataChat + content[i];
        if (showContentSpan.current) {
          showContentSpan.current.innerHTML = dataChat;
        }
        i++;
      }
    }, 3);
  }
  function handleSetText2(content) {
    let i = 0;
    let dataChat = "";
    const interval = setInterval(() => {
      if (i === content.length) {
        clearInterval(interval);
      }
      if (content[i] != undefined) {
        dataChat = dataChat + content[i];
        if (showContentSpan2.current) {
          showContentSpan2.current.innerHTML = dataChat;
        }
        i++;
      }
    }, 5);
  }
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "sanPham",
      width: "20%",
      render: (sanPham) => (
        <Image
          src={sanPham.hinhAnh1}
          style={{ width: "120px", height: "180px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "sanPham",
      width: "20%",
      render: (sanPham) => <span>{sanPham.tenSanPham}</span>,
    },
    {
      title: "Giá bán",
      dataIndex: "sanPham",
      width: "15%",
      render: (sanPham) => <span>{fixMoney(sanPham.giaBan)}</span>,
    },
    {
      title: "Doanh số",
      dataIndex: "doanhSo",
      width: "15%",
      render: (doanhSo) => (
        <span>
          {doanhSo.reduce((pre, next) => {
            return pre + next;
          }, 0)}{" "}
          cái
        </span>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => a - b,
    },
    {
      title: "Doanh thu",
      dataIndex: "doanhSo",
      width: "15%",
      render: (doanhSo, record) => (
        <span>
          {fixMoney(
            doanhSo.reduce((pre, next) => {
              return pre + next;
            }, 0) * record.sanPham.giaBan
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "sanPham",
      render: (sanPham, record) => (
        <>
          <ModalDanhGiaChiTiet data={record} />
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  async function handleLayDoanhSo() {
    const data = await useCrm.actions.layTopDoanhSo12Thang(nam);
    setData(data.data);
    //  handleSendContext2GPT(data.data);
  }
  async function handleSendContext2GPT(data3) {
    const data2 = await useGpt.actions.chat(doanhSo10SanPhamDanhGia(data3));
    handleSetText2(data2.data.choices[0].message.content);
    setDone(true);
  }
  useEffect(() => {
    if (isShow) {
      handleLayDoanhSo();
      handleSetText(
        "Dựa vào dữ liệu doanh số của cửa hàng đây là TOP 10 sản phẩm bán chạy nhất trong năm " +
        nam +
        "."
      );
    }
  }, [isShow]);
  return (
    <>
      {contextHolder}-
      <span
        onClick={() => {
          setIsShow(true);
        }}
        className="sussgest"
      >
        {" "}
        đánh giá sản phẩm theo doanh số bán ra
      </span>
      <Modal
        title="Đánh giá sản phẩm"
        centered
        width={1268}
        open={isShow}
        onOk={() => {
          setIsShow(false);
        }}
        onCancel={() => {
          setIsShow(false);
        }}
      >
        <p ref={showContentSpan}></p>
        <Table columns={columns} dataSource={data} />
        {done ? (
          <p ref={showContentSpan2}></p>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <Spin size="large" />
          </div>
        )}
      </Modal>
    </>
  );
}

export default DanhGiaTop10SanPham;
