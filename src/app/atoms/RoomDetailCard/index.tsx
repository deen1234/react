/* eslint-disable @typescript-eslint/no-unused-vars */
import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.less';
import moment from 'moment';

interface RoomDetailCardProps {
  displayImg: string;
  title: string;
  rateCount: string;
  tagName: string;
  roomType: string;
  noOfGuest: number;
  price: number;
  slot_time: number;
  minimum_stay: number;
  price_per_hour: number;
  locationState: any;
  routeTo: string;
  taxes: any;
  check_out: string;
  room_booked: string;
  total_room_count: number;
}

const RoomDetailCard: React.FC<RoomDetailCardProps> = ({
  displayImg,
  title,
  rateCount,
  tagName,
  roomType,
  noOfGuest,
  price,
  slot_time,
  minimum_stay,
  price_per_hour,
  locationState,
  routeTo,
  taxes,
  check_out,
  room_booked,
  total_room_count,
}: RoomDetailCardProps) => {
  const { t } = useTranslation();

  const [priceSlot, setPriceSlot] = useState<number[]>();
  const { adult, child, city, date, room_count, time } = locationState || '';

  const checkoutTime = moment(check_out, 'HH').format('HH');

  const currentTime = moment(time, 'HH').format('HH');

  const timeDiff = moment
    .utc(moment(checkoutTime, 'HH:mm').diff(moment(currentTime, 'HH:mm')))
    .format('HH');

  const history = useHistory();
  const priceSlotHanlder = () => {
    const slots = [];
    for (let i = minimum_stay; i <= parseInt(timeDiff, 10); i += minimum_stay) {
      slots.push(i);
    }
    setPriceSlot(slots);
    return slots;
  };

  useEffect(() => {
    priceSlotHanlder();
  }, [timeDiff]);

  let grandTotal = 0;

  taxes?.map((tax: { percentage: any }) => {
    const taxPrice = (tax.percentage / 100) * price_per_hour;
    grandTotal += taxPrice;
    return grandTotal;
  });

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
              <p className="dark-text">{roomType}</p>
              <Divider className="divider" type="vertical" />
              <p className="dark-text">
                {noOfGuest} <UserOutlined />
              </p>
            </div>
          </div>
          <div className="price-sec">
            <h1 className="price">
              <s>{`${price} ${t('globle.sar')}`}</s>
            </h1>
            <p className="minuts">
              {t('room.priceFor')} 1 {t('room.night')}
            </p>
          </div>
        </div>
        <div className="time-solot-btn-sec">
          <p className="available-text">{t('globle.chooseHourly')}</p>
          <Row gutter={[16, 16]}>
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
                          room_count,
                          city,
                          date,
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
                    {t('globle.sar')} {price_per_hour * item + grandTotal * item}
                  </Button>
                </Col>
              );
            })}
          </Row>
          <p className="available-text no-bp">{t('globle.inclusiveTax')}</p>
        </div>
      </div>
    </Card>
  );
};

export default RoomDetailCard;
