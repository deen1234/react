import React, { ReactElement } from 'react';
import SearchFacilityCards from 'app/molecules/SearchFacilityCards';
import { Col, Row, Grid, Spin } from 'antd';
import Breadcumb from 'app/atoms/Breadcumb';
import './style.less';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/rootState';
import { useSelector } from 'react-redux';
import { FacilityFiltration } from 'app/molecules/Filterations';
import HotelMap from 'app/atoms/HotelMap';

const { useBreakpoint } = Grid;

const HomeFacility = (): ReactElement => {
  const screens = useBreakpoint();
  const isMobile = screens.md === false && (screens.sm === true || screens.xs === true);
  const { t } = useTranslation();
  const coordArr: any = [];
  const { facilitiesData, isLoading } = useSelector(
    ({ availableFacility }: RootState) => availableFacility,
  );
  facilitiesData?.map((item) => {
    coordArr.push({
      lat: item.hotel.latitude,
      lng: item.hotel.longitude,
      hotel_id: item.hotel_id,
    });
    return coordArr;
  });
  return (
    <div className="component-wrapper">
      ;{!isMobile && <Breadcumb />}
      <h1 className="home-facility">
        {facilitiesData?.length} {t('globle.accommodationText')}
      </h1>
      <Spin spinning={isLoading} size="large">
        <Row gutter={[24, 24]} className="home-facility-map">
          <Col md={24} lg={24}>
            <HotelMap />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="home-facility-section">
          <Col xs={0} sm={0} md={0} lg={6}>
            <FacilityFiltration />
          </Col>
          <Col md={24} lg={18} className="extra-padding">
            <SearchFacilityCards dataLists={facilitiesData || []} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default HomeFacility;
