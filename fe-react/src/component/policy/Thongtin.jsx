import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';

const { Sider, Content } = Layout;
const GioiThieu = () => {
  return (
    
    <Layout className="wrapper">
      <Sider width={300} className="sidebar" theme="light">
        <Menu theme="light" mode="vertical" style={{ padding: '100px 0',paddingLeft:'45px' }}>
          <h2 style={{ paddingTop:'-45px' }}>Thông Tin</h2>
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
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Contact Us</h1>
            <p>Chúng tôi luôn nỗ lực mỗi ngày để mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất.</p>
            <br />
            <p>Thời gian làm việc: Thứ Hai - Chủ Nhật, 10:00 AM - 9:00 PM</p>
            <br />
            <p>Các kênh liên hệ:</p>
            <ul>
                <li>Hotline chăm sóc khách hàng: <span>1900 63 65 91</span></li>
                <li>Hotline mua hàng: <span>039 999 9365</span></li>
                <li>Email: <span>cskh@routine.vn</span></li>
                <li>Danh sách cửa hàng: <span>Hệ thống cửa hàng Routine trên toàn quốc</span></li>
                <li>Mạng xã hội: <span>Facebook - Instagram - Zalo - TikTok</span></li>
                <li>Hợp tác nhượng quyền kinh doanh: 039 246 8886</li>

            </ul>

        </Content>
        </Layout>
    </Layout>


  );
};

export default GioiThieu;
