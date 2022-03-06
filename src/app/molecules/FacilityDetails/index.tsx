/* eslint-disable import/named */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
import { UserAddOutlined } from '@ant-design/icons';
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
  Typography,
} from 'antd';
import AddOnField from 'app/atoms/AddOnField';
import CheckboxGroup from 'app/atoms/CheckboxGroup';
import DatePickerField from 'app/atoms/DatePickerField';
import DetailPageHeader from 'app/atoms/DetailPageHeader';
import HeadingText from 'app/atoms/HeadingText';
import TimePickerField from 'app/atoms/TimePickerField';
import AddOnCounterField from 'app/atoms/AddOnCounterField';
import { useTranslation } from 'react-i18next';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import './style.less';
import { FacilityData } from 'app/modules/Facilities/ducks/types';
import { getTranslated } from 'utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { bookedFacility } from 'app/modules/Facilities/ducks/services';
import { Id } from 'app/modules/Config/ducks/types';
import { HotelTaxData } from 'app/modules/Rooms/ducks/types';
import moment from 'moment';
import RadiobuttonGroup from 'app/atoms/RadiobuttonGroup';
import { ListType } from 'configs/list';
import styled from 'styled-components';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
import HotelMap from 'app/atoms/HotelMap';
import { RootState } from 'store/rootState';
import { isRegister, profile } from 'app/modules/Auth/ducks/services';

interface FacilityDetailssProps {
  facilityDetails: FacilityData | null;
  taxes: HotelTaxData[] | null;
}

const { Title } = Typography;

const FacilityDetails = ({ facilityDetails, taxes }: FacilityDetailssProps): ReactElement => {
  const [adultCouter, setAdultCouter] = useState(1);
  const [childCouter, setChildCouter] = useState(0);
  const [checkInDate, setCheckInDate] = useState<moment.Moment>();
  const [checkInTime, setCheckInTime] = useState<moment.Moment>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [termsAgree, setTermsAgree] = useState([]);

  const [errorCheckInDate, setErrorCheckInDate] = useState(false);
  const [errorCheckInTime, setErrorCheckInTime] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);

  const [registerFieldError, setRegisterFieldError] = useState(false);

  const [selectedTime, setSelectedTime] = useState<number>(0);

  const [priceSlot, setPriceSlot] = useState<number[]>([]);
  const [timeOptions, setTimeOptions] = useState<ListType[]>([]);

  const [isBooked, setIsBooked] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const { profileData, isLogged } = useSelector(({ auth }: RootState) => auth);

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const count = adultCouter + childCouter;
    if (facilityDetails?.capacity_per_period === count) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [facilityDetails?.capacity_per_period, adultCouter, childCouter]);

  const dispatch = useDispatch();

  const dateHandler = (date: moment.Moment) => {
    setCheckInDate(date);
  };
  const timeHandler = (time: moment.Moment) => {
    setCheckInTime(time);
  };
  const history = useHistory();
  const { id } = useParams<Id>();

  const { t, i18n } = useTranslation();

  const { state, pathname } = useLocation();

  const { adult, child, date, time, timeSlot } = state || {};

  const totalHours = (facilityDetails?.total_hours || 0) / 60;
  const reservationPeriod = (facilityDetails?.reservation_period || 0) / 60;

  const totalTime = Math.trunc(totalHours / reservationPeriod);

  const timeSlotHanlder = () => {
    const slots = [];
    for (let i = 1; i <= totalTime; i += 1) {
      slots.push(i * (facilityDetails?.reservation_period || 0));
    }
    return slots;
  };

  const transfromArray = (data: number[]) => {
    return (data || []).map((item: any) => {
      // return { value: item, label: `${Math.floor(item / 60)}Hrs ${Math.floor(item % 60)}Mint` };
      return {
        value: item,
        label: `${
          Math.trunc(item / 60) <= 1 ? `${Math.trunc(item / 60)}Hr` : `${Math.trunc(item / 60)}Hrs`
        } ${Math.trunc(item % 60) === 0 ? '' : `${Math.trunc(item % 60)}Mins`}`,
      };
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
    const timeArray = timeSlotHanlder();
    setPriceSlot(timeArray);
  }, [facilityDetails?.reservation_period]);

  useEffect(() => {
    if (priceSlot?.length > 0) {
      const slotOptions = transfromArray(priceSlot || []);
      setTimeOptions(slotOptions);
    }
  }, [priceSlot]);

  let grandTotal = 0;

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
    if (date) {
      setCheckInDate(moment(date));
    }
    if (time) {
      setCheckInTime(moment(time, 'HH:00'));
    }
  }, [pathname]);

  const bookingDetailPage = (data: any) => {
    setIsBooked(true);
    history.push(
      {
        pathname: '/facility-confirmation',
      },
      {
        id: data?.id,
        isBooked,
      },
    );
  };

  const bookingHandler = () => {
    dispatch(
      bookedFacility({
        body: {
          amenity_availability_id: parseInt(id, 10),
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
    } else if (!number.length) {
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

  const timeInd = timeOptions.findIndex((item) => item.value === selectedTime);

  let subTotal = (timeInd + 1) * Number(facilityDetails?.price);
  if (facilityDetails?.capacity_per_period === 10) {
    const count = adultCouter + childCouter;
    subTotal *= count;
  }

  const token = localStorage.getItem('token');

  const accountHandler = (e: any) => {
    setIsRegistered(true);

    if (e.target.checked) {
      dispatch(
        isRegister({ email, name, phone: number, device_type: 'web', onSuccess: getResponse }),
      );
    }
    setIsRegistered(false);
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

  // useEffect(() => {
  //   if (response?.success === true) {
  //     notification.open({
  //       message: response.message,
  //     });
  //   }
  // }, [response]);

  return (
    <Row gutter={[48, 24]} className="facility-detail-container">
      <Col xs={24} lg={14} xl={15}>
        <DetailPageHeader
          hotelTitle={getTranslated('hotel_name', facilityDetails)}
          hotelAddress={getTranslated('hotel_address', facilityDetails)}
          rateCount={facilityDetails?.hotel_rating}
        />
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <HeadingText title={t('globle.about')} isSmall>
              <p className="detail-text">{getTranslated('description', facilityDetails?.hotel)}</p>
            </HeadingText>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <HeadingText title={t('globle.description')}>
              <p className="detail-text">
                {getTranslated('description', facilityDetails?.amenity)}
              </p>
            </HeadingText>
          </Col>
          <Col lg={12}>
            <HeadingText title="">
              <Row gutter={[16, 16]} className="side-border">
                {facilityDetails?.amenity?.pictures?.map((picture) => (
                  <Col xs={12} lg={12} key={picture.id} className="room-picture-box">
                    <img src={picture.image_url} alt="room img" className="room-picture" />
                  </Col>
                ))}
              </Row>
            </HeadingText>
          </Col>
        </Row>

        <Divider className="divider" />

        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <HeadingText title={t('facility.instruction')}>
              <p className="detail-text">
                {getTranslated('instructions', facilityDetails?.amenity)}
              </p>
            </HeadingText>
          </Col>
        </Row>
        <Divider className="divider" />

        {/* <Row gutter={[16, 16]}>
          <Col lg={24}> */}
        <HotelMap />
        {/* </Col>
        </Row> */}
      </Col>
      <Col xs={24} lg={10} xl={9}>
        <Spin spinning={isRegistered} size="large">
          <div className="detail-card">
            {!facilityDetails?.amenity ? (
              <>
                <Skeleton.Button size="large" block active />
                {/* <Skeleton.Button active size={size} shape={buttonShape} block={block} /> */}
              </>
            ) : (
              <h1 className="main-heading">{`${getTranslated(
                'amenity_name',
                facilityDetails?.amenity,
              )}`}</h1>
            )}
            <p className="guest-number">
              {t('globle.numOfGuest')} <b>{facilityDetails?.capacity_per_period}</b>
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
                <label>{t('facility.checkTime')}</label>
                <TimePickerField
                  value={checkInTime}
                  placeholder={t('facility.checkTime')}
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
                  addonBefore={<UserAddOutlined />}
                  value={name}
                  name={name}
                  onChange={(e) => setName(e.target.value)}
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
                addonBefore={<p>{t('globle.mobile')}</p>}
                value={number}
                name={number}
                onChange={(e) => setNumber(e.target.value)}
                maxLength={10}
                error={errorNumber}
              />
            </Col> */}
              <Col xs={24}>
                <AddOnField
                  type="email"
                  placeholder={t('globle.email')}
                  addonBefore={<p>{t('globle.email')}</p>}
                  value={email}
                  name={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              disabled={btnDisable}
            />
            <LightText>{t('filter.childDetails')}</LightText>
            <Divider className="divider" />
            <div className="total-section">
              <div className="inlinePrice">
                <p className="title">{t('globle.subTotal')}</p>
                <p className="price">
                  {subTotal.toFixed(2)} &nbsp; {t('globle.sar')}
                </p>
              </div>
              {taxes?.map((tax) => {
                // const totalPrice = (facilityDetails?.price || 0) * (selectedTime / 60);
                const totalPrice = subTotal;
                const taxPrice = (tax.percentage / 100) * totalPrice;

                grandTotal += taxPrice;
                return (
                  <div className="inlinePrice" key={tax.id}>
                    <p className="title">{i18n.language !== 'en' ? tax.ar_name : tax.name}</p>
                    <p className="price">
                      <small>({tax.percentage}%)</small> &nbsp; {taxPrice.toFixed(2)} &nbsp;
                      {t('globle.sar')}
                    </p>
                  </div>
                );
              })}

              <Divider className="divider" />

              <div className="inlinePrice">
                <h1 className="total-title">{t('globle.total')}</h1>
                <h1 className="total-price">
                  {(grandTotal + subTotal).toFixed(2)} &nbsp; {t('globle.sar')}
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

export default FacilityDetails;

const LightText = styled.p`
  font-size: 0.7rem;
  color: #808080d9;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
`;
const RadioHeading = styled.h1`
  color: #3ba6ab;
  margin-bottom: 0.5rem;
`;
const coord = [
  { lat: '24.7136', lng: '46.6753' },
  // { lat: 24.5247, lng: 39.5692 },
  // { lat: 26.4207, lng: 50.0888 },
  // { lat: 21.4858, lng: 39.1925 },
  // { lat: 21.3891, lng: 39.8579 },
];
