import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../common/header/Header";
import { selectLanguage } from "../../../language/selectLanguage";
import { useParams } from "react-router-dom";
import { QRCode } from "antd";
import { useGioHangStore } from "./useGioHangStore";
import { useEffect } from "react";
function HuyDon() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const vnp_TransactionStatus = params.get('vnp_TransactionStatus');
    const vnp_TxnRef = params.get('vnp_TxnRef');
    async function handleCheckThanhToan() {
        const data = await useGioHangStore.actions.checkThanhToan({
            maHd: vnp_TxnRef,
            status: vnp_TransactionStatus
        })
    }
    useEffect(() => {
        handleCheckThanhToan()
    }, [])
    return (
        <>
            <Header />

            {vnp_TransactionStatus === "00" ? <div style={{
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                    {/* <QRCode size={320} type="canvas" value="https://ant.design/" /> */}
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
                    {/* <div className="btn-transaction">Lịch sử giao dịch</div>
                    <div className="btn-transaction">Tải biên lai</div> */}
                </div>
            </div> : <div style={{
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
            </div>}

        </>
    );
}

export default HuyDon;