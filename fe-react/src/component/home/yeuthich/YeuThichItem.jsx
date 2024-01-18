import "./style.css";
import { AiOutlineClose } from "react-icons/ai";
import { fixMoney } from "../../../extensions/fixMoney";
import { useYeuThich } from "./useYeuThich";
import { Link } from "react-router-dom";
function YeuThichItem({ item, handleLayYeuThich }) {
  async function handleXoaYeuThich() {
    const data = await useYeuThich.actions.xoaYeuThich(item.id);
    handleLayYeuThich();
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "96%",
          marginLeft: "2%",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "140px",
            overflow: "hidden",
            height: "180px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            src={item.sanPhamChiTiet.hinhAnh}
            alt="anh"
            style={{
              height: "180px",
              width: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
        <div
          style={{
            marginLeft: "4px",
            width: "176px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginLeft: "2%",
                width: "88%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              <Link
                to={
                  "http://localhost:3000/sanpham/" +
                  item.sanPhamChiTiet.sanPham.id
                }
                style={{
                  color: "black",
                }}
              >
                {item.sanPhamChiTiet.tenSanPham}
              </Link>
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "24px",
              }}
              className="hover-yeuthich"
              onClick={handleXoaYeuThich}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div>
            <p>{fixMoney(item.sanPhamChiTiet.giaBan)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default YeuThichItem;
