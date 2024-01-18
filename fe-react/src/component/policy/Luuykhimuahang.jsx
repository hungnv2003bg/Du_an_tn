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
                    <br />
                    <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Lưu ý khi mua hàng</h1>
                    <br />
                    <h4>Để đảm bảo trải nghiệm mua sắm của bạn là thú vị và thuận lợi, hãy lưu ý những điều quan trọng sau đây:</h4>

                    <br />
                    <h5>1.Kiểm tra Thông Tin Sản Phẩm:</h5>
                    <br />
                    <p>Trước khi xác nhận đơn hàng, hãy kiểm tra kỹ thông tin về sản phẩm, bao gồm mô tả, kích thước và màu sắc. Điều này giúp đảm bảo rằng bạn nhận được đúng sản phẩm bạn mong đợi.</p>
                    <br />
                    <h5>2.Xác Nhận Địa Chỉ Giao Hàng:</h5>
                   <br />
                   <p>Vui lòng kiểm tra và cập nhật địa chỉ giao hàng của bạn trước khi thanh toán. Điều này giúp tránh nhầm lẫn và đảm bảo rằng hàng hóa sẽ được gửi đến đúng địa chỉ.</p>
                   <br />
                   <h5>3.Phương Thức Thanh Toán An Toàn:</h5>
                   <br />
                   <p>Sử dụng phương thức thanh toán an toàn và tin cậy. Hãy luôn chắc chắn rằng trang thanh toán được bảo vệ và thông tin tài khoản của bạn được giữ an toàn.</p>
                    <br />
                    <h5>4.Kiểm Tra Chính Sách Đổi Trả:</h5>
                   <br />
                   <p>   Trước khi mua hàng, đọc kỹ chính sách đổi trả của cửa hàng để bạn biết cách xử lý trong trường hợp có vấn đề với sản phẩm nhận được.</p>
                    <br />

                    <h5>5.Theo Dõi Đơn Hàng:</h5>
                   <br />
                   <p>   Trước khi mua hàng, đọc kỹ chính sách đổi trả của cửa hàng để bạn biết cách xử lý trong trường hợp có vấn đề với sản phẩm nhận được.</p>
                    <br />

                    <h5>6.Giữ Lại Hóa Đơn:</h5>
                    <br />
                    <p>Lưu giữ hóa đơn và mã xác nhận đặt hàng. Điều này sẽ giúp bạn khi cần liên hệ với chúng tôi hoặc khi bạn cần thực hiện các thủ tục đổi trả.</p>
                    <br />
                </Content>
            </Layout>
        </Layout>


    );
};

export default GioiThieu;
