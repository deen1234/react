import Breadcumb from 'app/atoms/Breadcumb';
import FacilitiesList from 'app/molecules/FacilitiesList';
import RoomDetails from 'app/molecules/RoomDetails';
import DetailImagesWrapper from 'app/molecules/DetailImagesWrapper';
import React, { ReactElement, useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store/rootState';
import { getAvailableRoomsById, getHotelTaxesById } from './ducks/services';
import { Id } from '../Config/ducks/types';

const RoomDetail = (): ReactElement => {
  const { avalibleRoomsData, isLoading, hotelTax } = useSelector(
    ({ availableRoom }: RootState) => availableRoom,
  );

  const dispatch = useDispatch();
  const { id } = useParams<Id>();

  useEffect(() => {
    dispatch(getAvailableRoomsById(id));
  }, []);

  useEffect(() => {
    const hotelId = avalibleRoomsData?.hotel_id.toString() || '';
    if (hotelId) {
      dispatch(getHotelTaxesById(hotelId));
    }
  }, [avalibleRoomsData]);

  return (
    <div className="component-wrapper" style={{ margin: '1.5rem 0' }}>
      <Spin spinning={isLoading}>
        <DetailImagesWrapper hotelDetails={avalibleRoomsData?.hotel} />
        <Breadcumb />
        <RoomDetails roomDetails={avalibleRoomsData || null} taxes={hotelTax || null} />
        <FacilitiesList hotelDetails={avalibleRoomsData?.hotel} />
      </Spin>
    </div>
  );
};

export default RoomDetail;
