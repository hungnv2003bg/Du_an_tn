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
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Giới thiệu về Routine</h1>
          <h5>
            “Routine đang tạo ra những bộ trang phục sản xuất trong nước hoàn toàn có thể sánh ngang với các thương hiệu thời trang nam đến từ nước ngoài về kiểu dáng, chất lượng lẫn phong cách thời trang.” - CEO Routine.
          </h5>
          <p>Như ý nghĩa của tên gọi, trang phục của Routine hướng đến việc trở thành thói quen, lựa chọn hàng ngày cho nam giới trong mọi tình huống. Bởi Routine hiểu rằng, sự tự tin về phong cách ăn mặc sẽ làm nền tảng, tạo động lực cổ vũ mỗi người mạnh dạn theo đuổi những điều mình mong muốn. Trong đó, trang phục nam phải mang vẻ đẹp lịch lãm, hợp mốt và tạo sự thoải mái, quan trọng nhất là mang đến cảm giác “được là chính mình” cho người mặc.

            Thương hiệu thời trang Routine thuyết phục khách hàng qua từng kiểu dáng trang phục thiết kế độc quyền, sự sắc sảo trong mỗi đường nét cắt may, sử dụng chất liệu vải cao cấp và luôn hòa điệu cùng xu hướng quốc tế. Đây là con đường Routine theo đuổi và hướng đến sự phát triển bền vững.

            Thành lập từ năm 2013, đến nay hệ thống cửa hàng của Routine đang là địa chỉ “One stop fashion shop” cung ứng cho nam giới mọi nhu cầu về thời trang với tất cả các loại trang phục, phụ kiện. Phong cách tối giản đặc trưng của Routine mang đến sự gần gũi, đa dụng và đủ sức tạo nên dấu ấn riêng cho người mặc. Các sản phẩm quần tây, áo sơ mi, quần jeans, áo thun, áo jacket... đều được thiết kế năng động, dễ dàng kết hợp để mặc đi làm, đi chơi hay du lịch.

            Routine hiện có hệ thống 27 cửa hàng tại TP.HCM, Hà Nội, Hải phòng, Đà Nẵng, Kiên Giang và Vũng Tàu. Thương hiệu thường xuyên ra mắt bộ sưu tập riêng, bắt kịp xu hướng thời trang quốc tế.</p>
          {/* Add the rest of your content here */}
          <img
            src="https://file.hstatic.net/1000341789/file/1200px_routine.jpg"
            alt="Giới thiệu về Routine"
            style={{ width: '100%', maxWidth: '1100px', height: '700px' }}
          />
        </Content>
      </Layout>
    </Layout>


  );
};

export default GioiThieu;
