import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { Select, Checkbox, Button, Spin, notification, Modal, Table,Input } from 'antd';

const { Option } = Select;

const openNotification = (type, message, description, placement) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

// ... (existing imports)

const YourComponent = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch voucher and user data when the component mounts
    const fetchData = async () => {
      try {
        const voucherResponse = await axios.get('http://localhost:8089/api/voucher/voucher-combox');
        const usersResponse = await axios.get('http://localhost:8089/api/voucher/giftvoucher');

        setVouchers(voucherResponse.data);
        setAllUsers(usersResponse.data);
        setFilteredUsers(usersResponse.data); // Initialize filtered users with all users
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Enable the button only if a voucher is selected and at least one user is checked
    setButtonDisabled(!selectedVoucherId || selectedUserIds.length === 0);
  }, [selectedVoucherId, selectedUserIds]);

  const handleAddVoucher = async () => {
    try {
      if (!selectedVoucherId || selectedUserIds.length === 0) {
        console.error('Please select a voucher and at least one user.');
        return;
      }

      const data = {
        voucherId: selectedVoucherId,
        nguoiDungId: selectedUserIds.join(',')
      };

      const url = 'http://localhost:8089/api/voucher/add-nguoidung?' + qs.stringify(data);

      const response = await axios.post(url);

      console.log('Voucher added for selected users successfully.', response.data);
      openNotification("success", "Hệ thống", "Tặng người dùng thành công", "bottomRight");

      // Optionally, you can reset the selected voucher and users after successful addition
      setSelectedVoucherId('');
      setSelectedUserIds([]);
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to add voucher for selected users:', error.response ? error.response.data : error.message);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedVoucherId(value);
  };

  const handleUserCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const handleSearch = () => {
    // Filter users based on the search term
    const filtered = allUsers.filter((user) =>
      user.maNguoiDung.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Mã Người Dùng',
      dataIndex: 'maNguoiDung',
      key: 'maNguoiDung',
    },
    {
      title: 'Chọn người dùng',
      dataIndex: 'id',
      key: 'selectUser',
      render: (userId) => (
        <Checkbox
          checked={selectedUserIds.includes(userId)}
          onChange={() => handleUserCheckboxChange(userId)}
        />
      ),
    },
  ];

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Voucher người dùng
      </Button>
      <Modal
        title="Tặng người dùng"
        visible={modalVisible}
        onOk={handleAddVoucher}
        onCancel={handleCancel}
        okButtonProps={{ disabled: buttonDisabled }}
      >
        {loading ? (
          <Spin tip="Loading data..." />
        ) : (
          <>
            <label>Chọn Voucher:</label>
            <Select
              style={{ width: '200px' }}
              placeholder="Select a voucher"
              onChange={handleSelectChange}
              value={selectedVoucherId}
            >
              {vouchers.map((voucher) => (
                <Option key={voucher.id} value={voucher.id}>
                  {voucher.tenVoucher}
                </Option>
              ))}
            </Select>

            <div>
              <h4>Chọn người dùng:</h4>
              <Input
                placeholder="Tìm kiếm mã người dùng"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onPressEnter={handleSearch}
              />
              <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default YourComponent;

