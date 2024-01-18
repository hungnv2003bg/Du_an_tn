import React, { useState, useEffect } from 'react';
import { Select, Button, Spin, Modal, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const openNotification = (type, message, description, placement) => {
  notification[type]({
    message,
    description,
    placement,
  });
};

const YourModalComponent = ({ onActionSuccess }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const YourComponent = ({ visible, onCancel }) => {
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucherId, setSelectedVoucherId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchVouchers = async () => {
        try {
          const response = await axios.get('http://localhost:8089/api/voucher/voucher-combox');
          setVouchers(response.data);
        } catch (error) {
          console.error('Error fetching vouchers:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchVouchers();
    }, []);

    const handleAddVoucher = async () => {
      try {
        if (!selectedVoucherId) {
          console.error('Please select a voucher.');
          return;
        }

        await axios.post(`http://localhost:8089/api/voucher/addVoucherForAllUsers?voucherId=${selectedVoucherId}`);

        console.log('Voucher added for all users successfully.');
        openNotification("success", "Hệ thống", "Tặng tất cả thành công", "bottomRight");

        setSelectedVoucherId('');
        onCancel(); // Close the modal after successful addition
      } catch (error) {
        console.error('Failed to add voucher for all users:', error);
      }
    };

    const handleSelectChange = (value) => {
      setSelectedVoucherId(value);
    };

    return (
      <Modal
        title="Vouchers"
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={handleAddVoucher}
            disabled={!selectedVoucherId}
          >
            Tặng tất cả
          </Button>,
        ]}
      >
        {loading ? (
          <Spin tip="Loading vouchers..." />
        ) : (
          <>
            <label>Select a Voucher:</label>
            <Select
              style={{ width: 200 }}
              onChange={handleSelectChange}
              value={selectedVoucherId}
            >
              <Option value="">Select a voucher</Option>
              {vouchers.map((voucher) => (
                <Option key={voucher.id} value={voucher.id}>
                  {voucher.tenVoucher}
                </Option>
              ))}
            </Select>
          </>
        )}
      </Modal>
    );
  };

  return (
    <div>
      
      <Button type="primary" onClick={handleOpenModal}>
        Open Voucher Tất cả
      </Button>
      
      <YourComponent visible={modalVisible} onCancel={handleCloseModal} />
    </div>
  );
};

export default YourModalComponent;
