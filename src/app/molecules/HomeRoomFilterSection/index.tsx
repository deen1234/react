/* eslint-disable no-debugger */
import { Divider } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import CheckboxGroup from 'app/atoms/CheckboxGroup';
import RangeSlider from 'app/atoms/RangeSlider';
// import { RoomTypes } from 'app/modules/Config';
import { ServiceTypes } from 'app/modules/Config';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import './style.less';

interface HomeRoomFilterSectionProps {
  price: { min: number; max: number };
  setPrice: (value: [number, number]) => void;
  hours: string[];
  setHours: (checkedValue: CheckboxValueType[]) => void;
  hotelRating: string[];
  setHotelRating: (checkedValue: CheckboxValueType[]) => void;
  // selectedRoomType: string[];
  // setSelectedRoomType: (checkedValue: CheckboxValueType[]) => void;

  selectedServiceType: string[];
  setSelectedServiceType: (checkedValue: CheckboxValueType[]) => void;
}

const HomeRoomFilterSection = ({
  price,
  setPrice,
  hours,
  setHours,
  hotelRating,
  setHotelRating,
  // selectedRoomType,
  // setSelectedRoomType,
  selectedServiceType,
  setSelectedServiceType,
}: HomeRoomFilterSectionProps): ReactElement => {
  const { t } = useTranslation();

  const hourOptions = [
    { label: `3 ${t('globle.hours')}`, value: 3 },
    { label: `6 ${t('globle.hours')}`, value: 6 },
    { label: `9 ${t('globle.hours')}`, value: 9 },
    { label: `12 ${t('globle.hours')}`, value: 12 },
    { label: `15 ${t('globle.hours')}`, value: 15 },
    { label: `18 ${t('globle.hours')}`, value: 18 },
  ];

  const ratingOptions = [
    { label: `${t('globle.singleStar')}`, value: 1 },
    { label: `${t('globle.doubleStar')}`, value: 2 },
    { label: `3 ${t('globle.multipleStar')}`, value: 3 },
    { label: `4 ${t('globle.multipleStar')}`, value: 4 },
    { label: `5 ${t('globle.multipleStar')}`, value: 5 },
  ];

  return (
    <div className="home-filter-card">
      <h1 className="card-heading">{t('globle.priceRange')}</h1>
      <RangeSlider onChange={setPrice} min={price.min} max={price.max} />
      <Divider />
      <h1 className="card-heading">service tyoe</h1>
      <ServiceTypes value={selectedServiceType} onChange={setSelectedServiceType} />
      <Divider />

      <h1 className="card-heading">{t('room.howManyHours')}</h1>
      <CheckboxGroup value={hours} options={hourOptions} onChange={setHours} />
      <Divider />
      <h1 className="card-heading">{t('globle.hotelRating')}</h1>
      <CheckboxGroup options={ratingOptions} onChange={setHotelRating} value={hotelRating} />
    </div>
  );
};

export default HomeRoomFilterSection;
