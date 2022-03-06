// import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import CheckboxGroup from 'app/atoms/CheckboxGroup';
import { ListType } from 'configs/list';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/rootState';
import { getConfig } from './ducks/services';
import { FacilityType } from './ducks/types';

interface RoomTypesGroupProps {
  value: string[];
  onChange: any;
}

const RoomTypes = ({ value, onChange }: RoomTypesGroupProps): ReactElement => {
  const { i18n } = useTranslation();
  const [roomType, setRoomType] = useState<ListType[]>([]);

  const roomTypes = useSelector(({ config }: RootState) => config.data?.room_types);
  const dispatch = useDispatch();
  // done
  const transfromRoomTypes = (lang: string, data?: FacilityType[]) => {
    return (data || []).map((item: any) => {
      const label = lang !== 'en' ? item[`${lang}_name`] : item.name;
      return { value: item.id, label };
    });
  };

  useEffect(() => {
    dispatch(getConfig());
  }, []);

  useEffect(() => {
    const transfromRoomType = transfromRoomTypes(i18n.language, roomTypes);
    setRoomType(transfromRoomType);
  }, [i18n.language, roomTypes]);

  return <CheckboxGroup value={value} options={roomType} onChange={onChange} />;
};

export default RoomTypes;
