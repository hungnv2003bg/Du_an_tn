import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Sider, Content } = Layout;

const GioiThieu = () => {
    return (


        <Layout className="wrapper">
            <Sider width={300} className="sidebar" theme="light">
                <Menu theme="light" mode="vertical" style={{ padding: '100px 0', paddingLeft: '45px' }}>
                    <h2 style={{ paddingTop: '-45px' }}>Thông Tin</h2>
                    <Menu.Item key="gioi-thieu">
                        <Link to="/gioi-thieu">Giới thiệu về Routine</Link>
                    </Menu.Item>
                    <Menu.Item key="huong-dan-dat-hang">
                        <Link to="/huong-dan-dat-hang">Hướng dẫn đặt hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="luu-y-mua-hang">
                        <Link to="/luu-y-mua-hang">Lưu ý khi mua hàng tại Routine</Link>
                    </Menu.Item>
                    <Menu.Item key="chinh-sach-doi-tra">
                        <Link to="/chinh-sach-doi-tra">Chính sách đổi trả</Link>
                    </Menu.Item>
                    <Menu.Item key="chinh-sach-bao-mat">
                        <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                    </Menu.Item>
                    <Menu.Item key="phuong-thuc-thanh-toan">
                        <Link to="/phuong-thuc-thanh-toan">Phương thức thanh toán</Link>
                    </Menu.Item>
                    <Menu.Item key="thong-tin-lien-he">
                        <Link to="/thong-tin-lien-he">Thông tin liên hệ</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className="content-layout">
                <Content className="content custom-content">
                    <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Chính sách đổi & trả hàng</h1>
                    <h5>
                        1. Quy định chung
                    </h5>

                    <br />
                    <ul>
                        <li>
                            Sản phẩm đối trả chưa qua sử dụng, chưa qua giặt tẩy, không bị vấy bẩn, ám mùi lạ, còn nguyên tem tag gắn trên sản phẩm và hóa đơn mua hàng. Quý khách hàng vui lòng mang theo hóa đơn mua hàng để được hỗ trợ đổi trả sản phẩm.
                        </li>
                        <li>
                            Áp dụng đổi 1 lần cho 1 sản phẩm, không tính theo hóa đơn hay giao dịch. Sản phẩm sau khi đổi sẽ không được áp dụng chính sách đổi hàng lần nữa (trừ trường hợp phát sinh <br /> lỗi từ nhà sản xuất).
                        </li>
                        <li>
                            Quý khách hàng sẽ không được hoàn lại tiền thừa nếu sản phẩm đổi có giá trị thấp hơn.
                        </li>
                        <li>
                            Routine cam kết sẽ miễn phí 100% chi phí đổi hàng trong trường hợp lỗi phát sinh từ nhà sản xuất.
                        </li>
                    </ul>
                    <h4>2. Chính sách đổi trả sản phẩm</h4>
                    <br />
                    <h5>2.1. Chính sách đổi hàng</h5>
                    <br />
                    <ul>
                        <li>Đối với sản phẩm nguyên giá, không áp dụng các chương trình khuyến mãi, giảm giá sẽ được đổi trong 30 ngày.</li>
                        <li>Đối với sản phẩm khuyến mãi, giảm giá dưới 30% vẫn sẽ được đổi trong 30 ngày.</li>

                        <li>Đối với sản phẩm khuyến mãi, giảm giá trên 30% không áp dụng chính sách đổi sản phẩm. </li>
                        <li>Không áp dụng đổi sản phẩm với tất cả các loại phụ kiện (trừ giày, dép).</li>
                    </ul>
                    <br />
                    <h5>2.2. Chính sách trả hàng</h5>
                    <br />
                    <ul>
                        <li>Đối với sản phẩm mua offline tại cửa hàng không áp dụng hoàn tiền dưới mọi hình thức.</li>
                        <li>Đối với các sản phẩm mua qua các kênh online như website, sàn thương mại điện tử, Quý khách hàng sẽ được hoàn tiền qua chuyển khoản (không áp dụng cho nhóm phụ kiện <br /> và các sản phẩm được giảm giá trên 30%).</li>
                    </ul>
                    <br />
                    
                    <img
                        src="https://routine.vn/media/amasty/webp/wysiwyg/z2624316513177_4de2cecfb9b13c280294b48bdc03fe20_1_jpg.webp"
                        alt="Giới thiệu về Routine"
                        style={{ width: '100%', maxWidth: '1100px', height: '1200px' }}
                    />
                </Content>
            </Layout>
        </Layout>


    );
};

export default GioiThieu;
