import "./style.css";
import Header from "../../common/header/Header";
import { QRCode } from "antd";
function ThanhToanChoXacNhan() {
    return (
        <>
            <Header />
            <div style={{
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    marginTop: '14px'
                }}>
                    <h3 style={{
                        color: "green",
                        fontSize: "50px"
                    }}>Đặt hàng thành công</h3>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    marginTop: '14px',

                }}>
                </div>
            </div>
        </>
    );
}

export default ThanhToanChoXacNhan;