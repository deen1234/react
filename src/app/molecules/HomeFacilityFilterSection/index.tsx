/* eslint-disable no-debugger */
import { Divider } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import CheckboxGroup from 'app/atoms/CheckboxGroup';
import RangeSlider from 'app/atoms/RangeSlider';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import './style.less';

interface HomeFacilityFilterSectionProps {
  price: { min: number; max: number };
  setPrice: (value: [number, number]) => void;
  accessType: string[];
  setAccessType: (checkedValue: CheckboxValueType[]) => void;
  hotelRating: string[];
  setHotelRating: (checkedValue: CheckboxValueType[]) => void;
}

const HomeFacilityFilterSection = ({
  price,
  setPrice,
  accessType,
  setAccessType,
  hotelRating,
  setHotelRating,
}: HomeFacilityFilterSectionProps): ReactElement => {
  const { t } = useTranslation();

  const typeOptions = [
    { label: t('globle.private'), value: 20 },
    { label: t('globle.public'), value: 10 },
  ];
  const ratingOptions = [
    { label: `${t('globle.singleStar')}`, value: 1 },
    { label: `${t('globle.doubleStar')}`, value: 2 },
    { label: `3 ${t('globle.multipleStar')}`, value: 3 },
    { label: `4 ${t('globle.multipleStar')}`, value: 4 },
    { label: `5 ${t('globle.multipleStar')}`, value: 5 },
  ];

  return (
    <div className="facility-filter-card">
      <h1 className="card-heading">{t('globle.priceRange')}</h1>
      <RangeSlider onChange={setPrice} min={price.min} max={price.max} />
      <Divider />
      <h1 className="card-heading">{t('facility.accessType')}</h1>
      <CheckboxGroup options={typeOptions} onChange={setAccessType} value={accessType} />
      <Divider />
      <h1 className="card-heading">{t('globle.hotelRating')}</h1>
      <CheckboxGroup options={ratingOptions} onChange={setHotelRating} value={hotelRating} />
    </div>
  );
};

export default HomeFacilityFilterSection;
