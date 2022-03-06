import { UserOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { Button, Col, Input, Popover, Row } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import DatePickerField from 'app/atoms/DatePickerField';
import TimePickerField from 'app/atoms/TimePickerField';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cities, Facilities } from 'app/modules/Config';
import { ListType } from 'configs/list';
import './style.less';
import { useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { tarnsformArray } from 'utils/functions';
import moment from 'moment';
import PopoverCounterField from '../PopoverCounterField';

interface FacilityFilterProps {
  isModalClose?: any;
}

const FacilityFilter = ({ isModalClose }: FacilityFilterProps): ReactElement => {
  const { t, i18n } = useTranslation();

  const history = useHistory();
  const { state, pathname } = useLocation();

  const [adultCouter, setAdultCouter] = useState(1);
  const [childCouter, setChildCouter] = useState(0);
  const [filterCity, setFilterCity] = useState<ListType>({
    value: '',
    label: '',
  });
  const [filterFacility, setFilterFacility] = useState<ListType>({
    value: '',
    label: '',
  });
  const [filterTime, setFilterTime] = useState<moment.Moment>(moment());
  const [filterDate, setFilterDate] = useState<moment.Moment>(moment());

  const [errorFilterDate, setErrorFilterDate] = useState(false);
  const [errorFilterTime, setErrorFilterTime] = useState(false);
  const [errorFilterFacility, setErrorFilterFacility] = useState(false);
  const [errorFilterCity, setErrorFilterCity] = useState(false);

  const dateHandler = (date: moment.Moment) => {
    setFilterDate(date);
  };
  const timeHandler = (time: moment.Moment) => {
    setFilterTime(time);
  };

  const { city, facility_type, date, time, adult, child } = state || {};

  const cities = useSelector(({ config }: RootState) => config.data?.cities);
  const facility_types = useSelector(({ config }: RootState) => config.data?.facility_types);

  const cityValue = cities?.find((cityArray) => cityArray.id === city);
  const facilityValue = facility_types?.find((facilityArray) => facilityArray.id === facility_type);

  const newCity = tarnsformArray(cityValue, i18n.language);
  const newFacility = tarnsformArray(facilityValue, i18n.language);

  const fieldLengthChecker = () => {
    if (filterCity.value === null) {
      setErrorFilterCity(true);
    } else if (filterFacility.value === null) {
      setErrorFilterFacility(true);
    } else if (!filterDate?.format().length) {
      setErrorFilterDate(true);
    } else if (!filterTime?.format().length) {
      setErrorFilterTime(true);
    } else submit();
  };

  const submit = () => {
    history.push(
      {
        pathname: 'home-facility',
        search: `city=${filterCity.value} facility_type=${
          filterFacility.value
        } date=${filterDate?.format('YYYY-MM-DD')} time=${filterTime?.format(
          'HH:mm',
        )} adult=${adultCouter} child=${childCouter}`,
      },
      {
        city: filterCity.value,
        facility_type: filterFacility.value,
        date: filterDate?.format('YYYY-MM-DD'),
        time: filterTime?.format('HH:00'),
        adult: adultCouter,
        child: childCouter,
      },
    );
    if (isModalClose) {
      isModalClose(false);
    }
  };

  useEffect(() => {
    if (newCity) {
      setFilterCity(newCity);
    }
    if (date) {
      setFilterDate(moment(date));
    }
    if (newFacility) {
      setFilterFacility(newFacility);
    }
    if (adult) {
      setAdultCouter(adult);
    }
    if (child) {
      setChildCouter(child);
    }
    if (time) {
      setFilterTime(moment(time, 'HH:mm'));
    }
  }, [pathname]);

  return (
    <Row gutter={[8, 8]} align="middle" className="facility-filter-container">
      <Col xs={24} sm={24} md={5} lg={5}>
        <Cities value={filterCity} setValue={setFilterCity} error={errorFilterCity} />
      </Col>
      <Col xs={24} sm={24} md={4} lg={4}>
        <Facilities
          value={filterFacility}
          setValue={setFilterFacility}
          error={errorFilterFacility}
        />
      </Col>
      <Col xs={12} sm={12} md={3} lg={3}>
        <DatePickerField
          value={filterDate}
          onChange={dateHandler}
          placeholder={t('globle.anyDate')}
          error={errorFilterDate}
        />
      </Col>
      <Col xs={12} sm={12} md={3} lg={3}>
        <TimePickerField
          value={filterTime}
          onChange={timeHandler}
          placeholder={t('globle.anyTime')}
          error={errorFilterTime}
          date={filterDate}
          onSelect={timeHandler}
        />
      </Col>
      <Col xs={24} sm={24} md={5} lg={6} className="popup-sec">
        <Popover
          className="popover-container"
          content={
            <PopoverCounterField
              adultCouter={adultCouter}
              setAdultCouter={setAdultCouter}
              childCouter={childCouter}
              setChildCouter={setChildCouter}
              roomCouter={0}
              setRoomCouter={null}
              facility
            />
          }
          placement="bottom"
          trigger="click"
        >
          <Input
            readOnly
            prefix={<UserOutlined />}
            suffix={<VerticalAlignMiddleOutlined />}
            placeholder={`1 ${t('globle.adult')}, 1  ${t('globle.child')}`}
            className="select-items"
            value={`${adultCouter} ${t('globle.adult')}, ${childCouter} ${t('globle.child')}`}
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

FacilityFilter.defaultProps = {
  isModalClose: null,
};

export default FacilityFilter;
