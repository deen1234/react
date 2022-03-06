import { Col, Row, Grid, Spin } from 'antd';
import Breadcumb from 'app/atoms/Breadcumb';
import HotelMap from 'app/atoms/HotelMap';
import { RoomFiltration } from 'app/molecules/Filterations';
import SearchRoomCards from 'app/molecules/SearchRoomCards';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import './style.less';

const { useBreakpoint } = Grid;

const HomeRoom = (): ReactElement => {
  const screens = useBreakpoint();
  const isMobile = screens.md === false && (screens.sm === true || screens.xs === true);
  const { t } = useTranslation();
  const coordArr: any = [];

  const { roomsData, isLoading } = useSelector(({ availableRoom }: RootState) => availableRoom);
  roomsData?.map((item) => {
    coordArr.push({
      lat: item.hotel.latitude,
      lng: item.hotel.longitude,
      hotel_id: item.hotel_id,
    });
    return coordArr;
  });
  return (
    <div className="component-wrapper">
      {!isMobile && <Breadcumb />}
      <h1 className="home-room">
        {roomsData?.length} {t('globle.accommodationText')}
      </h1>
      <Spin spinning={isLoading} size="large">
        <Row gutter={[24, 24]} className="home-facility-map">
          <Col md={24} lg={24}>
            <HotelMap />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="home-room-section">
          <Col xs={0} sm={0} md={0} lg={6}>
            <RoomFiltration />
          </Col>
          <Col md={24} lg={18} className="extra-padding">
            <SearchRoomCards dataLists={roomsData || []} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default HomeRoom;
// const coord = [
//   { lat: 24.7136, lng: 46.6753 },
//   { lat: 24.5247, lng: 39.5692 },
//   { lat: 26.4207, lng: 50.0888 },
//   { lat: 21.4858, lng: 39.1925 },
//   { lat: 21.3891, lng: 39.8579 },
// ];
