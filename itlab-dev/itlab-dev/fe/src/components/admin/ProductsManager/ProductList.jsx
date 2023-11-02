import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Image,
  Tag,
  Pagination,
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { ImBin } from "react-icons/im";
import ProductApi from "../../../api/product/ProductApi";
import LoadingSpin from "../../loading/LoadingSpin";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

const ProductList = () => {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const handlePaginationChange = (page, pageSize) => {
    setParam(
      (prev) =>
        (prev = {
          ...param,
          page: page,
          pageSize: pageSize,
        })
    );
  };
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });
  const [searchText, setSearchText] = useState("");
  const handleSearch = (value) => {
    setSearchText(value);
    setParam((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm tên món...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys[0])}
          style={{ marginBottom: 8, display: "block", height: 30 }}
        />
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSearch(selectedKeys[0])}
            style={{ width: 90 }}>
            Tìm
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              clearFilters();
              setSearchText("");
              handleSearch("");
            }}
            danger
            style={{ width: 90 }}>
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) => {
      return dataIndex === "name" ? (
        <span>
          {searchText &&
          text.toLowerCase().includes(searchText.toLowerCase()) ? (
            <span>
              {text
                .split(new RegExp(`(${searchText})`, "gi"))
                .map((fragment, i) =>
                  fragment.toLowerCase() === searchText.toLowerCase() ? (
                    <span key={i} className="bg-warning">
                      {fragment}
                    </span>
                  ) : (
                    fragment
                  )
                )}
            </span>
          ) : (
            text
          )}
        </span>
      ) : (
        text
      );
    },
  });
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await ProductApi.getAllProducts(param);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProducts();
  }, [param]);
  // Remove product
  const handleOk = async (id) => {
    try {
      await ProductApi.removeProduct(id);
      const { data } = await ProductApi.getAllProducts(param);
      setData(data);
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Xóa sản phẩm thành công!',
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Thất bại...',
        text: 'Xóa sản phẩm thất bại!',
      })
    }
  };
  const handleCancel = () => {
    addToast("Hủy xóa", {
      appearance: "error",
      autoDismiss: true,
      autoDismissTimeout: 1000,
    });
  };
  const dataSource = data.data?.map((item, index) => {
    return {
      key: index + 1,
      id: item.productId,
      name: item.nameProduct,
      image: item.avartarImageProduct,
      price: item.price.toLocaleString("vi-VN") + " " + "VNĐ",
      discount: item.discount,
      quantity: item.quantity,
      categoryName: item.productType.nameProductType,
      status:
        item.status === 1 ? (
          <Tag color="geekblue">Hiển thị</Tag>
        ) : (
          <Tag color="volcano">Ẩn</Tag>
        ),
    };
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
      align: "center",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <Image
          src={image}
          alt={image}
          width={100}
          height={100}
          className="object-fit-cover border rounded border border-white"
        />
      ),
    },
    {
      title: "Giá món",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
      render: (categoryName) => <Tag color="#f50">{categoryName}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <NavLink to={`/admin/products-edit/${record.id}`}>
            <BiEdit className="text-info" />
          </NavLink>
          <NavLink to={`/admin/comment/${record.id}`}>
            <LuClipboardList className="text-info" />
          </NavLink>
          <Popconfirm
            title="Bạn có chắc chắn xóa?"
            onConfirm={() => {
              handleOk(record.id);
            }}
            onCancel={handleCancel}
            className="border border-white"
            okText="Có"
            cancelText="Hủy">
            <ImBin className="text-danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination
          style={{
            textAlign: "right",
            padding: "10px 20px",
          }}
          current={data.page}
          pageSize={data.pageSize}
          total={data.totalItems}
          onChange={handlePaginationChange}
          showSizeChanger
          showTotal={(total) => `Tổng ${total} sản phẩm`}
        />
      </div>
    </>
  );
};

export default ProductList;
