import { StarFilled } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './style.less';

interface FacilityDetailCardProps {
  displayImg: string;
  title: string;
  rateCount: string;
  tagName: string;
  facilityType: string;
  facilityName: string;
  numberOfGuest: number;
  numberOfMinuts: number;
  price: number;
  locationState: any;
  routeTo: string;
  total_hours: number;
  reservation_period: number;
  taxes: any;
  check_out: string;
}

const FacilityDetailCard: React.FC<FacilityDetailCardProps> = ({
  displayImg,
  title,
  rateCount,
  tagName,
  facilityType,
  facilityName,
  numberOfGuest,
  numberOfMinuts,
  price,
  locationState,
  routeTo,
  total_hours,
  reservation_period,
  taxes,
  check_out,
}: FacilityDetailCardProps) => {
  const { t } = useTranslation();

  const [reservationSlots, setReservationSlots] = useState<number[]>();

  const { adult, child, city, date, facility_type, time } = locationState || '';

  // const totalHours = total_hours / 60;
  // const reservationPeriod = reservation_period / 60;
  const checkoutTime = moment(check_out, 'mm').format('mm');

  const currentTime = moment(time, 'mm').format('mm');

  // const totalTime = Math.trunc(totalHours / reservationPeriod);
  const timeDiff = moment
    .utc(moment(checkoutTime, 'HH:mm').diff(moment(currentTime, 'HH:mm')))
    .format('HH');
  const timeDiffinMin = parseInt(timeDiff, 10) * 60;

  const numOfSlots = timeDiffinMin / reservation_period;

  const timeSlotHanlder = () => {
    const slots = [];
    for (let i = 1; i <= numOfSlots; i += 1) {
      slots.push(i * reservation_period);
    }
    setReservationSlots(slots);
    return slots;
  };

  useEffect(() => {
    timeSlotHanlder();
  }, []);

  let grandTotal = 0;

  taxes?.map((tax: { percentage: any }) => {
    const taxPrice = (tax.percentage / 100) * price;
    grandTotal += taxPrice;
    return grandTotal;
  });

  const history = useHistory();
  return (
    <Card className="detail-card-container">
      <div className="left-sec">
        <img src={displayImg} alt="side img" className="side-img" />
      </div>
      <div className="right-sec">
        <div className="top-sec">
          <div className="content-sec">
            <h1 className="title" title={title}>
              {title}
            </h1>
            <div className="inline-sec">
              <div className="rating-sec">
                <StarFilled className="star-icon" /> &nbsp; <p className="dark-text">{rateCount}</p>
              </div>
              <Divider className="divider" type="vertical" />
              <Tag className="hotel-tag">{tagName}</Tag>
            </div>
            <div className="inline-sec">
              <p className="dark-text">{facilityType}</p>
              <Divider className="divider" type="vertical" />
              <p className="dark-text">{facilityName}</p>
            </div>
            <div className="inline-sec">
              <p className="light-text">{`${numberOfGuest} ${t('globle.guests')}`}</p>
              <Divider className="divider" type="vertical" />
              <p className="light-text">
                {numberOfMinuts} {t('globle.min')}
              </p>
            </div>
          </div>
        </div>
        <div className="time-solot-btn-sec">
          <p className="available-text">{t('globle.chooseHourly')}</p>
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
                    {t('globle.sar')} {key * price + grandTotal * key}
                  </Button>
                </Col>
              );
            })}
          </Row>
          <p className="available-text no-bp">{t('globle.inclusiveTax')}</p>
        </div>
        {/* <div className="btn-sec">
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
            {t('globle.select')}
          </Button>
        </div> */}
      </div>
    </Card>
  );
};

export default FacilityDetailCard;
