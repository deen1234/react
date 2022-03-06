import CounterField from 'app/atoms/CounterField';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface PopoverCounterFieldProps {
  adultCouter: number;
  setAdultCouter: any;
  childCouter: number;
  setChildCouter: any;
  roomCouter: number;
  setRoomCouter: any;
  facility?: boolean;
}

const PopoverCounterField: React.FC<PopoverCounterFieldProps> = ({
  adultCouter,
  setAdultCouter,
  childCouter,
  setChildCouter,
  roomCouter,
  setRoomCouter,
  facility,
}: PopoverCounterFieldProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!facility) {
      const roomCount = Math.ceil(adultCouter / 3);
      setRoomCouter(roomCount);
    }
  }, [adultCouter]);

  useEffect(() => {
    if (!facility) {
      const roomCount = Math.ceil(adultCouter / 3);
      if (roomCouter < roomCount) {
        setRoomCouter(roomCount);
      }
    }
  }, [roomCouter]);

  return (
    <div>
      <CounterField
        title={t('globle.adult')}
        value={adultCouter}
        incrementHandler={() => setAdultCouter((prevAdult: any) => prevAdult + 1)}
        decrementHandler={() =>
          adultCouter > 1 && setAdultCouter((prevAdult: any) => prevAdult - 1)
        }
      />
      <CounterField
        title={t('globle.child')}
        value={childCouter}
        incrementHandler={() =>
          childCouter < 4 && setChildCouter((prevChild: any) => prevChild + 1)
        }
        decrementHandler={() =>
          childCouter > 0 && setChildCouter((prevChild: any) => prevChild - 1)
        }
      />
      <LightText>{t('filter.childDetails')}</LightText>
      {!facility && (
        <CounterField
          title={t('globle.room')}
          value={roomCouter}
          incrementHandler={() => setRoomCouter((prevRoom: any) => prevRoom + 1)}
          decrementHandler={() => roomCouter > 1 && setRoomCouter((prevRoom: any) => prevRoom - 1)}
        />
      )}
    </div>
  );
};

PopoverCounterField.defaultProps = {
  facility: false,
};

export default PopoverCounterField;

const LightText = styled.p`
  font-size: 0.7rem;
  color: #808080d9;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;
