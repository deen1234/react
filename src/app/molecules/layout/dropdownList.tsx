/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import { userLogout } from 'app/modules/Auth/ducks/slice';
import { Menu, Dropdown, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { profile, refresh } from 'app/modules/Auth/ducks/services';
import { UserData } from 'app/modules/Auth/ducks/types';
import jwt_decode from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const DropdownList = (): any => {
  const dispatch = useDispatch();
  const route = useHistory();
  const { profileData, isLoading } = useSelector(({ auth }: RootState) => auth);
  const [userInfo, setUser] = useState<UserData>();
  const [username, setusername] = useState('');
  const token = localStorage.getItem('token');
  const getToken = JSON.stringify(token || '');
  const decoded: any = jwt_decode(getToken);
  const { t } = useTranslation();

  console.log('username', username);
  console.log('profileData', profileData);
  console.log('userInfo', userInfo);

  const setUserFunc = (res: any) => {
    setUser(res);
    if (res) {
      localStorage.setItem('token', res?.data?.user?.access_token);
      dispatch(profile());
    }
  };
  useEffect(() => {
    setusername(profileData?.details?.first_name);
  }, [profileData]);

  useEffect(() => {
    const callfunction = async () => {
      if (Date.now() > decoded.exp * 1000) {
        dispatch(refresh({ onSuccess: setUserFunc }));
        dispatch(profile());
      }
    };
    callfunction();
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem('token');
    dispatch(userLogout());
    route.push('/');
  };
  const onClickReservation = () => {
    route.push('/my-reservation');
  };
  const onClickProfile = () => {
    route.push('/profile');
  };
  const menu = (): React.ReactElement => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={onClickProfile}>
          {t('auth.myProfile')}
        </Menu.Item>
        <Menu.Item key="2" onClick={onClickReservation}>
          {t('auth.myReservation')}
        </Menu.Item>
        <Menu.Item key="3" onClick={onClickLogout}>
          {t('auth.logout')}
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <Dropdown className="profile-dropdown" overlay={menu}>
          <a
            href=""
            className="ant-dropdown-link profile-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <UserOutlined className="profile-dropdown-icon" />

            <span>{username}</span>
          </a>
        </Dropdown>
      </Spin>
    </>
  );
};
export default DropdownList;
