/* eslint-disable no-debugger */
import {
  Button,
  Checkbox,
  Col,
  Divider,
  notification,
  Radio,
  Row,
  Skeleton,
  Space,
  Spin,
} from 'antd';
import DetailPageHeader from 'app/atoms/DetailPageHeader';
import HeadingText from 'app/atoms/HeadingText';
import AddOnField from 'app/atoms/AddOnField';
import React, { ReactElement, useEffect, useState } from 'react';
import './style.less';
import { UserAddOutlined } from '@ant-design/icons';
import CheckboxGroup from 'app/atoms/CheckboxGroup';
import DatePickerField from 'app/atoms/DatePickerField';
import TimePickerField from 'app/atoms/TimePickerField';
import RadiobuttonGroup from 'app/atoms/RadiobuttonGroup';
import AddOnCounterField from 'app/atoms/AddOnCounterField';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HotelTaxData, RoomData } from 'app/modules/Rooms/ducks/types';
import { getTranslated } from 'utils/functions';
import { bookedRoom } from 'app/modules/Rooms/ducks/services';
import { useDispatch, useSelector } from 'react-redux';
import { ListType } from 'configs/list';
import { Id } from 'app/modules/Config/ducks/types';
import moment from 'moment';
import styled from 'styled-components';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
import HotelMap from 'app/atoms/HotelMap';
import { isRegister } from 'app/modules/Auth/ducks/services';
import { RootState } from 'store/rootState';
// import { RootState } from 'store/rootState';

interface RoomDetailsProps {
  roomDetails: RoomData | null;
  taxes: HotelTaxData[] | null;
}

const RoomDetails = ({ roomDetails, taxes }: RoomDetailsProps): ReactElement => {
  const [adultCouter, setAdultCouter] = useState(1);
  const [childCouter, setChildCouter] = useState(0);
  const [roomCouter, setRoomCouter] = useState(1);
  const [checkInDate, setCheckInDate] = useState<moment.Moment>();
  const [checkInTime, setCheckInTime] = useState<moment.Moment>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [termsAgree, setTermsAgree] = useState([]);
  const [registerFieldError, setRegisterFieldError] = useState(false);

  const [priceSlot, setPriceSlot] = useState<number[]>([]);
  const [timeOptions, setTimeOptions] = useState<ListType[]>([]);

  const [errorCheckInDate, setErrorCheckInDate] = useState(false);
  const [errorCheckInTime, setErrorCheckInTime] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const { profileData, isLogged } = useSelector(({ auth }: RootState) => auth);

  const [isRegistered, setIsRegistered] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const dateHandler = (date: moment.Moment) => {
    setCheckInDate(date);
  };
  const timeHandler = (time: moment.Moment) => {
    setCheckInTime(time);
  };
  const { t, i18n } = useTranslation();

  const { id } = useParams<Id>();

  const { state, pathname } = useLocation();

  const { date, time, adult, child, room_count, timeSlot, room_booked, total_room_count } =
    state || {};

  useEffect(() => {
    const count = total_room_count - room_booked;

    if (count === roomCouter) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [total_room_count, room_booked, roomCouter]);

  const priceSlotHanlder = () => {
    const slots = [];
    for (let i = roomDetails?.minimum_stay || 0; i <= (roomDetails?.slot_time || 0); i += 3) {
      slots.push(i);
    }
    return slots;
  };

  const transfromArray = (data: number[]) => {
    return (data || []).map((item: any) => {
      return { value: item, label: `${item}Hrs` };
    });
  };

  useEffect(() => {
    if (isLogged === true) {
      setName(profileData?.name);
      setEmail(profileData?.email);
      setNumber(profileData?.details?.phone);
    }
  }, [profileData]);

  useEffect(() => {
    const priceArray = priceSlotHanlder();
    setPriceSlot(priceArray);
  }, [roomDetails?.minimum_stay, roomDetails?.slot_time]);

  useEffect(() => {
    if (priceSlot?.length > 0) {
      const slotOptions = transfromArray(priceSlot || []);
      setTimeOptions(slotOptions);
    }
  }, [priceSlot]);

  useEffect(() => {
    if (timeSlot) {
      setSelectedTime(timeSlot);
    }
    if (adult) {
      setAdultCouter(adult);
    }
    if (child) {
      setChildCouter(child);
    }
    if (room_count) {
      setRoomCouter(room_count);
    }
    if (date) {
      setCheckInDate(moment(date));
    }
    if (time) {
      setCheckInTime(moment(time, 'HH:00'));
    }
  }, [pathname]);

  const bookingDetailPage = (data: any) => {
    history.push(
      {
        pathname: '/room-confirmation',
      },
      {
        id: data?.id,
      },
    );
  };

  let grandTotal = 0;
  const totalHourPrice = (roomDetails?.price_per_hour || 0) * selectedTime * roomCouter;

  const bookingHandler = () => {
    dispatch(
      bookedRoom({
        body: {
          room_availability_id: parseInt(id, 10),
          total_rooms: roomCouter,
          date: checkInDate?.format('YYYY-MM-DD'),
          check_in: moment(checkInTime).format('HH:00'),
          adult: adultCouter,
          child: childCouter,
          slot_time: selectedTime,
          customer_name: name,
          customer_email: email,
          customer_phone: number,
          user_id: profileData?.id,
        },
        onSuccess: bookingDetailPage,
      }),
    );
  };

  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );
  // const regEx = /^[A-Za-z]+$/;
  const regEx = /[^0-9]/g;

  const fieldLengthCheck = () => {
    if (!name?.match(regEx)) {
      setErrorName(true);
    } else if (number.length < 3) {
      setErrorNumber(true);
    } else if (!pattern.test(email)) {
      setErrorEmail(true);
    } else if (!checkInTime?.format().length) {
      setErrorCheckInTime(true);
    } else if (!checkInDate?.format().length) {
      setErrorCheckInDate(true);
    } else bookingHandler();
  };

  const redisterFieldLengthCheck = () => {
    if (!name.match(regEx) || !number.length || !pattern.test(email)) {
      setRegisterFieldError(true);
    } else {
      setRegisterFieldError(false);
    }
  };

  useEffect(() => {
    if (!isLogged === true) {
      redisterFieldLengthCheck();
    }
  }, [registerFieldError, name, email, number]);

  useEffect(() => {
    const roomCount = Math.ceil(adultCouter / 3);
    setRoomCouter(roomCount);
  }, [adultCouter]);

  useEffect(() => {
    const count = total_room_count - room_booked;
    const roomCount = Math.ceil(adultCouter / 3);

    if (count === roomCouter) {
      setBtnDisable(true);
    } else if (roomCouter < roomCount) {
      setRoomCouter(roomCount);
    }
  }, [roomCouter]);

  const token = localStorage.getItem('token');

  const accountHandler = (e: any) => {
    setIsRegistered(true);

    if (e.target.checked) {
      dispatch(
        isRegister({ email, name, phone: number, device_type: 'web', onSuccess: getResponse }),
      );
    }
  };

  const getResponse = (res: any) => {
    setIsRegistered(false);
    localStorage.setItem('token', res?.data?.user?.access_token);
    if (res?.success === true) {
      notification.open({
        message: res.message,
      });
    }
  };

  return (
    <Row gutter={[48, 24]} className="room-detail-container">
      <Col xs={24} lg={14} xl={15}>
        <DetailPageHeader
          hotelTitle={getTranslated('hotel_name', roomDetails)}
          hotelAddress={getTranslated('hotel_address', roomDetails)}
          rateCount={roomDetails?.hotel_rating}
        />
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <HeadingText title={t('globle.about')} isSmall>
              <p className="detail-text">{getTranslated('description', roomDetails?.hotel)}</p>
            </HeadingText>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <HeadingText title={t('room.roomDetail')}>
              <ul className="list-section">
                {roomDetails?.room?.services.map((service) => (
                  <li key={service.id}>{service.service_name}</li>
                ))}
              </ul>
            </HeadingText>
          </Col>
          <Col lg={12}>
            <HeadingText title={t('room.roomPicture')}>
              <Row gutter={[16, 16]} className="side-border">
                {roomDetails?.room?.pictures?.map((picture) => (
                  <Col xs={12} lg={12} key={picture.id} className="room-picture-box">
                    <img src={picture.image_url} alt="room img" className="room-picture" />
                  </Col>
                ))}
              </Row>
            </HeadingText>
          </Col>
        </Row>

        <Divider className="divider" />

        <HotelMap />
      </Col>
      <Col xs={24} lg={10} xl={9}>
        <Spin spinning={isRegistered}>
          <div className="detail-card">
            {!roomDetails?.room?.room_type ? (
              <>
                <Skeleton.Button size="large" block active />
              </>
            ) : (
              <h1 className="main-heading">
                {`${getTranslated('name', roomDetails?.room?.room_type)}`}
              </h1>
            )}

            <p className="guest-number">
              {t('globle.numOfGuest')} <b>{roomDetails?.room?.no_of_guest}</b>
            </p>
            <Row gutter={[4, 48]}>
              <Col xs={12} sm={12} lg={12}>
                <label>{t('globle.date')}</label>
                <DatePickerField
                  value={checkInDate}
                  placeholder={t('globle.date')}
                  onChange={dateHandler}
                  error={errorCheckInDate}
                  disabled
                />
              </Col>
              <Col xs={12} sm={12} lg={12}>
                <label>{t('confirm.checkIn')}</label>
                <TimePickerField
                  value={checkInTime}
                  placeholder={t('confirm.checkIn')}
                  onChange={timeHandler}
                  error={errorCheckInTime}
                  disabled
                />
              </Col>
            </Row>
            <RadiobuttonGroup
              value={selectedTime}
              options={timeOptions}
              onChange={(e) => setSelectedTime(e.target.value)}
            />

            <Divider className="divider" />
            <Row gutter={[4, 16]}>
              <Col xs={24}>
                <AddOnField
                  placeholder={t('globle.name')}
                  value={name}
                  name={name}
                  onChange={(e) => setName(e.target.value)}
                  addonBefore={<UserAddOutlined />}
                  error={errorName}
                />
              </Col>
              <Col xs={24} className="phone-col">
                <div className={errorNumber ? 'error-field  phone-filed' : 'phone-filed'}>
                  <div className="side-box">{t('globle.mobile')}</div>
                  <PhoneInput
                    country="sa"
                    value={number}
                    onChange={(e) => setNumber(e)}
                    masks={{ sa: '(...) ...-...-...' }}
                    placeholder="(...) ...-...-..."
                  />
                </div>
              </Col>
              {/* <Col xs={24}>
              <AddOnField
                placeholder="+966 591767560"
                value={number}
                name={number}
                onChange={(e) => setNumber(e.target.value)}
                addonBefore={<p>{t('globle.mobile')}</p>}
                error={errorNumber}
                maxLength={10}
              />
            </Col> */}
              <Col xs={24}>
                <AddOnField
                  type="email"
                  placeholder={t('globle.email')}
                  value={email}
                  name={email}
                  onChange={(e) => setEmail(e.target.value)}
                  addonBefore={<p>{t('globle.email')}</p>}
                  error={errorEmail}
                />
              </Col>
            </Row>
            <Divider className="divider" />

            <RadioHeading>{t('globle.bookingFor')}</RadioHeading>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={1}>{t('globle.forMainGuest')}</Radio>
                <Radio value={2}>{t('globle.forSomeone')}</Radio>
              </Space>
            </Radio.Group>

            {!token?.length ? (
              <>
                <Divider className="divider" />
                <Checkbox onChange={accountHandler} disabled={registerFieldError}>
                  Create an account
                </Checkbox>
              </>
            ) : (
              ''
            )}

            <Divider className="divider" />
            <AddOnCounterField
              title={t('globle.adult')}
              value={adultCouter}
              onIncrement={() => setAdultCouter((prevAdult: any) => prevAdult + 1)}
              onDecremenet={() =>
                adultCouter > 1 && setAdultCouter((prevAdult: any) => prevAdult - 1)
              }
              disabled={btnDisable}
            />
            <AddOnCounterField
              title={t('globle.child')}
              value={childCouter}
              onIncrement={() =>
                childCouter < 4 && setChildCouter((prevAdult: any) => prevAdult + 1)
              }
              onDecremenet={() =>
                childCouter > 0 && setChildCouter((prevAdult: any) => prevAdult - 1)
              }
            />
            <LightText>{t('filter.childDetails')}</LightText>

            <AddOnCounterField
              title={t('globle.room')}
              value={roomCouter}
              onIncrement={() => setRoomCouter((prevRoom: any) => prevRoom + 1)}
              onDecremenet={() => roomCouter > 1 && setRoomCouter((prevRoom: any) => prevRoom - 1)}
              disabled={btnDisable}
            />
            <Divider className="divider" />
            <div className="total-section">
              <div className="inlinePrice">
                <p className="title">{t('globle.subTotal')}</p>
                <p className="price">
                  {totalHourPrice.toFixed(2)} &nbsp; {t('globle.sar')}
                </p>
              </div>
              {taxes?.map((tax) => {
                const totalPrice = Number(totalHourPrice.toFixed(2));
                const taxPrice = (tax.percentage / 100) * totalPrice;
                grandTotal += taxPrice;
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
                  {(grandTotal + Number(totalHourPrice)).toFixed(2)} &nbsp;
                  {t('globle.sar')}
                </h1>
              </div>
            </div>
            <CheckboxGroup
              value={termsAgree}
              options={[`${t('globle.agrementAgree')}`]}
              onChange={(e: any) => setTermsAgree(e)}
            />
            <div className="btn-sec">
              <Button
                className="continue-btn"
                type="primary"
                disabled={!termsAgree.length}
                // onClick={bookingHandler}
                onClick={fieldLengthCheck}
              >
                {t('globle.confirm')}
              </Button>
            </div>
          </div>
        </Spin>
      </Col>
      <Col lg={24}>
        <Divider className="divider" />
      </Col>
    </Row>
  );
};

export default RoomDetails;

const LightText = styled.p`
  font-size: 0.7rem;
  color: #808080d9;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;
const RadioHeading = styled.h1`
  color: #707070;
  margin-bottom: 0.5rem;
`;
