import { InsertRowAboveOutlined } from '@ant-design/icons';
import AutoCompleteField from 'app/atoms/AutoCompleteField';
import { ListType } from 'configs/list';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { FacilityType } from './ducks/types';
import { getConfig } from './ducks/services';

interface FacilitiesProps {
  value: ListType;
  setValue: (val: any) => void;
  error?: boolean;
}

const Facilities = ({ value, setValue, error }: FacilitiesProps): ReactElement => {
  const { t, i18n } = useTranslation();
  const [facilitiesState, setFacilitiesState] = useState<ListType[]>([]);

  const facilities = useSelector(({ config }: RootState) => config.data?.facility_types);
  const dispatch = useDispatch();

  const transfromCities = (lang: string, data?: FacilityType[]) => {
    return (data || []).map((item: any) => {
      const label = lang !== 'en' ? item[`${lang}_name`] : item.name;
      return { value: item.id, label };
    });
  };

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    const transformFacility = transfromCities(i18n.language, facilities);
    setFacilitiesState(transformFacility);
  }, [i18n.language, facilities]);

  return (
    <AutoCompleteField
      error={error}
      value={value}
      setValue={setValue}
      placeholder={
        <>
          <InsertRowAboveOutlined />
          &nbsp; {t('globle.facilityTypeText')}
        </>
      }
      options={facilitiesState}
    />
  );
};
Facilities.defaultProps = {
  error: false,
};
export default Facilities;
