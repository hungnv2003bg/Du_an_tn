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
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Chính sách bảo mật</h1>
          
          <ul>
            <li>Chính sách bảo mật này nhằm giúp bạn hiểu về cách website thu thập và sử dụng thông tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể<br /> cung cấp thông qua trang web khi bạn đăng ký tài khoản, đăng ký nhận thông tin liên lạc từ Routine, hoặc khi bạn mua sản phẩm, dịch vụ, yêu cầu thêm thông tin dịch vụ từ Routine.</li>
            <li>Routine sử dụng thông tin cá nhân của bạn để liên lạc khi cần thiết liên quan đến việc bạn sử dụng website của Routine, để trả lời các câu hỏi hoặc gửi tài liệu và thông tin bạn yêu cầu.</li>
            <li>Trang web của Routine coi trọng việc bảo mật thông tin của khách hàng và sử dụng các biện pháp tốt nhất để bảo vệ thông tin cũng như việc thanh toán của Routine.</li>
            <li>Thông tin của bạn sẽ được lưu trữ tại hệ thống dữ liệu bán hàng của Routine mãi mãi cho tới khi bạn muốn thay đổi bằng cách liên hệ qua số hotline: 0399999365</li>
            <li>Mọi thông tin giao dịch sẽ được bảo mật hoàn toàn ngoại trừ trường hợp cơ quan pháp luật yêu cầu cung cấp.</li>
          </ul>


        </Content>
      </Layout>
    </Layout>
 

  );
};

export default GioiThieu;
