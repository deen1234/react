/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spin } from 'antd';
import RoomConfirmationCard from 'app/molecules/RoomConfirmationCard';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store/rootState';
import { getTranslated } from 'utils/functions';
import { getRoomBookingsById } from './ducks/services';

export const ComponentToPrint = React.forwardRef((props: any, ref: any): React.ReactElement => {
  return <div ref={ref}>{props.children}</div>;
});

const RoomConfirmation = (): ReactElement => {
  const { roomBookingData, isLoading } = useSelector(({ bookings }: RootState) => bookings);
  const dispatch = useDispatch();

  const { state } = useLocation();

  useEffect(() => {
    dispatch(getRoomBookingsById(state?.id));
  }, []);

  const componentRef = React.createRef<any>();

  return (
    <ComponentToPrint ref={componentRef}>
      <div className="component-wrapper" style={{ margin: '1.5rem 0' }}>
        <Spin spinning={isLoading}>
          <RoomConfirmationCard
            bookingNum={roomBookingData?.order_no}
            checkInDate={roomBookingData?.date}
            checkInTime={roomBookingData?.check_in}
            checkOutDate={roomBookingData?.date}
            checkOutTime={roomBookingData?.check_out}
            stayTime={roomBookingData?.slot_time}
            guestName={roomBookingData?.guest?.customer_name}
            guestNumber={roomBookingData?.guest?.customer_phone}
            guestEmail={roomBookingData?.guest?.customer_email}
            paymentMethod={roomBookingData?.guest?.payment_text}
            hotelName={getTranslated('hotel_name', roomBookingData?.availability)}
            hotelAddress={getTranslated('hotel_address', roomBookingData?.availability?.hotel)}
            roomType={getTranslated('name', roomBookingData?.availability?.room?.room_type)}
            adult={roomBookingData?.adult}
            child={roomBookingData?.child}
            bookingStatus={roomBookingData?.status_text}
            hotelRating={roomBookingData?.availability?.hotel_rating}
            bookingId={roomBookingData?.id}
            roomPrice={roomBookingData?.room_price || 0}
            taxes={roomBookingData?.taxes || null}
            bookingStatusNum={roomBookingData?.status || 0}
            refComp={componentRef}
            lat={roomBookingData?.hotel?.latitude}
            lng={roomBookingData?.hotel?.longitude}
          />
        </Spin>
      </div>
    </ComponentToPrint>
  );
};

export default RoomConfirmation;
