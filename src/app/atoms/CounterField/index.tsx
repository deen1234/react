import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import './style.less';

interface CounterFieldProps {
  title: string;
  value: number;
  incrementHandler: React.MouseEventHandler<HTMLSpanElement>;
  decrementHandler: React.MouseEventHandler<HTMLSpanElement>;
}

const CounterField: React.FC<CounterFieldProps> = ({
  title,
  value,
  incrementHandler,
  decrementHandler,
}: CounterFieldProps) => {
  return (
    <div className="counter-field-container">
      <p className="field-title">{title}</p>
      <Space align="center" size="middle" className="counter">
        <MinusCircleOutlined className="counter-icon" onClick={decrementHandler} />
        <p className="counter-value">{value}</p>
        <PlusCircleOutlined className="counter-icon" onClick={incrementHandler} />
      </Space>
    </div>
  );
};

export default CounterField;
