import React, { useEffect, useState } from 'react'
import LoadingSpin from "../../loading/LoadingSpin";
import { useToasts } from "react-toast-notifications";
import SlideApi from '../../../api/slide/SlideApi';
import { Breadcrumb, Image, Modal, Pagination, Popconfirm, Space, Switch, Table, Tag, message } from 'antd';
import { format } from 'date-fns';
import { ImBin, ImEye } from 'react-icons/im';
import { GrAddCircle } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const SlideList = () => {
    const { addToast } = useToasts();
    const [messageApi, contextHolder] = message.useMessage();
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

    useEffect(() => {
        const getSlides = async () => {
            try {
                setLoading(true);
                const { data } = await SlideApi.getAllSlides(param);
                setData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        getSlides();
    }, [param]);

    const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
    const [dataCurrent, setDataCurrent] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (id) => {
        const dataOrderCurrent = data.data.filter((x) => x.slidesId === id)[0];
        setDataCurrent(dataOrderCurrent);
        setCurrenOrderDeatail(
            dataOrderCurrent.slides.map((item, index) => {
                return {
                    key: index + 1,
                    slideImage: item.slideImage,
                    title: item.title,
                    subTitle: item.subTitle,
                    url: item.url,
                };
            })
        );
        setIsModalOpen(true);
    };
    const handleOut = () => {
        setIsModalOpen(false);
    };

    const handleOk = async (id) => {
        try {
            await SlideApi.removeSlide(id);
            const { data } = await SlideApi.getAllSlides(param);
            setData(data);
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Xóa bản trình chiếu thành công!',
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Thất bại...',
                text: 'Xóa bản trình chiếu thất bại!',
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

    const handleChangeStatus = async (id) => {
        try {
            await SlideApi.updateStatusSlide(id.id);
            setData((prevData) => {
                const newData = prevData.data.map((item) => {
                    if (item.slidesId === id.id) {
                        return {
                            ...item,
                            status: !item.status,
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
    const dataSource = data.data?.map((item, index) => {
        return {
            key: index + 1,
            id: item.slidesId,
            name: item.slidesName,
            image: item.avartarImageProduct,
            status: item.isShow,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
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
            title: "Tên slideshow",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
            render: (status, id) => (
                <Switch
                    checked={status}
                    onChange={() => handleChangeStatus(id)}
                />
            ),
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
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record) => (
                <Space size="middle">
                    <ImEye onClick={() => showModal(record.id)} />
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
                    <NavLink to={`slides-child-add/${record.id}`} className='p-0'>
                        <GrAddCircle />
                    </NavLink>
                </Space>
            )
        },
    ];

    const columnDeatail = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Hình ảnh",
            dataIndex: "slideImage",
            key: "slideImage",
            align: "center",
            render: (slideImage) => (
                <Image
                    src={slideImage}
                    alt={"slideImage"}
                    width={200}
                    height={100}
                    className="object-fit-cover border  border border-success"
                />
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: "center",
        },
        {
            title: "Tiêu đề phụ",
            dataIndex: "subTitle",
            key: "subTitle",
            align: "center",
        },
        {
            title: "URL",
            dataIndex: "url",
            key: "url",
            align: "center",
        },
    ];

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}>
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách slideshow</Breadcrumb.Item>
            </Breadcrumb>
            {contextHolder}
            <Modal
                open={isModalOpen}
                width={1100}
                onOk={handleOut}
                onCancel={handleOut}
            >
                <Table dataSource={currenOrderDeatail} columns={columnDeatail} />
            </Modal>
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
                    showTotal={(total) => `Tổng ${total} slideshow`}
                />
            </div>
        </>
    )
}

export default SlideList