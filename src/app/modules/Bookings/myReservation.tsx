/* eslint-disable no-debugger */
import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Spin, Table } from 'antd';
import './style.less';
import { RootState } from 'store/rootState';
import { useDispatch, useSelector } from 'react-redux';
import { myReservation, profile, refresh } from 'app/modules/Auth/ducks/services';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { UserData } from '../Auth/ducks/types';

const MyReservation = (): ReactElement => {
  const { push } = useHistory();
  const { t } = useTranslation();

  const token = localStorage.getItem('token');
  const getToken = JSON.stringify(token || '');
  const decoded: any = jwt_decode(getToken);

  const { myReservationData } = useSelector(({ auth }: RootState) => auth);
  const [userInfo, setUser] = useState<UserData>();
  console.log(userInfo);

  const dispatch = useDispatch();
  const columns = [
    {
      title: `${t('auth.orderNo')}`,
      dataIndex: 'order_no',
      key: 'order_no',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: `${t('auth.hotelName')}`,
      dataIndex: 'hotel_name',
      key: 'hotel_name',
    },
    {
      title: `${t('auth.date')}`,
      dataIndex: 'date',
      key: 'date',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: `${t('auth.checkIn')}`,
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: `${t('auth.checkOut')}`,
      dataIndex: 'check_out',
      key: 'check_out',
    },
    {
      title: `${t('auth.stay')}`,
      dataIndex: 'slot_time',
      key: 'slot_time',
    },
    {
      title: `${t('auth.status')}`,
      dataIndex: 'status_text',
      key: 'status_text',
    },

    {
      title: `${t('auth.totalGuest')}`,
      render: (_text: any, _record: any) => (
        <>
          {_record.booking_type === 10 ? (
            <span>
              {_record.adult} Adult <br /> {_record.child} Child
            </span>
          ) : (
            <span>
              {_record.adult} Adult <br /> {_record.child} Child
            </span>
          )}
        </>
      ),
    },
    {
      title: `${t('auth.reservationDetails')}`,
      // dataIndex: 'booking_text',
      // key: 'booking_text',
      render: (_text: any, _record: any) => (
        <>
          {_record.booking_text}
          <br />
          {_record.booking_type === 10 ? (
            <span>
              {_record.total_rooms} X {_record.room_type_name}
            </span>
          ) : (
            <span>{_record.amenity_name}</span>
          )}
        </>
      ),
    },
    {
      title: `${t('auth.paymentType')}`,
      dataIndex: 'payment_text',
      key: 'payment_text',
    },
    {
      title: `${t('auth.totalAmount')}`,
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: `${t('auth.action')}`,
      dataIndex: 'action',
      key: 'action',
      render: (_text: any, _record: any) => (
        <>
          {_record.booking_type === 10 ? (
            <Button onClick={() => push(`/room-booking?order_no=${_record?.order_no}`)}>
              {t('auth.view')}
            </Button>
          ) : (
            <Button onClick={() => push(`/facility-booking?order_no=${_record?.order_no}`)}>
              {t('auth.view')}
            </Button>
          )}
        </>
      ),
    },
  ];
  const setUserFunc = (res: any) => {
    setUser(res);
    if (res) {
      localStorage.setItem('token', res?.data?.user?.access_token);
      dispatch(myReservation());
      dispatch(profile());
    }
  };

  useEffect(() => {
    const callfunction = async () => {
      if (Date.now() > decoded.exp * 1000) {
        dispatch(refresh({ onSuccess: setUserFunc }));
      } else {
        dispatch(myReservation());
        dispatch(profile());
      }
    };
    callfunction();
  }, []);

  return (
    <div className="component-wrapper" style={{ margin: '1.5rem 0' }}>
      <Table
        className="my-reservation-container"
        columns={columns}
        dataSource={myReservationData}
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
        loading={{
          indicator: (
            <div>
              <Spin size="large" />
            </div>
          ),
          spinning: !myReservationData,
        }}
      />
    </div>
  );
};

export default MyReservation;
