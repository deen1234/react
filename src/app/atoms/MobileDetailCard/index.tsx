/* eslint-disable no-debugger */
import { StarFilled } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import React, { ReactElement, useEffect, useState } from 'react';
import './style.less';
import moment from 'moment';

interface MobileDetailCardProps {
  displayImg: string;
  title: string;
  rateCount: string;
  tagName: string;
  facilityType?: string;
  facilityName?: string;
  numberOfGuest?: number;
  numberOfMinuts?: number;
  price: number;
  roomType?: string;
  noOfGuest?: number;
  slot_time?: number;
  minimum_stay?: number;
  locationState: any;
  routeTo: string;
  taxes: any;
  price_per_hour?: number;
  total_hours?: number;
  reservation_period?: number;
  room_booked?: string;
  total_room_count?: number;
  check_out?: string;
}

const MobileDetailCard = ({
  displayImg,
  title,
  rateCount,
  tagName,
  facilityType,
  facilityName,
  numberOfGuest,
  numberOfMinuts,
  price,
  roomType,
  noOfGuest,
  slot_time,
  minimum_stay,
  locationState,
  routeTo,
  taxes,
  price_per_hour,
  total_hours,
  reservation_period,
  room_booked,
  total_room_count,
  check_out,
}: MobileDetailCardProps): ReactElement => {
  const { pathname } = useLocation();
  const history = useHistory();

  const { t } = useTranslation();

  const [priceSlot, setPriceSlot] = useState<number[]>();

  const [reservationSlots, setReservationSlots] = useState<number[]>();

  const { adult, child, city, date, time, facility_type, room_count } = locationState || '';
  // const totalHours = (total_hours || 0) / 60;
  // const reservationPeriod = (reservation_period || 0) / 60;

  // const totalTime = Math.trunc(totalHours / reservationPeriod);

  // eslint-disable-next-line consistent-return
  const timeSlotHanlder = () => {
    const checkoutTimeinMin = moment(check_out, 'HH:mm:ss').format('HH');
    const currentTimeInMin = time ? moment(time, 'HH:mm').format('HH') : '';
    const timeDiffFacility = moment
      .utc(moment(checkoutTimeinMin, 'HH').diff(moment(currentTimeInMin, 'HH')))
      .format('HH');
    const timeDiffinMin = parseInt(timeDiffFacility, 10) * 60;
    const reservePeriod = reservation_period || 0;
    const numOfSlots = reservePeriod > 0 ? timeDiffinMin / reservePeriod : 0;

    const slots = [];
    for (let i = 1; i <= numOfSlots; i += 1) {
      slots.push(i * reservePeriod);
    }
    setReservationSlots(slots);
  };

  useEffect(() => {
    timeSlotHanlder();
  }, []);

  const priceSlotHanlder = () => {
    const checkoutTime = moment(check_out, 'HH').format('HH');
    const currentTime = moment(time, 'HH').format('HH');
    const timeDiff = moment
      .utc(moment(checkoutTime, 'HH:mm').diff(moment(currentTime, 'HH:mm')))
      .format('HH');

    const slots = [];
    for (let i = minimum_stay || 0; i <= parseInt(timeDiff, 10); i += 3) {
      slots.push(i);
    }
    setPriceSlot(slots);
  };

  useEffect(() => {
    priceSlotHanlder();
  }, []);

  let facilityTotal = 0;
  let grandTotal = 0;

  taxes?.forEach((tax: { percentage: any }) => {
    const taxPrice = (tax.percentage / 100) * price;
    facilityTotal += taxPrice;
  });
  taxes?.forEach((tax: { percentage: any }) => {
    const taxPrice = (tax.percentage / 100) * (price_per_hour || 0);
    grandTotal += taxPrice;
  });

  return (
    <Card className="mobile-detail-card-container">
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={8}>
          <img src={displayImg} alt="img" className="card-img" />
        </Col>
        <Col xs={12} sm={16}>
          <Row gutter={[16, 2]} align="middle">
            <Col sm={24}>
              <h1 className="title">{title}</h1>
            </Col>
            <Col sm={24} className="inline-sec">
              <div className="rating-sec">
                <StarFilled className="star-icon" /> &nbsp;
                <p className="rating-text">{rateCount}</p>
              </div>
              <Divider className="divider" type="vertical" />
              <Tag className="hotel-tag">{tagName}</Tag>
            </Col>
            <Col xs={0} sm={24}>
              <div className="inline-sec">
                {pathname.includes('/home-room') ? <p>{facilityType}</p> : <p>{roomType}</p>}
                <Divider className="divider" type="vertical" />
                {pathname.includes('/home-room') ? <p>{facilityName}</p> : <p>{noOfGuest}</p>}
              </div>
            </Col>
            <Col xs={24} sm={0}>
              {pathname.includes('/home-facility') ? <p>{facilityType}</p> : <p>{roomType}</p>}
            </Col>
            <Col xs={24} sm={0}>
              {pathname.includes('/home-facility') ? <p>{facilityName}</p> : <p>{noOfGuest}</p>}
            </Col>
            {pathname.includes('/home-room') && (
              <Col xs={24} sm={18}>
                <p className="dark-text">{`${numberOfGuest} ${t(
                  'globle.guests',
                )} per reservation`}</p>
              </Col>
            )}

            {pathname.includes('/home-room') && (
              <Col xs={24} sm={6}>
                <p className="dark-text">Duration</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Divider className="card-divider" />
      {pathname.includes('/home-facility') && (
        <Row gutter={[16, 16]} className="inline-box">
          {reservationSlots?.map((item, index) => {
            const key = index + 1;
            return (
              <Col lg={4} key={key}>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() =>
                    history.push(
                      {
                        pathname: routeTo,
                      },
                      {
                        adult,
                        child,
                        city,
                        date,
                        facility_type,
                        time,
                        timeSlot: item,
                      },
                    )
                  }
                >
                  {Math.trunc(item / 60) <= 1
                    ? `${Math.trunc(item / 60)}Hr`
                    : `${Math.trunc(item / 60)}Hrs`}{' '}
                  {Math.trunc(item % 60) === 0 ? '' : `${Math.trunc(item % 60)}Mins`}
                  <br />
                  {t('globle.sar')} {key * price + facilityTotal * key}
                </Button>
              </Col>
            );
          })}
        </Row>
      )}
      {/* <Row justify="end" align="middle" gutter={[16, 16]}>
        <Col xs={10} sm={8}>
          <p className="price-text">{`${price} ${t('globle.sar')}`}</p>
          {pathname.includes('/home-facility') ? (
            <p className="mint-text">
              {t('room.priceFor')} {numberOfMinuts} {t('globle.min')}
            </p>
          ) : (
            <p className="mint-text">
              {t('room.priceFor')} 1 {t('room.night')}
            </p>
          )}
        </Col>
        {pathname.includes('/home-facility') && (
          <Col xs={10} sm={8}>
            <Button
              type="primary"
              className="select-btn"
              onClick={() =>
                history.push(
                  {
                    pathname: routeTo,
                  },
                  {
                    adult,
                    child,
                    city,
                    date,
                    facility_type,
                    time,
                  },
                )
              }
            >
              {t('globle.select')}
            </Button>
          </Col>
        )}
      </Row> */}
      {pathname.includes('/home-room') && (
        <>
          <p className="available-text">{t('globle.chooseHourly')}</p>
          <Row gutter={[4, 4]} className="inline-box">
            {priceSlot?.map((item, index) => {
              const key = index + 1;
              return (
                <Col lg={4} key={key}>
                  <Button
                    type="primary"
                    className="primary-btn"
                    onClick={() =>
                      history.push(
                        {
                          pathname: routeTo,
                        },
                        {
                          adult,
                          child,
                          city,
                          date,
                          room_count,
                          time,
                          timeSlot: item,
                          room_booked,
                          total_room_count,
                        },
                      )
                    }
                  >
                    {item} Hrs
                    <br />
                    {t('globle.sar')} {(price_per_hour || 0) * item + grandTotal * item}
                  </Button>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Card>
  );
};

MobileDetailCard.defaultProps = {
  numberOfGuest: '',
  numberOfMinuts: '',
  roomType: '',
  noOfGuest: '',
  facilityType: '',
  facilityName: '',
  slot_time: 0,
  minimum_stay: 0,
  price_per_hour: 0,
  total_hours: 0,
  reservation_period: 0,
  room_booked: '',
  total_room_count: 0,
  check_out: '',
};

export default MobileDetailCard;
