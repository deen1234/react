import Breadcumb from 'app/atoms/Breadcumb';
import FacilitiesList from 'app/molecules/FacilitiesList';
import FacilityDetails from 'app/molecules/FacilityDetails';
import DetailImagesWrapper from 'app/molecules/DetailImagesWrapper';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { getAvailableFacilityById } from './ducks/services';
import { Id } from '../Config/ducks/types';
import { getHotelTaxesById } from '../Rooms/ducks/services';

const FacilityDetail = (): ReactElement => {
  const { avalibleFacilitiesData, isLoading } = useSelector(
    ({ availableFacility }: RootState) => availableFacility,
  );
  const { hotelTax } = useSelector(({ availableRoom }: RootState) => availableRoom);

  const dispatch = useDispatch();
  const { id } = useParams<Id>();

  useEffect(() => {
    dispatch(getAvailableFacilityById(id));
  }, []);

  useEffect(() => {
    const hotelId = avalibleFacilitiesData?.hotel_id.toString() || '';
    if (hotelId) {
      dispatch(getHotelTaxesById(hotelId));
    }
  }, [avalibleFacilitiesData]);

  return (
    <div className="component-wrapper" style={{ margin: '1.5rem 0' }}>
      <Spin spinning={isLoading}>
        <DetailImagesWrapper hotelDetails={avalibleFacilitiesData?.hotel} />
        <Breadcumb />
        <FacilityDetails
          facilityDetails={avalibleFacilitiesData || null}
          taxes={hotelTax || null}
        />
        <FacilitiesList hotelDetails={avalibleFacilitiesData?.hotel} />
      </Spin>
    </div>
  );
};

export default FacilityDetail;
