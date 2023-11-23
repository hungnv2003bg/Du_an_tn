import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../common/header/Header";
import { selectLanguage } from "../../../language/selectLanguage";
import { useParams } from "react-router-dom";
import { QRCode } from "antd";
function HuyDon() {
    const language = useSelector(selectLanguage);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const vnp_TransactionStatus = params.get('vnp_TransactionStatus');
    const vnp_BankCode = params.get('vnp_BankCode');
    return (
        <>
            <Header />
            {vnp_TransactionStatus == 0 ? <div style={{
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                    <QRCode size={320} type="canvas" value="https://ant.design/" />
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
                    }}>Thanh toán thành công</h3>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    marginTop: '14px',

                }}>
                    <div className="btn-transaction">Lịch sử giao dịch</div>
                    <div className="btn-transaction">Tải biên lai</div>
                </div>
            </div> : ""}
            {vnp_TransactionStatus == 2 ? <div style={{
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
                        color: "red",
                        fontSize: "50px"
                    }}>Hủy giao dịch</h3>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                    marginTop: '14px',

                }}>
                    <div className="btn-transaction">Lịch sử giao dịch</div>
                </div>
            </div> : ""}

        </>
    );
}

export default HuyDon;