import React, { ReactElement, useEffect } from 'react';
import FacilityConfirmationCard from 'app/molecules/FacilityConfirmationCard';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store/rootState';
import { Spin } from 'antd';
import { getTranslated } from 'utils/functions';
import { getFacilityBookingsByOrderNum } from '../Confirmations/ducks/services';

export const ComponentToPrint = React.forwardRef((props: any, ref: any): React.ReactElement => {
  return <div ref={ref}>{props.children}</div>;
});

const FacilityBooking = (): ReactElement => {
  const { facilityBookingData, isLoading } = useSelector(({ bookings }: RootState) => bookings);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const { search } = useLocation();
  const orderNo = new URLSearchParams(search);
  const order_no = orderNo.get('order_no');
  // useEffect(() => {
  //   dispatch(getFacilityBookingsById(state?.id));
  // }, []);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispatch(getFacilityBookingsByOrderNum({ order_no: order_no || '', onSuccess: () => {} }));
  }, []);
  const componentRef = React.createRef<any>();

  return (
    <ComponentToPrint ref={componentRef}>
      <div className="component-wrapper" style={{ margin: '1.5rem 0' }}>
        <Spin spinning={isLoading}>
          <FacilityConfirmationCard
            bookingNum={facilityBookingData?.order_no}
            checkInDate={facilityBookingData?.date}
            checkInTime={facilityBookingData?.check_in}
            checkOutDate={facilityBookingData?.date}
            checkOutTime={facilityBookingData?.check_out}
            stayTime={facilityBookingData?.slot_time}
            guestName={facilityBookingData?.guest?.customer_name}
            guestNumber={facilityBookingData?.guest?.customer_phone}
            guestEmail={facilityBookingData?.guest?.customer_email}
            paymentMethod={facilityBookingData?.guest?.payment_text}
            hotelName={getTranslated('hotel_name', facilityBookingData?.availability)}
            hotelAddress={getTranslated('hotel_address', facilityBookingData?.availability?.hotel)}
            adult={facilityBookingData?.adult}
            bookingStatus={facilityBookingData?.status_text}
            hotelRating={facilityBookingData?.availability?.hotel_rating}
            facilityType={getTranslated(
              'name',
              facilityBookingData?.availability?.amenity?.amenity_type,
            )}
            bookingId={facilityBookingData?.id}
            facilityPrice={facilityBookingData?.amenity_price || 0}
            taxes={facilityBookingData?.taxes || null}
            bookingStatusNum={facilityBookingData?.status || 0}
            refComp={componentRef}
            isBooked={state?.isBooked}
            lat={facilityBookingData?.availability?.hotel?.latitude}
            lng={facilityBookingData?.availability?.hotel?.longitude}
          />
        </Spin>
      </div>
    </ComponentToPrint>
  );
};

export default FacilityBooking;
