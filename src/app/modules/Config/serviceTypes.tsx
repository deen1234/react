// import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import CheckboxGroupExpandable from 'app/atoms/CheckboxGroup/expanedable';
import { ListType } from 'configs/list';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { getConfig } from './ducks/services';
// import { FacilityType } from './ducks/types';

interface ServiceTypesGroupProps {
  value: string[];
  onChange: any;
}

const ServiceTypes = ({ value, onChange }: ServiceTypesGroupProps): ReactElement => {
  const { i18n } = useTranslation();
  const [serviceType, setServiceType] = useState<ListType[]>([]);
  const [fullLoaded, setFullLoaded] = useState(false);

  const servicesTypsList = useSelector(({ config }: RootState) => config.data?.service_types);

  const dispatch = useDispatch();

  const transfromServiceTypes = (lang: string, data?: any) => {
    return (data || []).map((item: any) => {
      const item_label = item.service;
      return { value: item.id, label: item_label };
    });
  };
  const transfromServiceType = transfromServiceTypes(i18n.language, servicesTypsList);

  const onLoadMoreHandler = () => {
    setServiceType(transfromServiceType);
    setFullLoaded(true);
  };
  const onLoadLessHandler = () => {
    setServiceType(transfromServiceType.slice(0, 6));
    setFullLoaded(false);
  };
  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    setServiceType(transfromServiceType.slice(0, 6));
  }, [i18n.language, servicesTypsList]);

  return (
    <CheckboxGroupExpandable
      onLoadMore={() => onLoadMoreHandler()}
      loadLess={() => onLoadLessHandler()}
      value={value}
      isFullyLoaded={fullLoaded}
      options={serviceType}
      onChange={onChange}
    />
  );
};

export default ServiceTypes;
