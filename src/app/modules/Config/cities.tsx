import React, { ReactElement, useEffect, useState } from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { ListType } from 'configs/list';
import { useTranslation } from 'react-i18next';
import AutoCompleteField from 'app/atoms/AutoCompleteField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
// import { tarnsformArray } from 'utils/functions';
import { getConfig } from './ducks/services';
import { City } from './ducks/types';

interface CitiesProps {
  value: ListType;
  setValue: (val: any) => void;
  error?: boolean;
}

const Cities = ({ value, setValue, error }: CitiesProps): ReactElement => {
  const { t, i18n } = useTranslation();
  const [citiesState, setCitiesState] = useState<ListType[]>([]);

  const cities = useSelector(({ config }: RootState) => config.data?.cities);
  const dispatch = useDispatch();

  const transfromCities = (lang: string, data?: City[]) => {
    return (data || []).map((item: any) => {
      const label = lang !== 'en' ? item[`${lang}_name`] : item.name;
      return { value: item.id, label };
      // return (data || []).map(
      //   (item: any) => tarnsformArray(item, lang),
      //   // const label = lang !== 'en' ? item[`${lang}_name`] : item.name;
      //   // return { value: item.id, label };
      //   // tarnsformArray(item, lang);
    });
  };

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    const transformCity = transfromCities(i18n.language, cities);
    setCitiesState(transformCity);
  }, [i18n.language, cities]);

  return (
    <AutoCompleteField
      value={value}
      error={error}
      setValue={setValue}
      placeholder={
        <>
          <EnvironmentOutlined />
          &nbsp; {t('globle.goingText')}
        </>
      }
      options={citiesState}
    />
  );
};
Cities.defaultProps = {
  error: false,
};
export default Cities;
