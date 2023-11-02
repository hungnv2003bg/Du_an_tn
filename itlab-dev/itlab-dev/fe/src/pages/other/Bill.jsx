import React from "react";

class Bill extends React.Component {
    render() {
        const { curentInfo, count, currenOrderDeatail } = this.props;
        const body = {
            font: "VCR OSD Mono",
        };
        const tableStyles = {
            width: "100%",
            boxShadow: "0 0 3px #aaa",
            lineHeight: "30px",
            borderCollapse: "collapse",
        };
        return (
            <div style={body} className="modal-body p-0">
                <table style={tableStyles} border={1}>
                    <tr>
                        <td colSpan={2}>Mã đơn: {curentInfo.codeOrder}</td>
                        <td colSpan={2} className="text-right">
                            <strong>
                                Thời gian đặt: {curentInfo.createdAt}
                            </strong>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                            <img src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png" alt="" width={200} />
                            <p className="font-weight-bold">
                                POLYFOOD - Đồ ăn thuần chay - Hà Nội
                            </p>
                            <p>
                                Phố Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <p>
                                <strong>Tên khách hàng:</strong>{" "}
                                {curentInfo.fullName}
                            </p>
                            <p>
                                <strong>Số điện thoại:</strong>{" "}
                                {curentInfo.phone}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {curentInfo.address}
                            </p>
                            <p>
                                <strong>Hình thức thanh toán:</strong>{" "}
                                {curentInfo.paymentOrder}
                            </p>
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td className="font-weight-bold">STT</td>
                        <td className="font-weight-bold">Món ăn</td>
                        <td className="font-weight-bold">Số lượng</td>
                        <td className="font-weight-bold">Giá</td>
                    </tr>
                    {currenOrderDeatail.map((item, index) => {
                        return (
                            <tr className="text-center" key={index}>
                                <td>{index + 1}</td>
                                <td>{item.nameProduct}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalPrice}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={2} className="text-center">
                            <strong>Tổng đơn</strong>
                        </td>
                        <td colSpan={2} className="text-center">
                            <strong>
                                {curentInfo.actualPrice.toLocaleString("vi-VN")}{" "}
                                VNĐ
                            </strong>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Bill;
