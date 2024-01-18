import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Tooltip,
  notification,
} from "antd";
import "./style.css";
import React, { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useVoucher } from "./useVoucher";
import { FaRegPenToSquare } from "react-icons/fa6";
import moment from "moment";
import { checkEmpty } from "../../../extensions/checkEmpty";
function ModalSua({ duLieu, fetchData }) {
  const [form] = useForm();
  console.log(duLieu);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, title, des, placement) => {
    if (type === "error") {
      api.error({
        message: title,
        description: des,
        placement,
      });
    } else {
      api.success({
        message: title,
        description: des,
        placement,
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucher, setVoucher] = useState(duLieu);

  async function handleThemVoucher() {
   
    const data = await useVoucher.actions.suaVouchet(voucher);
    fetchData();
    setIsModalOpen(false);
    openNotification("success", "Hệ thống", "Tạo thành công", "bottomRight");
  }
  const formatter = (value) => {
    if (value === "" || value === undefined) {
      return value;
    }
    return String(parseInt(value, 10));
  };

  // Hàm parser để trả về giá trị số nguyên
  const parser = (value) => {
    if (value === "" || value === undefined) {
      return value;
    }
    return parseInt(value, 10);
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Cập nhật">
        <Button
          style={{
            color: "green",
          }}
          shape="circle"
          icon={<FaRegPenToSquare />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </Tooltip>
      <Modal
        title={"Cập nhật voucher"}
        open={isModalOpen}
        onOk={() => {}}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        centered
      >
       
      </Modal>
    </>
  );
}

export default ModalSua;
