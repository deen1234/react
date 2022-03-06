import { getAvailableFacility } from 'app/modules/Facilities/ducks/services';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HomeFacilityFilterSection from '../HomeFacilityFilterSection';

const FacilityFiltration = (): React.ReactElement => {
  const [priceValue, setPriceValue] = useState({ min: 0, max: 599999 });
  const [accessType, setAccessType] = useState<[]>([]);
  const [hotelRating, setHotelRating] = useState([]);

  const onAccessTypeChange = (checkedValues: any) => {
    setAccessType(checkedValues);
  };
  const onHotelRatingChange = (checkedValues: any) => {
    setHotelRating(checkedValues);
  };
  const onRangSliderChange = (val: [number, number]) => {
    setPriceValue({ min: val[0], max: val[1] });
  };

  const { state } = useLocation();

  const filterState = {
    ...state,
    starting_price: priceValue.min,
    ending_price: priceValue.max,
    amenity_category: accessType,
    hotel_rating: hotelRating,
  };

  const { city, facility_type, date, time, adult, child } = state || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableFacility(filterState));
  }, [priceValue, accessType, hotelRating, city, facility_type, date, time, adult, child]);

  return (
    <HomeFacilityFilterSection
      price={priceValue}
      setPrice={onRangSliderChange}
      accessType={accessType}
      setAccessType={onAccessTypeChange}
      hotelRating={hotelRating}
      setHotelRating={onHotelRatingChange}
    />
  );
};

export default FacilityFiltration;
