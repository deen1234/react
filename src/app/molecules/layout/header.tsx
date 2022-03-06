/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { Divider, Layout, Select, Grid, Drawer, Button } from 'antd';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import {
  AlignLeftOutlined,
  BankOutlined,
  CloseCircleOutlined,
  DownOutlined,
  InsertRowAboveOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SideDrawer from 'app/atoms/SideDrawer';
import DialogBox from 'app/atoms/DialogBox';
import { FacilityFiltration, RoomFiltration } from 'app/molecules/Filterations';
import { LoginForm, RegisterForm, ForgetPasswordForm } from 'app/modules/Auth';
import { userLogged, userLogout } from 'app/modules/Auth/ducks/slice';
// import { UserData } from 'app/modules/Auth/ducks/types';
import { profile, refresh } from 'app/modules/Auth/ducks/services';
import jwt_decode from 'jwt-decode';
import MainLogo from '../../../assets/images/shaghr-logo-1.png';
import RoomFilters from '../RoomFilters';
import FacilityFilter from '../FacilityFilter';
import LanguageSelection from './languageSelection';
import DropdownList from './dropdownList';

const { Header } = Layout;
const { Option } = Select;
const { useBreakpoint } = Grid;
interface HeaderSectionProps {
  modalHandler: React.MouseEventHandler<HTMLAnchorElement>;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ modalHandler }: HeaderSectionProps) => {
  // const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [filterDrawer, setFilterDrawer] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const screens = useBreakpoint();
  const isMobile = screens.md === false && (screens.sm === true || screens.xs === true);
  const token = localStorage.getItem('token');
  const { user, isLogged, profileData } = useSelector(({ auth }: RootState) => auth);
  const dispatch = useDispatch();
  const [decoded, setdecoded] = useState({ exp: 0 });
  // const [userInfo, setUser] = useState<UserData>();
  const [username, setusername] = useState('');
  // const getOldtoken = localStorage.getItem('token');
  // const getToken = JSON.stringify(getOldtoken || '');
  // const decoded: any = jwt_decode(getToken);
  const route = useHistory();
  const setUserFunc = (res: any) => {
    // setUser(res);
    if (res) {
      localStorage.setItem('token', res?.data?.user?.access_token);
      dispatch(profile());
    }
  };
  useEffect(() => {
    setusername(profileData?.details?.first_name);
  }, [profileData]);
  useEffect(() => {
    const getOldtoken = localStorage.getItem('token');
    if (getOldtoken?.length) {
      const getToken = JSON.stringify(getOldtoken || '');
      setdecoded(jwt_decode(getToken));
    }
  }, []);
  useEffect(() => {
    const callfunction = async () => {
      if (Date.now() > decoded.exp * 1000) {
        dispatch(refresh({ onSuccess: setUserFunc }));
        setusername(profileData?.data.user.details?.first_name);
      } else {
        dispatch(profile());
      }
    };
    callfunction();
  }, [decoded]);
  useEffect(() => {
    if (token) {
      dispatch(userLogged());
    }
  }, [user, token]);
  const onClickLogout = () => {
    localStorage.removeItem('token');
    dispatch(userLogout());
    route.push('/');
    setVisible(false);
  };

  return (
    <>
      <Header className="header-container">
        <div className="img-sec">
          <Link to="/" className="logo-section">
            <img src={MainLogo} alt="logo" className="main-logo" />
          </Link>
          {isMobile ? (
            ''
          ) : (
            <div className="tab-name">
              {pathname === '/' ? (
                ''
              ) : (
                <>
                  <NavLink className="inline-item" to="/">
                    <InsertRowAboveOutlined /> &nbsp; {t('home.filter-tab-title1')}
                  </NavLink>
                  <Divider type="vertical" className="tab-divider" />
                  <NavLink className="inline-item" to="/">
                    <BankOutlined /> &nbsp; {t('home.filter-tab-title2')}
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
        {isMobile ? (
          <AlignLeftOutlined className="nav-icon" onClick={() => setVisible(true)} />
        ) : (
          <div className="content-section">
            {pathname === '/' ||
            pathname.includes('confirmation') ||
            pathname.includes('booking') ? (
              ''
            ) : (
              <Select
                defaultValue="sar"
                className="select-option-section"
                suffixIcon={<DownOutlined className="down-icon" />}
              >
                <Option value="sar">{t('globle.sar')}</Option>
                <Option value="usd">{t('globle.usd')}</Option>
              </Select>
            )}

            <NavLink
              to="#"
              activeClassName="active-navlink"
              className="nav-link"
              onClick={modalHandler}
            >
              {t('header.myBooking')}
            </NavLink>
            <LanguageSelection />
            {!isLogged ? (
              <>
                <NavLink
                  to="#"
                  activeClassName="navlink-register"
                  className="nav-link"
                  onClick={() => setIsLogin(true)}
                >
                  {t('auth.login')}
                </NavLink>
                <NavLink
                  to="#"
                  activeClassName="navlink-register"
                  className="nav-link"
                  onClick={() => setIsRegister(true)}
                >
                  {t('auth.signUp')}
                </NavLink>
              </>
            ) : (
              token && <DropdownList />
            )}
          </div>
        )}
      </Header>
      {pathname === '/' ||
      pathname.includes('confirmation') ||
      pathname.includes('booking') ||
      pathname.includes('/home-facility/') ||
      pathname.includes('/home-room/') ||
      pathname.includes('/my-reservation') ||
      pathname.includes('/profile') ? (
        ''
      ) : (
        <Header className="filter-field-container">
          {isMobile ? (
            <div className="mobile-filter-btn">
              <Button block onClick={() => setFilterDrawer(true)}>
                {t('globle.filter')}
              </Button>
              <Button block onClick={() => setSortModal(true)}>
                {t('globle.sort')}
              </Button>
            </div>
          ) : (
            <>
              {pathname.includes('/home-room') ? <RoomFilters /> : ''}
              {pathname.includes('/home-facility') ? <FacilityFilter /> : ''}
            </>
          )}
        </Header>
      )}

      <Drawer
        title=""
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        className="side-drawer"
        width="300px"
      >
        <div className="mobile-content-section">
          {/* <Divider className="navlinks-divider" /> */}
          {pathname === '/' || pathname.includes('confirmation') ? (
            ''
          ) : (
            <Select
              defaultValue="sar"
              className="select-option-section"
              suffixIcon={<DownOutlined className="down-icon" />}
              bordered={!isMobile}
            >
              <Option value="sar">{t('globle.sar')}</Option>
              <Option value="usd">{t('globle.usd')}</Option>
            </Select>
          )}
          {/* <Divider className="navlinks-divider" /> */}
          <LanguageSelection />
          <NavLink
            to="#"
            activeClassName="active-navlink"
            className="nav-link"
            onClick={modalHandler}
          >
            {t('header.myBooking')}
          </NavLink>
          {/* <Divider className="navlinks-divider" /> */}

          {!isLogged ? (
            <>
              <NavLink
                to="#"
                activeClassName="navlink-register"
                className="nav-link"
                onClick={() => {
                  setIsLogin(true);
                  setVisible(false);
                }}
              >
                {t('auth.login')}
              </NavLink>
              <NavLink
                to="#"
                activeClassName="navlink-register"
                className="nav-link"
                onClick={() => {
                  setIsRegister(true);
                  setVisible(false);
                }}
              >
                {t('auth.signUp')}
              </NavLink>
            </>
          ) : (
            token && (
              <>
                {' '}
                <Button type="link" className="btn-logout" onClick={onClickLogout}>
                  {t('auth.logout')}
                </Button>
                <NavLink
                  to="/my-reservation"
                  activeClassName="navlink-register"
                  className="nav-link"
                  onClick={() => setVisible(false)}
                >
                  {t('auth.myReservation')}
                </NavLink>
                <NavLink
                  to="profile"
                  activeClassName="navlink-register"
                  className="nav-link"
                  onClick={() => setVisible(false)}
                >
                  {t('auth.myProfile')}
                </NavLink>
                <span className="mobUsername"> {username} </span>
              </>
            )
          )}
        </div>

        <Button type="primary" onClick={() => setVisible(false)}>
          <CloseCircleOutlined />
        </Button>
      </Drawer>

      <SideDrawer visible={filterDrawer} setVisible={setFilterDrawer}>
        {pathname.includes('/home-room') ? <RoomFiltration /> : ''}
        {pathname.includes('/home-facility') ? <FacilityFiltration /> : ''}
      </SideDrawer>
      <DialogBox visible={sortModal} setVisible={setSortModal} footer="">
        {pathname.includes('/home-room') ? <RoomFilters isModalClose={setSortModal} /> : ''}
        {pathname.includes('/home-facility') ? <FacilityFilter isModalClose={setSortModal} /> : ''}
      </DialogBox>
      <DialogBox visible={isLogin} setVisible={setIsLogin} footer="">
        <LoginForm
          isModalClose={setIsLogin}
          openLink={setIsRegister}
          onForget={setForgetPassword}
        />
      </DialogBox>
      <DialogBox visible={isRegister} setVisible={setIsRegister} footer="">
        <RegisterForm isModalClose={setIsRegister} openLink={setIsLogin} />
      </DialogBox>
      <DialogBox visible={forgetPassword} setVisible={setForgetPassword} footer="">
        <ForgetPasswordForm isModalClose={setForgetPassword} openLink={setIsLogin} />
      </DialogBox>
    </>
  );
};

export default HeaderSection;
