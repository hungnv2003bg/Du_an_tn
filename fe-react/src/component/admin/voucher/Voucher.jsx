import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, message, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PauseCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';



import axios from 'axios';
import moment from 'moment';
import ModalU from './ModalU';
import ModalD from './ModalD';
import ModalA from './ModalA';
import MenuAdmin from '../layout/menu/MenuAdmin';
import Header from '../layout/header/Header';
import { fixMoney } from '../../../extensions/fixMoney';


export default function Voucher() {
    const searchInput = useRef(null);
    const [vouchers, setVouchers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTable] = useState(false);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        message.info(`Đã lọc theo cột ${dataIndex} hãy nhấn "reset" để cập nhật lại dữ liệu`);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        setResetTable(true);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                {/* <Search
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                /> */}
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 1);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Tên Voucher',
            dataIndex: 'tenVoucher',
            key: 'tenVoucher',
            ...getColumnSearchProps('tenVoucher'),
        },

        {
            title: 'Mã Voucher',
            dataIndex: 'maVoucher',
            key: 'maVoucher',
        }
        ,
        {
            title: 'Mức giảm',
            dataIndex: 'giaTriGiam',
            key: 'giaTriGiamDisplay',
            render: (giaTriGiam, record) => {
                <>
                    <span>{fixMoney(giaTriGiam)}</span>
                </>
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
        {
            title: 'Ngày tạo ',
            dataIndex: 'ngayTao',
            key: 'ngayTao',
            ...getColumnSearchProps('ngayTao'),
            render: (ngayTao) => (
                <span >

                    {moment(ngayTao).format('DD/MM/YYYY')}

                </span>
            )
        },
        {
            title: 'Ngày Kết Thúc ',
            dataIndex: 'ngayKetThuc',
            key: 'ngayKetThuc',
            ...getColumnSearchProps('ngayKetThuc'),
            render: (ngayKetThuc) => (
                <span >

                    {moment(ngayKetThuc).format('DD/MM/YYYY')}

                </span>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (text) => (
                <span style={{ color: text.toLowerCase() === 'ngung' ? 'red' : 'green' }}>
                    {text.toLowerCase() === 'ngung' ? <CloseCircleOutlined /> : (text.toLowerCase() === 'dienra' ? <PauseCircleOutlined /> : text)}
                </span>
            ),
        },
        {
            title: 'Cập nhật',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                <ModalU recordId={record.id} onActionSuccess={reloadVouchers} />
            </div>

        },
        {
            title: 'Thay trạng thái',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                <ModalD recordId={record.id} onActionSuccess={reloadVouchers} />
            </div>

        },
    ];

    useEffect(() => {
        loadVouchers();
    }, [resetTable]);

    const loadVouchers = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8089/api/voucher/test');
            setVouchers(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error loading vouchers:', error);
        } finally {
            setLoading(false);
        }

        setResetTable(false);
    };
    const reloadVouchers = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8089/api/voucher/test');
            setVouchers(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error reloading vouchers:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div>
            <Header />
            <MenuAdmin />


            <div className="body-container">
                <div className="button"
                    style={{
                        display: 'flex',
                        justifyContent: "flex-end",
                        margin: "10px",
                    }}>


                    <ModalA onActionSuccess={reloadVouchers} />


                </div>

                <Table
                    columns={columns}
                    dataSource={searchResults}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    key={resetTable ? 'reset' : 'table'}
                    style={{ margin: '10px', display: 'inline-block' }} />
            </div>
        </div>

    );
}








