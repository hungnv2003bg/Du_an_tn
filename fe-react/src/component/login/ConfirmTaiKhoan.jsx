import "./style.css";
import { useParams } from "react-router-dom";
import { useLoginStore } from "./useLoginStore";
function CornfirmTaiKhoan() {
  const { id } = useParams();
  async function handleXacNhanTaiKhoan() {
    const data = await useLoginStore.actions.xacNhan(id);
    if (data.data == 1) {
      window.location.href = process.env.REACT_APP_FRONTEND_URL + "page3";
    } else {
      window.location.href =
        process.env.REACT_APP_FRONTEND_URL + "xacnhanthanhcong";
    }
  }
  handleXacNhanTaiKhoan();
  return <></>;
}

export default CornfirmTaiKhoan;
