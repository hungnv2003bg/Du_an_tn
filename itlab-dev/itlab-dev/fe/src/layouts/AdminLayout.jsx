import React from "react";
import { Avatar, Badge, Dropdown, Layout, Menu } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ProductList from "../components/admin/ProductsManager/ProductList";
import ProductAdd from "../components/admin/ProductsManager/ProductAdd";
import ProductEdit from "../components/admin/ProductsManager/ProductEdit";
import Dashboard from "../components/admin/Dashboard";
import CategoryList from "../components/admin/CategoriesManager/CategoryList";
import CategoryAdd from "../components/admin/CategoriesManager/CategoryAdd";
import CategoryEdit from "../components/admin/CategoriesManager/CategoryEdit";
import UsersList from "../components/admin/UsersManager/UsersList";
import UsersAdd from "../components/admin/UsersManager/UsersAdd";
import UsersEdit from "../components/admin/UsersManager/UsersEdit";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// Icons
import { RxDashboard } from "react-icons/rx";
import { AiFillRead } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { BiConfused, BiSlideshow } from "react-icons/bi";
import {
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BsCart2, BsBoxSeam, BsClock, BsBagCheck } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import {
  MdOutlineCategory,
  MdOutlineCancel,
  MdOutlineContactSupport,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { TbTruckDelivery, TbSlideshow } from "react-icons/tb";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import SubMenu from "antd/es/menu/SubMenu";
import OrderList from "../components/admin/OrdersManager/OrderList";
import OrderPending from "../components/admin/OrdersManager/OrderPending";
import OrderHasBeenConfirmed from "../components/admin/OrdersManager/OrderHasBeenConfirmed";
import OrderBeingDilivered from "../components/admin/OrdersManager/OrderBeingDelivered";
import OrderCompleted from "../components/admin/OrdersManager/OrderCompleted";
import OrderCanceled from "../components/admin/OrdersManager/OrderCanceled";
import OrderCanceledByCustomer from "../components/admin/OrdersManager/OrderCanceledByCustomer";
import ContactsList from "../components/admin/ContactsManager/ContactsList";
import NewList from "../components/admin/NewsMangager/NewList";
import CreateNews from "../components/admin/NewsMangager/CreateNews";
import ListCommentManager from "../components/admin/CommentManager/ListCommentManager";
import VoucherList from "../components/admin/VouchersManager/VoucherList";
import VoucherAdd from "../components/admin/VouchersManager/VoucherAdd";
import SlideList from "../components/admin/SlidesManager/SlideList";
import SlideAdd from "../components/admin/SlidesManager/SlideAdd";
import SlideChildAdd from "../components/admin/SlidesManager/SlideChildAdd";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token !== null) {
      // Phân tách JWT thành các phần: header, payload và signature
      const parts = Token.split(".");
      const encodedPayload = parts[1];
      // Giải mã phần payload từ Base64
      const decodedPayload = atob(encodedPayload);
      // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
      const payloadObject = JSON.parse(decodedPayload);
      // Truy cập vào giá trị "role"
      const role = payloadObject.role;
      if (role !== "admin") {
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: "Bạn không có quyền để vào trang quản trị!",
        });
        history.push("/");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại...",
        text: "Vui lòng đăng nhập để có thể vào hệ thống!",
      });
      history.push("/login-register");
    }
  }, [history]);
  // Handle Logout AdminLayout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    history.push("/");
  };
  const profile = (
    <Menu
      items={[
        {
          key: "1",
          icon: <SettingOutlined />,
          label: <span>Tài khoản</span>,
        },
        {
          key: "2",
          icon: <LogoutOutlined />,
          label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
      ]}
    />
  );
  return (
    <Layout className="min-vh-100">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={240}>
        <NavLink to="/">
          <p
            className="logo-admin text-center"
            style={{ fontSize: "34px", margin: "20px 0 14px" }}>
            <span style={{ color: "#f58634" }}>POLY</span>
            <span style={{ color: "#69b550" }}>FOOD</span>
          </p>
        </NavLink>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="/admin/dashboard" icon={<RxDashboard />}>
            <NavLink to="/admin/dashboard">Bảng điều khiển</NavLink>
          </Menu.Item>
          {/* Product Manager */}
          <SubMenu key="subMenu-1" icon={<BsCart2 />} title="Quản lý sản phẩm">
            <Menu.Item key="/admin/products" icon={<CiBoxList />}>
              <NavLink to="/admin/products">Danh sách sản phẩm</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/products-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/products-add">Tạo sản phẩm</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* Category Manager */}
          <SubMenu
            key="subMenu-2"
            icon={<MdOutlineCategory />}
            title="Quản lý danh mục">
            <Menu.Item key="/admin/categories" icon={<CiBoxList />}>
              <NavLink to="/admin/categories">Danh sách danh mục</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/categories-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/categories-add">Tạo danh mục</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* User Manager */}
          <SubMenu
            key="subMenu-3"
            icon={<FiUsers />}
            title="Quản lý người dùng">
            <Menu.Item key="/admin/account" icon={<CiBoxList />}>
              <NavLink to="/admin/account">Danh sách người dùng</NavLink>
            </Menu.Item>
          </SubMenu>
          {/* Voucher Manager */}
          <SubMenu
            key="subMenu-4"
            icon={<HiOutlineReceiptPercent />}
            title="Quản lý mã giảm giá">
            <Menu.Item key="/admin/vouchers" icon={<CiBoxList />}>
              <NavLink to="/admin/vouchers">Danh sách giảm giá</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/voucher-add" icon={<IoCreateOutline />}>
              <NavLink to="/admin/voucher-add">Thêm mã giảm giá</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="subMenu-5"
            icon={<MdOutlineContactSupport />}
            title="Quản lý liên hệ">
            <Menu.Item key="/admin/Contacts" icon={<CiBoxList />}>
              <NavLink to="/admin/Contacts">Danh sách liên hệ</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="subMenu-6"
            icon={<AiFillRead />}
            title="Quản lý bài viết">
            <Menu.Item key="/news" icon={<CiBoxList />}>
              <NavLink to="/admin/news">Danh sách bài viết</NavLink>
            </Menu.Item>
            <Menu.Item key="/create-news" icon={<IoCreateOutline />}>
              <NavLink to="/admin/news-add">Thêm mới bài viết</NavLink>
            </Menu.Item>
          </SubMenu>
          {/*Order Manager */}
          <SubMenu
            key="subMenu-7"
            icon={<BsBoxSeam />}
            title="Quản lý đơn hàng">
            <Menu.Item key="/admin/orders" icon={<CiBoxList />}>
              <NavLink to="/admin/orders">Danh sách đơn hàng</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-pending" icon={<BsClock />}>
              <NavLink to="/admin/orders-pending">Đơn hàng đang chờ</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-been-confirmed" icon={<GiConfirmed />}>
              <NavLink to="/admin/orders-been-confirmed">
                Đơn hàng xác nhận
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="/admin/orders-beingdelivered"
              icon={<TbTruckDelivery />}>
              <NavLink to="/admin/orders-beingdelivered">
                Đơn hàng đang giao
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-completed" icon={<BsBagCheck />}>
              <NavLink to="/admin/orders-completed">Đơn hoàn thành</NavLink>
            </Menu.Item>
            <Menu.Item key="/admin/orders-canceled" icon={<MdOutlineCancel />}>
              <NavLink to="/admin/orders-canceled">Đơn đã hủy</NavLink>
            </Menu.Item>
            <Menu.Item
              key="/admin/orders-canceled-by-customer"
              icon={<BiConfused />}>
              <NavLink to="/admin/orders-canceled-by-customer">
                Đơn khách hàng hủy
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {/* SlideShow Manager */}
          <SubMenu
            key="subMenu-8"
            icon={<BiSlideshow />}
            title="Quản lý slideshow">
            <Menu.Item key="/slides" icon={<CiBoxList />}>
              <NavLink to="/admin/slides">Danh sách slideshow</NavLink>
            </Menu.Item>
            <Menu.Item key="/create-slides" icon={<IoCreateOutline />}>
              <NavLink to="/admin/slides-add">Thêm mới slideshow</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="p-0">
          <div className="d-flex justify-content-end">
            <div className="px-2">
              <Badge count={10}>
                <BellOutlined className="text-light" style={{ fontSize: 24 }} />
              </Badge>
            </div>
            <div className="px-4">
              <Dropdown overlay={profile} trigger={["click"]}>
                <Avatar
                  className="bg-secondary"
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            {/* Product router */}
            <Route path="/admin/products" component={ProductList} />
            <Route path="/admin/products-add" component={ProductAdd} />
            <Route path="/admin/products-edit/:id" component={ProductEdit} />
            {/* Category router */}
            <Route path="/admin/categories" component={CategoryList} />
            <Route path="/admin/categories-add" component={CategoryAdd} />
            <Route path="/admin/categories-edit/:id" component={CategoryEdit} />
            {/* User router */}
            <Route path="/admin/account" component={UsersList} />
            <Route path="/admin/account-add" component={UsersAdd} />
            <Route path="/admin/account-edit/:id" component={UsersEdit} />
            {/* Order router */}
            <Route path="/admin/orders" component={OrderList} />
            <Route path="/admin/orders-pending" component={OrderPending} />
            <Route
              path="/admin/orders-been-confirmed"
              component={OrderHasBeenConfirmed}
            />
            <Route
              path="/admin/orders-beingdelivered"
              component={OrderBeingDilivered}
            />
            <Route path="/admin/orders-completed" component={OrderCompleted} />
            <Route path="/admin/orders-canceled" component={OrderCanceled} />
            <Route
              path="/admin/orders-canceled-by-customer"
              component={OrderCanceledByCustomer}
            />
            {/* Contact router */}
            <Route path="/admin/contacts" component={ContactsList} />
            {/* News router */}
            <Route path="/admin/news" component={NewList} />
            <Route path="/admin/news-add" component={CreateNews} />
            {/* Voucher router */}
            <Route path="/admin/vouchers" component={VoucherList} />
            <Route path="/admin/voucher-add" component={VoucherAdd} />
            {/* comment router */}
            <Route path={"/admin/comment/:id"} component={ListCommentManager} />
            {/* Slideshow router */}
            <Route path="/admin/slides" component={SlideList} />
            <Route path="/admin/slides-add" component={SlideAdd} />
            <Route path="/admin/slides-child-add/:id" component={SlideChildAdd} />
            {/* Redirect to Dashboard */}
            <Redirect to="/admin/dashboard" />
          </Switch>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}>
          Poly Food - &#169; FPT Polytechnic Hà Nội
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
