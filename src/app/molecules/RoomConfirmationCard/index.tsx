/* eslint-disable no-debugger */
import { StarFilled } from '@ant-design/icons';
import { Card, Row, Col, Divider, Space, Button, message } from 'antd';
import InlineText from 'app/atoms/InlineText';
import { cancelRoomBookingsById } from 'app/modules/Confirmations/ducks/services';
import { OrderTaxData } from 'app/modules/Confirmations/ducks/types';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import './style.less';
import { useReactToPrint } from 'react-to-print';
import HotelMap from 'app/atoms/HotelMap';
import moment from 'moment';

interface RoomConfirmationCardProps {
  bookingNum?: string;
  checkInDate?: string;
  checkInTime?: string;
  checkOutDate?: string;
  checkOutTime?: string;
  stayTime?: number;
  guestName?: string;
  guestNumber?: string;
  guestEmail?: string;
  paymentMethod?: string;
  hotelName?: string;
  hotelAddress?: string;
  roomType?: string;
  adult?: number;
  child?: number;
  bookingStatus?: string;
  hotelRating?: string;
  bookingId?: number;
  roomPrice: number;
  taxes: OrderTaxData[] | null;
  bookingStatusNum: number;
  refComp?: any;
  lat?: number | string;
  lng?: number | string;
}

const RoomConfirmationCard = ({
  bookingNum,
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
  stayTime,
  guestName,
  guestNumber,
  guestEmail,
  paymentMethod,
  hotelName,
  hotelAddress,
  roomType,
  adult,
  child,
  bookingStatus,
  hotelRating,
  bookingId,
  roomPrice,
  taxes,
  bookingStatusNum,
  refComp,
  lat,
  lng,
}: RoomConfirmationCardProps): ReactElement => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [currentLoc, setcurrentLoc] = useState({
    lat,
    lng,
  });
  const [isCancled, setIsCancled] = React.useState(false);

  const { pathname } = useLocation();

  const success = () => {
    message.success(`${t('globle.bookingConfirmMsg')} ${guestEmail}`);
  };

  const dispatch = useDispatch();
  let totalTax = 0;
  const totalHourPrice = roomPrice;

  useEffect(() => {
    if (guestEmail) {
      if (!pathname.includes('/room-booking')) {
        success();
      }
    }
  }, [pathname, guestEmail]);

  useEffect(() => {
    if (isCancled) {
      message.success(`${t('globle.bookingCancelMsg')}`);
    }
  }, [isCancled]);

  const onSuccess = () => {
    if (!pathname.includes('booking')) {
      history.push('/room-booking');
    } else window.location.reload();
  };

  const cancelBooking = () => {
    if (bookingId) {
      dispatch(cancelRoomBookingsById({ id: bookingId, onSuccess }));
      setIsCancled(true);
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const modalTitle = pathname.includes('booking')
    ? t('confirm.bookingDetails')
    : bookingStatusNum === 10
    ? `${t('confirm.confirmBooking')} !`
    : `${t('confirm.bookingDetails')}`;

  const handlePrint = useReactToPrint({
    content: () => refComp.current,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setcurrentLoc({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
  }, []);

  const getDirectionOnClick = () => {
    const url = `https://www.google.com/maps/dir/${currentLoc.lat},${currentLoc.lng}/${lat},${lng}`;
    window.open(url);
  };

  return (
    <div className="room-confirmation-container">
      <Card title={modalTitle} className="room-confirmation-card">
        <Row gutter={[16, 0]}>
          <Col xs={24} lg={15} className="left-sec">
            <Row gutter={[16, 16]} justify="space-between">
              <Col lg={4}>
                <InlineText primaryText={t('confirm.bookingNum')} secondaryText={bookingNum} />
              </Col>
              <Divider type="vertical" className="inline-divider" />
              <Col lg={4}>
                <InlineText
                  primaryText={t('confirm.checkIn')}
                  secondaryText={moment(checkInDate).format('MMM, d, YYYY')}
                  secondarySubText={moment(checkInTime, 'HH:mm:ss').format('LT')}
                />
              </Col>
              <Divider type="vertical" className="inline-divider" />
              <Col lg={4}>
                <InlineText
                  primaryText={t('confirm.checkOut')}
                  secondaryText={moment(checkOutDate).format('MMM, d, YYYY')}
                  secondarySubText={moment(checkOutTime, 'HH:mm:ss').format('LT')}
                />
              </Col>
              <Divider type="vertical" className="inline-divider" />
              <Col lg={4}>
                <InlineText primaryText={t('globle.totalStay')} secondaryText={`${stayTime} Hrs`} />
              </Col>
              <Divider type="vertical" className="inline-divider" />
              <Col lg={4}>
                <InlineText primaryText={t('confirm.status')} secondaryText={bookingStatus} />
              </Col>
            </Row>

            <Divider className="divider" />

            <Row gutter={[16, 8]}>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.name')}
                  secondaryText={guestName}
                  isMedium={false}
                />
              </Col>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.mobile')}
                  secondaryText={guestNumber}
                  isMedium={false}
                />
              </Col>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.email')}
                  secondaryText={guestEmail}
                  isMedium={false}
                />
              </Col>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.payment')}
                  secondaryText={paymentMethod}
                  isMedium={false}
                />
              </Col>
            </Row>
          </Col>
          <Divider type="vertical" style={{ height: 'auto' }} />
          <Col xs={24} lg={8} className="right-sec">
            <div className="bookingMap">
              <HotelMap lat={lat} lng={lng} />
              <Button onClick={getDirectionOnClick}>{t('auth.getDirection')} </Button>
            </div>
            <h1 className="title-name">{hotelName}</h1>
            <Space align="center" size="middle">
              <p className="star-count">{hotelRating}</p>
              <StarFilled className="start" />
              <Divider type="vertical" className="title-divider" />
              <p className="light-text">{hotelAddress}</p>
            </Space>
            <Divider className="divider" />
            <Row gutter={[16, 8]}>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.roomType')}
                  secondaryText={roomType}
                  isMedium={false}
                />
              </Col>
              <Col xs={24}>
                <InlineText
                  primaryText={t('globle.guests')}
                  secondaryText={`${adult} ${t('globle.adult')} ${child} ${t('globle.child')}`}
                  isMedium={false}
                />
              </Col>
            </Row>
            <Divider className="divider" />
            <Col xs={24}>
              <p>{t('globle.forMainGuest')}</p>
            </Col>
            <Divider className="divider" />

            <p className="dark-text">{t('globle.policies')}</p>
            <Row gutter={[16, 4]}>
              <Col lg={24}>
                <p className="light-text">{t('globle.cancelation')}</p>
              </Col>
              <Col lg={24}>
                <p className="light-text">{t('confirm.checkIn')}</p>
              </Col>
              <Col lg={24}>
                <p className="light-text">{t('confirm.checkOut')}</p>
              </Col>
            </Row>

            <div className="total-section">
              <div className="inlinePrice">
                <p className="title">{t('globle.subTotal')}</p>
                <p className="price">
                  {totalHourPrice.toFixed(2)} &nbsp; {t('globle.sar')}
                </p>
              </div>
              {taxes?.map((tax) => {
                const totalPrice = totalHourPrice;
                const taxPrice = (tax.percentage / 100) * totalPrice;
                totalTax += taxPrice;
                return (
                  <div className="inlinePrice" key={tax.id}>
                    <p className="title">{i18n.language !== 'en' ? tax.ar_name : tax.name}</p>
                    <p className="price">
                      <small>({tax.percentage}%)</small> &nbsp; {taxPrice.toFixed(2)} &nbsp;{' '}
                      {t('globle.sar')}
                    </p>
                  </div>
                );
              })}

              <Divider className="divider" />

              <div className="inlinePrice">
                <h1 className="total-title">{t('globle.total')}</h1>
                <h1 className="total-price">
                  {(totalTax + Number(totalHourPrice)).toFixed(2)} &nbsp;
                  {t('globle.sar')}
                </h1>
              </div>
            </div>

            {/* <HellooPrint ref={componentRef} /> */}

            <div className="btn-action">
              {bookingStatus === 'Canceled' ? (
                <div />
              ) : (
                <Button type="primary" className="cancel-btn" onClick={cancelBooking}>
                  {t('globle.cancel')}
                </Button>
              )}

              <Button type="primary" className="print-btn" onClick={handlePrint}>
                {t('globle.print')}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

RoomConfirmationCard.defaultProps = {
  bookingNum: '',
  checkInDate: '',
  checkInTime: '',
  checkOutDate: '',
  checkOutTime: '',
  stayTime: null,
  guestName: '',
  guestNumber: '',
  guestEmail: '',
  paymentMethod: '',
  hotelName: '',
  hotelAddress: '',
  roomType: '',
  adult: null,
  child: null,
  hotelRating: null,
  bookingStatus: '',
  bookingId: null,
  refComp: null,
  lat: null,
  lng: null,
};

export default RoomConfirmationCard;
