/* eslint-disable no-debugger */
import { Form, Input, Button, Spin, notification } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import PhoneInput from 'react-phone-input-2';
import { useTranslation } from 'react-i18next';
import { profile, profileEdit } from './ducks/services';

import 'react-phone-input-2/lib/high-res.css';

// import { useSelector } from 'react-redux';
// import { RootState } from 'store/rootState';

const Profile = (): ReactElement => {
  const { profileData, isLoading } = useSelector(({ auth }: RootState) => auth);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [enable, setEnable] = useState(true);
  const [editBtn, setEditBtn] = useState(true);
  const [updateBtn, setUpdateBtn] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setName(profileData?.name);
    setPhone(profileData?.details?.phone);
  }, [profileData]);
  const setUserFunc = (res: any) => {
    if (res.success === true) {
      dispatch(profile());
      notification.open({
        message: res.message,
      });
    }
  };

  const onUpdate = () => {
    dispatch(
      profileEdit({
        name,
        phone,
        onSuccess: setUserFunc,
      }),
    );
    setEnable(true);
    setEditBtn(true);
    setUpdateBtn(false);
  };
  const onEdit = () => {
    setEditBtn(false);
    setUpdateBtn(true);
    setEnable(false);
  };

  return (
    <>
      <Form
        // onFinish={onFinish}
        className="profile-form-container"
        style={{ margin: '1.5rem 0' }}
      >
        <h1> {t('auth.myProfile')}</h1>

        <Spin spinning={isLoading}>
          <Form.Item initialValue={name} name="name" label={t('auth.name')} valuePropName="name">
            <Input
              className="input-field"
              value={name}
              disabled={enable}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          {/* <Form.Item
            label="Name"
            name="name"
            valuePropName="name"
            rules={[{ required: true, message: 'Please input your Name!', whitespace: true }]}
            initialValue={name}
            // valuePropName="name"
          >
            <Input value={name} disabled={enable} />
          </Form.Item> */}

          {/* <Form.Item name={phone} label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}

          <Form.Item
            label={t('auth.phone')}
            name="phone"
            valuePropName="phone"
            initialValue={phone}
            className="phone-input"
          >
            <PhoneInput
              country="sa"
              masks={{ sa: '(...) ...-...-...' }}
              inputClass="input-field"
              disabled={enable}
              value={phone}
              onChange={(e) => setPhone(e)}
            />
          </Form.Item>

          <Form.Item name={profileData?.email} label={t('auth.email')} valuePropName="profileData">
            <Input className="input-field" value={profileData?.email} disabled />
          </Form.Item>
          <Form.Item>
            {editBtn ? <Button onClick={onEdit}>Edit</Button> : null}
            {updateBtn ? <Button onClick={onUpdate}>Update</Button> : null}
          </Form.Item>
        </Spin>
      </Form>
    </>
  );
};

export default Profile;
