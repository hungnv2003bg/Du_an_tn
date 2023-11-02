import React, { useState } from "react";
import { useEffect } from "react";
import {
    Breadcrumb,
    Space,
    Table,
    Avatar,
    Tag,
    Pagination,
    Button,
    Descriptions,
    Modal,
    message,
    Image,
    Input,
    Switch,
    Select,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import UserApi from "../../../api/security/UserApi";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import { BiEdit } from "react-icons/bi";
import { ImEye } from "react-icons/im";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [listRoles, setListRoles] = useState();
    const [data, setData] = useState({
        totalItems: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10,
        hasPrevious: false,
        hasNext: true,
        data: [],
    });
    const showModal = (id) => {
        const dataOrderCurrent = data?.data?.find((x) => x.accountId === id);
        const user = dataOrderCurrent?.user;
        if (user) {
            setDataCurrent([
                {
                    userId: 1,
                    avartar: dataOrderCurrent.avartar,
                    name: user.userName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                },
            ]);
        }
        setIsModalOpen(true);
    };
    useEffect(async () => {
        try {
            const res = await UserApi.GetRoles();
            setListRoles(
                res.map((item) => ({
                    decentralizationId: item.decentralizationId,
                    authorityName: item.authorityName,
                }))
            );
        } catch (error) {}
    }, []);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
            searchName: value,
            page: 1,
        }));
    };
    const handleChangeRole = async (accountId, newRole) => {
        try {
            const confirmResult = await Swal.fire({
                title: "Xác nhận thay đổi quyền?",
                text: "Bạn có chắc muốn thay đổi quyền này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Không",
                confirmButtonText: "Chắc chắn rồi!",
            });
            if (confirmResult.isConfirmed) {
                await UserApi.ChangeRole({
                    accountId: accountId,
                    decentralizationId: newRole,
                });
                setLoading(false);
                messageApi.open({
                    type: "success",
                    content: "Thay đổi quyền thành công",
                });
                setTimeout(() => {
                    setParam({ ...param });
                }, 200);
            } else {
                setLoading(false);
                return;
            }
        } catch (error) {
            setLoading(false);
        }
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
                        style={{ width: 90 }}
                    >
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
                        style={{ width: 90 }}
                    >
                        Xóa
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
        render: (text) => {
            return dataIndex === "userName" ? (
                <span>
                    {searchText &&
                    text.toLowerCase().includes(searchText.toLowerCase()) ? (
                        <span>
                            {text
                                .split(new RegExp(`(${searchText})`, "gi"))
                                .map((fragment, i) =>
                                    fragment.toLowerCase() ===
                                    searchText.toLowerCase() ? (
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
        const getUsers = async () => {
            try {
                setLoading(true);
                const { data } = await UserApi.getAllUsers(param);
                setData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        getUsers();
    }, [param]);
    const handleChangeStatus = async (accountId) => {
        try {
            await UserApi.updateStatusUser(accountId.accountId);
            // Cập nhật trạng thái mới trong data
            setData((prevData) => {
                const newData = prevData.data.map((item) => {
                    if (item.accountId === accountId.accountId) {
                        return {
                            ...item,
                            status: !item.status, // Đảo ngược trạng thái
                        };
                    }
                    return item;
                });
                return {
                    ...prevData,
                    data: newData,
                };
            });
            messageApi.open({
                type: "success",
                content: "Thay đổi trạng thái thành công",
            });
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Thay đổi trạng thái thất bại",
            });
        } finally {
            setLoading(false);
        }
    };
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            accountId: item.accountId,
            userName: item.userName,
            email: item.email,
            decentralizationId: item.decentralizationId,
            role: (
                <Tag
                    color={
                        item.decentralization.authorityName === "Admin"
                            ? "cyan"
                            : "green"
                    }
                >
                    {item.decentralization.authorityName}
                </Tag>
            ),
            avartar: item.avartar,
            createdAt: item.createdAt,
            status: item.status,
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
            title: "Họ Tên",
            dataIndex: "userName",
            key: "userName",
            align: "center",
            ...getColumnSearchProps("userName"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avartar",
            key: "avartar",
            align: "center",
            render: (avartar) => (
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined />}
                    src={avartar}
                />
            ),
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (createdAt) => (
                <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Phân quyền",
            dataIndex: "decentralizationId",
            key: "decentralizationId",
            align: "center",
            render: (decentralizationId, record) => (
                <>
                    {/* {decentralizationId} */}
                    <Select
                        value={decentralizationId}
                        onChange={(value) =>
                            handleChangeRole(record.accountId, value)
                        }
                    >
                        {listRoles &&
                            listRoles.map((item) => {
                                return (
                                    <Select.Option
                                        key={item.decentralizationId}
                                        value={item.decentralizationId}
                                    >
                                        <p>{item.authorityName}</p>
                                    </Select.Option>
                                );
                            })}
                    </Select>
                </>
            ),
        },
        {
            title: "Trạng thái hoạt động",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status, accountId) => (
                <Switch
                    checked={status}
                    onChange={() => handleChangeStatus(accountId)}
                />
            ),
        },
        {
            title: "Hành động",
            dataIndex: "accountId",
            key: "accountId",
            align: "center",
            render: (accountId) => (
                <Space size="middle">
                    <NavLink to={`/admin/account-edit/${accountId}`}>
                        <BiEdit className="text-info" />
                    </NavLink>
                    <ImEye onClick={() => showModal(accountId)} />
                </Space>
            ),
        },
    ];
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách người dùng</Breadcrumb.Item>
            </Breadcrumb>
            {contextHolder}
            <Modal
                open={isModalOpen}
                width={1100}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Descriptions title="Thông tin khách hàng">
                    <Descriptions.Item label="Tên khách hàng">
                        {dataCurrent.length > 0 && dataCurrent[0].name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {dataCurrent.length > 0 && dataCurrent[0].phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {dataCurrent.length > 0 && dataCurrent[0].email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">
                        {dataCurrent.length > 0 && dataCurrent[0].address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vai trò">
                        {dataSource.length > 0 && dataSource[0].role}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {dataSource.length > 0 && dataSource[0].status === 1
                            ? "Hoạt động"
                            : "Vô hiệu hóa"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {format(
                            new Date(
                                dataSource.length > 0 && dataSource[0].createdAt
                            ),
                            "HH:mm:ss dd/MM/yyyy"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ảnh">
                        <Image
                            src={
                                dataCurrent.length > 0 && dataCurrent[0].avartar
                            }
                            alt="avatar"
                            width={100}
                            height={100}
                            className="object-fit-cover border rounded-circle border border-success"
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <div>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
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

export default UsersList;
