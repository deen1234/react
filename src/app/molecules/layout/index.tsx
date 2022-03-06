/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState } from 'react';
import { Button, Layout, Modal, Select, Form, Input, Typography } from 'antd';
import { BankOutlined, CloseCircleOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFacilityBookingsByOrderNum,
  getRoomBookingsByOrderNum,
} from 'app/modules/Confirmations/ducks/services';

import { RootState } from 'store/rootState';
import Footer from './footer';
import Header from './header';
import BottomBanner from './bottomBanner';
import './style.less';

const { Content } = Layout;
const { Option } = Select;
const { Text } = Typography;
interface layoutProps {
  children: ReactElement<any, any>;
}

const LayoutWrapper: React.FC<layoutProps> = ({ children }: layoutProps) => {
  const { push } = useHistory();

  const { bookingErrorMessage, isLoading } = useSelector(({ bookings }: RootState) => bookings);

  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [orderID, setOrderID] = useState('');

  const roomSuccessHandler = (data: any) => {
    setVisible(false);
    setOrderID('');
    push(`/room-booking?order_no=${orderID}`);
  };
  const facilitySuccessHandler = (data: any) => {
    setVisible(false);
    setOrderID('');
    push(`/facility-booking?order_no=${orderID}`);
    // push(
    //   {
    //     pathname: '/facility-booking',
    //   },
    //   {
    //     id: data?.id,
    //   },
    // );
  };

  const searchOrderHandler = () => {
    if (selectedType === 'room') {
      dispatch(getRoomBookingsByOrderNum({ order_no: orderID, onSuccess: roomSuccessHandler }));
    } else if (selectedType === 'facility') {
      dispatch(
        getFacilityBookingsByOrderNum({ order_no: orderID, onSuccess: facilitySuccessHandler }),
      );
    }
  };

  return (
    <Layout className="layout-wrapper-container">
      <Header modalHandler={() => setVisible(true)} />
      <Content>{children}</Content>
      <BottomBanner />
      <Footer />

      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        centered
        closeIcon={<CloseCircleOutlined />}
        className="modal-container"
        footer={[
          <Button
            type="primary"
            onClick={searchOrderHandler}
            className="footer-search-btn"
            loading={isLoading}
            disabled={selectedType.length <= 0}
          >
            Search
          </Button>,
        ]}
      >
        <h1 className="modal-heading">Search</h1>
        {bookingErrorMessage.length <= 0 ? (
          ''
        ) : (
          <Text className="error-message" type="danger">
            {bookingErrorMessage}
          </Text>
        )}
        <Select
          className="type-select"
          placeholder="Select type"
          value={selectedType}
          onChange={(e) => setSelectedType(e)}
          defaultActiveFirstOption
        >
          <Option value="" disabled>
            Select type
          </Option>
          <Option value="room">
            <InsertRowAboveOutlined />
            &nbsp; Room
          </Option>
          <Option value="facility">
            <BankOutlined />
            &nbsp; Facility
          </Option>
        </Select>
        <Form.Item label="My Order Number" className="label-input">
          <Input
            placeholder="My Order Number"
            className="input-field"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
          />
        </Form.Item>
      </Modal>
    </Layout>
  );
};

export default LayoutWrapper;
