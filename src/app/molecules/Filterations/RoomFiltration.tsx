import { getAvailableRooms } from 'app/modules/Rooms/ducks/services';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HomeRoomFilterSection from '../HomeRoomFilterSection';

const RoomFiltration = (): React.ReactElement => {
  const [priceValue, setPriceValue] = useState({ min: 0, max: 599999 });
  const [hours, setHours] = useState([]);
  const [hotelRating, setHotelRating] = useState([]);
  // const [selectedRoomType, setSelectedRoomType] = useState([]);
  const [selectedServiceType, setSelectedServiceType] = useState([]);

  const onHoursChange = (checkedValues: any) => {
    setHours(checkedValues);
  };
  const onHotelRatingChange = (checkedValues: any) => {
    setHotelRating(checkedValues);
  };
  const onRangSliderChange = (val: [number, number]) => {
    setPriceValue({ min: val[0], max: val[1] });
  };

  const onSelectedRoomTypeChange = (checkedValues: any) => {
    // setSelectedRoomType(checkedValues);

    setSelectedServiceType(checkedValues);
  };

  const dispatch = useDispatch();

  const { state } = useLocation();
  const { city, room_count, date, time, adult, child } = state || {};

  const filterState = {
    ...state,
    starting_price: priceValue.min,
    ending_price: priceValue.max,
    // room_types: selectedRoomType,
    booking_hours: hours,
    hotel_rating: hotelRating,
    service_type: selectedServiceType,
  };

  useEffect(() => {
    dispatch(getAvailableRooms(filterState));
  }, [
    priceValue,
    hotelRating,
    hours,
    // selectedRoomType,
    selectedServiceType,
    city,
    room_count,
    date,
    time,
    adult,
    child,
  ]);
  return (
    <HomeRoomFilterSection
      price={priceValue}
      setPrice={onRangSliderChange}
      hours={hours}
      setHours={onHoursChange}
      hotelRating={hotelRating}
      setHotelRating={onHotelRatingChange}
      // selectedRoomType={selectedRoomType}
      // setSelectedRoomType={onSelectedRoomTypeChange}
      selectedServiceType={selectedServiceType}
      setSelectedServiceType={onSelectedRoomTypeChange}
    />
  );
};

export default RoomFiltration;
