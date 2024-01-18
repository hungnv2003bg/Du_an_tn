import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import imagehuongdan1 from './imagehuongdan/mua1.jpg';
import imagehuongdan2 from './imagehuongdan/mua2.jpg';
import imagehuongdan3 from './imagehuongdan/mua3.jpg';
import imagehuongdan4 from './imagehuongdan/mua4.jpg';
import imagehuongdan5 from './imagehuongdan/mua5.jpg';
import imagehuongdan6 from './imagehuongdan/mua6.jpg';
import imagehuongdan7 from './imagehuongdan/mua7.jpg';
import imagehuongdan8 from './imagehuongdan/mua8.jpg';



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

          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>HƯỚNG DẪN MUA HÀNG ONLINE TRÊN WEBSITE ROUTINE</h1>

          <h5>
            1. Các bước mua hàng trên website Routine
          </h5>
          <br />
          <p><b>Bước 1</b>: Đăng nhập vào tài khoản của bạn trên Website Routine.vn. Nếu chưa có tài khoản thì bạn chọn Đăng ký thành viên và Nhập thông tin theo hướng dẫn.</p>
          <br />
          <img
            src={imagehuongdan1}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <p><b>Bước 2</b>: Sau khi Đăng nhập vào tài khoản, bạn có thể bắt đầu xem các sản phẩm và bắt đầu mua hàng. </p>
          <p><span>Với phụ kiện Freesize</span>: Đối với các sản phẩm phụ kiện tại Routine, phần lớn sẽ là freesize nên bạn có thể chọn màu sắc và không cần quan tâm đến size của từng sản phẩm.</p>
          <img
            src={imagehuongdan2}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
          <ul>
            <li> <b>Với sản phẩm quần áo / váy đầm có chia Size: </b> Ngoài phụ kiện, những sản phẩm quần áo thời trang khác đều có size riêng, nên sau khi chọn được màu sắc ứng ý, bạn <br />hãy chọn size phù hợp với cơ thể mình.</li>
          </ul>

          <br />
          <img
            src={imagehuongdan3}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
          <p><b>Bước 3:</b> Đối với những bạn đang không biết size hoặc phân vân size nào sẽ phù hợp với mình, bạn có thế nhấp vào Hướng dẫn chọn size từ gợi ý Routine  <br />thì sẽ xuất hiện màn hình Chọn size.</p>
          <br />
          <img
            src={imagehuongdan4}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
          <ul>
            <li>Trong bảng chọn size bạn hãy kéo thanh chiều cao và cân nặng phù hợp với cơ thể của mình, sau đó nhấn vào nút Tìm Size, màn hình sẽ gợi ý size quần áo phù hợp với mong muốn của bạn. Bên cạnh chiều cao và cân nặng, bạn có thể chọn thêm form dáng và độ rộng của quần áo khi mặc sẽ ôm, vừa hoặc tộng dựa vào sở thích thời trang của mỗi người.</li>
          </ul>
          <br />
          <br />
          <p> <b>Bước 4:</b> Sau khi Chọn Size thành công → Màn hình sẽ quay về sản phẩm → Vào <b>Giỏ Hàng</b> kiểm tra sản phẩm</p>
          <br />
          <img
            src={imagehuongdan5}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
          <p><b>Bước 5:Thanh Toán</b></p>
          <br />
          <br />
          <img
            src={imagehuongdan6}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
          <p><b>Bước 6:</b>Nhập thông tin <b>Địa chỉ</b> giao hàng và <b>Xác nhận</b>.</p>
          <br />
          <br />
          <img
            src={imagehuongdan7}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />

          <br />
          <br />
          <p><b>Bước 7:</b>Sau khi hoàn tất màn hình xuất hiện thông báo <b>Mua hàng</b> thành công.</p>
          <br />
          <br />
          <img
            src={imagehuongdan8}
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
          <br />
          <br />
        </Content>
      </Layout>
    </Layout>


  );
};

export default GioiThieu;
