import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { AiOutlineClose } from "react-icons/ai";
function YeuThichItem({ open, setOpen }) {
    const language = useSelector(selectLanguage);
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                width: "96%",
                marginLeft: "2%"
            }}>
                <div style={{
                    width: "140px",
                    overflow: "hidden",
                    height: "180px",
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                }}>
                    <img src="https://routine.vn/media/catalog/product/cache/5de180fdba0e830d350bd2803a0413e8/1/0/10f22jacw020_light_grey_1__2.jpg" alt="anh" style={{
                        height: "180px",
                        width: "auto"
                    }} />
                </div>
                <div>
                    <div style={{
                        display: 'flex',
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                        <div style={{
                            marginLeft: "2%",
                            width: "88%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 500,
                        }}>Áo choàng póng tối danhf cho as</div>
                        <div style={{
                            width: "10%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 700,
                            fontSize: "24px"
                        }}>
                            <AiOutlineClose />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default YeuThichItem;
