import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, message, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AddGift from './AddGift';
import ModalU from './ModalU';
import axios from 'axios';
import MenuAdmin from '../layout/menu/MenuAdmin';
import Header from '../layout/header/Header';

export default function Voucher() {
    const searchInput = useRef(null);
    const [giftvouchers, setGiftVouchers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchTextGift] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTableGift] = useState(false);

    const [tableKey, setTableKey] = useState(Date.now()); // Add a key for table re-render


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchTextGift(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        message.info(`Đã lọc theo cột ${dataIndex} hãy nhấn "reset" để cập nhật lại dữ liệu`);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchTextGift('');
        setSearchedColumn('');
        setResetTableGift(true);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
            title: 'Mã người dùng',
            dataIndex: 'maNguoiDung',
            key: 'maNguoiDung',
            ...getColumnSearchProps('maNguoiDung'),
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'anhDaiDien',
            key: 'anhDaiDien',
            render: (anhDaiDien) => <img src={anhDaiDien} alt="Ảnh đại diện" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: 'Các voucher',
            dataIndex: 'voucherList',
            key: 'voucherList',
            render: (voucherList) => (
                <Space size="middle">
                    <ul>
                        {voucherList &&
                            voucherList.split(',').map((voucher, index) => (
                                <li key={index}>
                                    <Tag>{voucher}</Tag>
                                </li>
                            ))
                        }
                    </ul>
                </Space>
            ),
        },




    ];

    useEffect(() => {
        loadGiftVouchers();
    }, [resetTable, tableKey]);

    const loadGiftVouchers = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8089/api/voucher/123');
            setGiftVouchers(result.data);
            setSearchResults(result.data);
            console.log(result.data); // Log the data to the console
        } catch (error) {
            console.error('Error loading vouchers:', error);
        } finally {
            setLoading(false);
        }

        setResetTableGift(false);
    };

    const dataSource = giftvouchers.map((voucher, index) => ({
        key: index,
        id: voucher[0],
        maNguoiDung: voucher[1],
        anhDaiDien: voucher[2],
        soDienThoai: voucher[3],
        email: voucher[4],
        voucherList: voucher[5],
    }));


    const handleTableReload = () => {
        setTableKey(Date.now()); // Update the tableKey to trigger a re-render
    };

    return (
        <div>
            <Header />
            <MenuAdmin />

            <div className="body-container">
                <div
                    className="button"
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '10px',
                    }}
                >
                    <Space>
                        <ModalU onActionSuccess={handleTableReload} />

                        <AddGift onActionSuccess={handleTableReload} />
                    </Space>

                </div>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={{ pageSize: 10 }}
                    key={resetTable ? 'reset' : 'table'}
                    style={{ margin: '10px' }}
                />
            </div>
        </div>
    );
}
