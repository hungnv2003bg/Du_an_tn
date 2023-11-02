import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Space, Card, Statistic, Divider } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CalculateMonthly from "./StatisticsManager/CalculateMonthly";
import CalculateOrder from "./StatisticsManager/CalculateOrder";
import TopSelling from "./StatisticsManager/TopSelling";
import LoadingSpin from "../loading/LoadingSpin";
import StatisticsApi from "../../api/statistic/StatisticsApi";
import AccountCountsByMonth from "./StatisticsManager/AccountCountsByMonth";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await StatisticsApi.GetStatisticsData();
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const DashboardCard = ({
    title,
    value,
    icon,
    cardBackgroundColor,
    cardBorderRadius,
  }) => {
    return (
      <Card
        style={{
          backgroundColor: cardBackgroundColor,
          borderRadius: cardBorderRadius,
        }}>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  };

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>

      <Row wrap={false} justify="center" style={{ marginBottom: 24 }}>
        <Col
          span={5}
          style={{
            marginRight: 24,
            backgroundColor: "rgba(0, 255, 0, 0.25)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Đơn hàng"
            value={data.orderCount || 100}
            cardBackgroundColor="#DDFFD1"
            cardBorderRadius="20px"
          />
        </Col>
        <Col
          span={5}
          style={{
            marginRight: 24,
            backgroundColor: "rgba(0, 0, 255, 0.25)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.1)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Sản phẩm"
            value={data.productCount || 100}
            cardBackgroundColor="#C2DCFF"
            cardBorderRadius="20px"
          />
        </Col>
        <Col
          span={5}
          style={{
            backgroundColor: "rgba(148, 0, 211, 0.1)",
            borderRadius: 20,
            marginRight: 24,
          }}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "darkviolet",
                  backgroundColor: "rgba(148,0,211, 0.1)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Khách hàng"
            value={data.userCount || 100}
            cardBackgroundColor="#F3DBFF"
            cardBorderRadius="20px"
          />
        </Col>
        <Col
          span={5}
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Doanh thu"
            value={data.revenue || 100}
            cardBackgroundColor="#FEDFC3"
            cardBorderRadius="20px"
          />
        </Col>
      </Row>
      {loading && (
        <div>
          <LoadingSpin />
        </div>
      )}
      <Row wrap={false} justify="space-evenly" style={{ marginTop: "16px" }}>
        <Col
          span={11}
          style={{
            backgroundColor: "#F9FCFD",
            border: "1px solid #ccc",
            borderRadius: 20,
            padding: 12,
          }}>
          <Divider orientation="center" style={{ fontSize: 24 }}>
            Đơn đặt hàng
          </Divider>
          <CalculateOrder />
        </Col>
        <Col
          span={11}
          style={{
            backgroundColor: "#F9FCFD",
            border: "1px solid #ccc",
            borderRadius: 20,
            padding: 12,
          }}>
          <Divider orientation="center" style={{ fontSize: 24 }}>
            Sản phẩm bán chạy
          </Divider>
          <TopSelling SetLoading={setLoading} />
        </Col>
      </Row>

      <Row wrap={false} style={{ padding: "24px 0" }}>
        <Col
          span={24}
          style={{
            backgroundColor: "#F9FCFD",
            border: "1px solid #ccc",
            borderRadius: 20,
            padding: 12,
          }}>
          <Divider orientation="center" style={{ fontSize: 24 }}>
            Doanh thu
          </Divider>
          <CalculateMonthly />
        </Col>
      </Row>
      <Row wrap={false} style={{ padding: "24px 0" }}>
        <Col
          span={24}
          style={{
            backgroundColor: "#F9FCFD",
            border: "1px solid #ccc",
            borderRadius: 20,
            padding: 12,
          }}>
          <Divider orientation="center" style={{ fontSize: 24 }}>
            Người dùng mới trong tháng
          </Divider>
          <AccountCountsByMonth />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
