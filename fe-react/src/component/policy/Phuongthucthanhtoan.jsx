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
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Phương Thức Thanh Toán</h1>
          
          <img
                        src="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/349057789_913956979716030_3443073401055023903_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=JQ4pg-hPfKMAX-6KKdv&_nc_ht=scontent.fhan5-8.fna&oh=00_AfCLqufmBbkARf1LTcgBSIw3AQLDoC8nTOEbdGUfz1cizA&oe=65A786AF"
                        alt="Giới thiệu về Routine"
                        style={{ width: '100%', maxWidth: '500px', height: '300px' }}
                        

                    />
                    <br />
                    <br />
            
            <p>Hiện tại, của hàng offline và website của Rotine có rất nhiều hình thức thanh toán khác nhau để quý khách hàng thoải mái lựa chọn. Khách hàng có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp.</p>
            <h4>1. Khi mua sắm tại hệ thống cửa hàng Routine trên toàn quốc</h4>
            <ul>
              <li><span>Bước 1</span>: Thanh toán bằng tiền mặt.</li>
              <li><span>Bước 2</span>: Thanh toán bằng thẻ ngân hàng (bao gồm thẻ Debit và Credit).</li>
              <li><span>Bước 3</span>: Thanh toán qua các ví điện tử như:  VN Pay (tùy theo cửa hàng khác nhau sẽ có các hình thức thanh toán qua ứng dụng khác nhau).</li>

            </ul>
            <h3>2. Khi mua sắm online trên website</h3>
            <ul>
              <li><span>Bước 1</span>: Thanh toán khi nhận hàng (COD - giao hàng và thu tiền tận nơi).</li>
              <li><span>Bước 2</span>: Thanh toán trực tuyến thông qua thẻ ngân hàng.</li>

            </ul>
          <p>Đối với người mua hàng từ Routine thì phải tuân thủ theo chính sách thanh toán của công ty. Mọi thắc mắc Quý khách hàng vui lòng liên hệ trực tiếp với bộ phận Chăm sóc khách hàng Routine theo 2 cách sau:</p>

          <h5>Gọi điện trực tiếp Tổng đài: 1900 63 65 91</h5>
          <h5>Nhắn tin trực tiếp qua Fanpage Routine</h5>

        </Content>
        </Layout>
    </Layout>
   

  );
};

export default GioiThieu;
