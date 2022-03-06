import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Layout } from 'antd';
import { BankOutlined, InsertRowAboveOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import BenefecialCards from 'app/molecules/BenefecialCards';
import FilterCards from 'app/molecules/FilterCards';
import FacilityCards from 'app/molecules/FacilityCards';
import FacilityFilter from 'app/molecules/FacilityFilter';
import RoomFilters from 'app/molecules/RoomFilters';
// import HotelMap from 'app/atoms/HotelMap';
import BannerBg from '../../../assets/images/desert.webp';
import './style.less';

const { Content } = Layout;
const { TabPane } = Tabs;

export const Home = (): ReactElement => {
  const { t } = useTranslation();
  const callback = (key: string) => {
    console.log(key);
  };

  return (
    <Layout>
      <BannerBgImg className="home-page-banner-section">
        <Tabs onChange={callback} type="card" className="type-tab-section">
          <TabPane
            tab={
              <span>
                <InsertRowAboveOutlined />
                {t('home.filter-tab-title1')}
              </span>
            }
            key="1"
            className="tab-panel-1"
          >
            <div className="tab-content-section">
              <RoomFilters />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <BankOutlined /> {t('home.filter-tab-title2')}
              </span>
            }
            key="2"
            className="tab-panel-2"
          >
            <div className="tab-content-section">
              <FacilityFilter />
            </div>
          </TabPane>
        </Tabs>
        <h1 className="banner-text">{t('home.banner-heading')}</h1>
      </BannerBgImg>

      <FilterCards />

      <Content className="site-layout" style={{ padding: '0 50px' }}>
        <BenefecialCards />
        <FacilityCards />
      </Content>

      {/* <HotelMap Coordinates={[]} /> */}
    </Layout>
  );
};

// export default Home;

const BannerBgImg = styled.div`
  &::before {
    content: '';
    background-image: url(${BannerBg});
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;
