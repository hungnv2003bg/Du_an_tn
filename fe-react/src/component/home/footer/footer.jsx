import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section company-info">
          <img
            style={{
              height: "80px",
              width: "auto"
            }}
            className="img-margin-bottom"
            src="https://routine.vn/media/amasty/webp/wysiwyg/ezgif-7-ee007e6332a0_2x_2_png.webp"
            alt=""
          />
          <h3>CÔNG TY TNHH ROUTINE VIETNAM</h3>
          <p>Mã Số Thuế: 0106486365</p>
          <p>Địa chỉ: Tầng 4 Toà nhà FPT, Trần Hữu Dực - Xuân Phương - Quận Nam Từ Liêm - TP Hà Nội.</p>
          <div className="newsletter">
            <input type="email" placeholder="Nhập email của bạn" />
            <button>ĐĂNG KÝ</button>
          </div>
        </div>
        <div className="footer-section links">
          <div className="link-category company">
            <h3>CÔNG TY</h3>
            <ul>
              <li><Link to="/gioi-thieu">Giới thiệu về ROUTINE</Link></li>
              {/* <li><a href="tuyen-dung.html">Tuyển dụng</a></li>
              <li><a href="tin-thoi-trang.html">Tin thời trang</a></li>
              <li><a href="hop-tac.html">Hợp tác nhượng quyền</a></li> */}
              <li><a href="/thong-tin-lien-he">Liên hệ</a></li>
            </ul>
            <div className="social-media">
              <h5>KẾT NỐI VỚI CHÚNG TÔI</h5>
              <div className="social-icons">
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://static-00.iconduck.com/assets.00/tiktok-icon-1780x2048-n4ol3tdu.png" alt="TikTok" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc" alt="YouTube" />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram" />
                </a>
              </div>
            </div>
          </div>
          <div className="link-category">
            <h3>CHÍNH SÁCH KHÁCH HÀNG</h3>
            <ul>
              {/* <li><a href="/gioi-thieu">Giới thiệu về Routine</a></li> */}
              <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
              <li><a href="/luu-y-mua-hang">Lưu ý khi mua hàng</a></li>
              <li><Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
              <li><a href="/phuong-thuc-thanh-toan">Phương thức thanh toán</a></li>
              <li><a href="/huong-dan-dat-hang">Hướng dẫn mua hàng online</a></li>
            </ul>
          </div>
          <div className="link-category">
            <h3>THÔNG TIN CỬA HÀNG</h3>
            <ul>
              <li>
                <strong>CỬA HÀNG THỨ 1</strong>
                <address>F15 tầng 1 AEON Mall Tân Phú, 30 Bờ Bao <br />
                  Tân Thắng, Phường Sơn Kỳ, TP Hồ Chí Minh</address>
              </li>
              <li>
                <strong>CỬA HÀNG THỨ 32</strong>
                <address>809 Giải Phóng, Phường Giáp Bát, Quận <br />
                  Hoàng Mai, TP Hà Nội</address>
              </li>
              <li>
                <strong>CỬA HÀNG THỨ 3</strong>
                <address>192 - 194 Hoa Lan, Phường 2, Quận <br />
                  Phú Nhuận, TP Hồ Chí Minh</address>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
