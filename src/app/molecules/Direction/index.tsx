import React, { ReactElement } from 'react';
import { ConfigProvider } from 'antd';
import { useSelector } from 'react-redux';
import { selectDirection } from './ducks/selectors';
import { DirectionProps } from './ducks/types';

const Direction = (props: DirectionProps): ReactElement => {
  const direction = useSelector(selectDirection);
  const { children } = props;
  return <ConfigProvider direction={direction}>{children}</ConfigProvider>;
};

export default Direction;
