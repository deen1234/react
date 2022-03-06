/* eslint-disable no-debugger */
import { UserOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { Button, Col, Input, Popover, Row } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import DatePickerField from 'app/atoms/DatePickerField';
import TimePickerField from 'app/atoms/TimePickerField';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cities } from 'app/modules/Config';
import { ListType } from 'configs/list';
import './style.less';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import { tarnsformArray } from 'utils/functions';
import moment from 'moment';
import { getFiltredHotels } from 'app/modules/Hotels/ducks/services';
import PopoverCounterField from '../PopoverCounterField';

interface RoomFiltersProps {
  isModalClose?: any;
}

const RoomFilters = ({ isModalClose }: RoomFiltersProps): ReactElement => {
  const { t, i18n } = useTranslation();

  const history = useHistory();
  const { state, pathname } = useLocation();
  const cities = useSelector(({ config }: RootState) => config?.data?.cities);

  const [adultCouter, setAdultCouter] = useState(1);
  const [childCouter, setChildCouter] = useState(0);
  const [roomCouter, setRoomCouter] = useState(1);
  const [filterCity, setCilterCity] = useState<ListType>({
    value: '',
    label: '',
  });
  const [filterTime, setFilterTime] = useState<moment.Moment>(moment());
  const [filterDate, setFilterDate] = useState<moment.Moment>(moment());

  const [errorFilterDate, setErrorFilterDate] = useState(false);
  const [errorFilterTime, setErrorFilterTime] = useState(false);
  const [errorFilterCity, setErrorFilterCity] = useState(false);

  const dateHandler = (date: moment.Moment) => {
    setFilterDate(date);
  };
  const timeHandler = (time: moment.Moment) => {
    setFilterTime(time);
  };

  const { city, date, time, room_count, adult, child } = state || {};

  const cityValue = cities?.find((cityArray) => cityArray.id === city);
  const dispatch = useDispatch();
  const newCity = tarnsformArray(cityValue, i18n.language);
  const filterState = {
    ...state,
  };
  // console.log('cccccc', cityValue);
  const wrapperFunction = () => {
    dispatch(getFiltredHotels(filterState));

    // alert('ssssssssss');
  };
  const fieldLengthChecker = () => {
    if (filterCity.value === null) {
      setErrorFilterCity(true);
    } else if (!filterDate?.format().length) {
      setErrorFilterDate(true);
    } else if (!filterTime?.format().length) {
      setErrorFilterTime(true);
    } else submit();
  };

  const submit = () => {
    history.push(
      {
        pathname: 'home-room',
        search: `city=${filterCity.value} date=${filterDate?.format(
          'YYYY-MM-DD',
        )} time=${filterTime?.format(
          'HH:mm',
        )} adult=${adultCouter} child=${childCouter} room=${roomCouter}`,
      },
      {
        city: filterCity.value,
        date: filterDate?.format('YYYY-MM-DD'),
        time: filterTime?.format('HH:00'),
        adult: adultCouter,
        child: childCouter,
        room_count: roomCouter,
      },
    );
    if (isModalClose) {
      isModalClose(false);
    }
  };

  useEffect(() => {
    if (newCity) {
      setCilterCity(newCity);
    }
    if (date) {
      setFilterDate(moment(date));
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
    if (time) {
      setFilterTime(moment(time, 'HH:mm'));
    }
  }, [pathname]);

  useEffect(() => {
    if (filterState.city > 0) {
      wrapperFunction();
    }
  });
  return (
    <Row gutter={[8, 8]} align="middle" className="room-filter-container">
      <Col xs={24} sm={24} md={6} lg={6}>
        <Cities value={filterCity} setValue={setCilterCity} error={errorFilterCity} />
      </Col>
      <Col xs={12} sm={12} md={4} lg={4}>
        <DatePickerField
          value={filterDate}
          onChange={dateHandler}
          placeholder={t('globle.anyDate')}
          error={errorFilterDate}
        />
      </Col>
      <Col xs={12} sm={12} md={4} lg={4}>
        <TimePickerField
          value={filterTime}
          onChange={timeHandler}
          placeholder={t('globle.anyTime')}
          error={errorFilterTime}
          date={filterDate}
          onSelect={timeHandler}
        />
      </Col>
      <Col xs={24} sm={24} md={6} lg={7} className="popup-sec">
        <Popover
          className="popover-container"
          content={
            <PopoverCounterField
              adultCouter={adultCouter}
              setAdultCouter={setAdultCouter}
              childCouter={childCouter}
              setChildCouter={setChildCouter}
              roomCouter={roomCouter}
              setRoomCouter={setRoomCouter}
            />
          }
          placement="bottom"
          trigger="click"
        >
          <Input
            prefix={<UserOutlined />}
            suffix={<VerticalAlignMiddleOutlined />}
            readOnly
            placeholder={`1 ${t('globle.adult')}, 1  ${t('globle.child')}, 1  ${t('globle.room')}`}
            className="select-items"
            value={`${adultCouter} ${t('globle.adult')}, ${childCouter} ${t(
              'globle.child',
            )}, ${roomCouter} ${t('globle.room')}`}
          />
        </Popover>
      </Col>
      <Col md={4} lg={3} className="btn-section">
        <Button type="primary" className="search-btn" onClick={fieldLengthChecker}>
          {t('globle.search')}
        </Button>
      </Col>
    </Row>
  );
};

RoomFilters.defaultProps = {
  isModalClose: null,
};

export default RoomFilters;
