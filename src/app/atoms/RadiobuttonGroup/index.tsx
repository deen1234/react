import { CheckboxOptionType, Radio, RadioChangeEvent } from 'antd';
import React, { ReactElement } from 'react';
import './style.less';

interface RadiobuttonGroupProps {
  options: (string | CheckboxOptionType)[];
  onChange: (e: RadioChangeEvent) => void;
  value: number;
}

const RadiobuttonGroup = ({ options, onChange, value }: RadiobuttonGroupProps): ReactElement => {
  return (
    <div className="radio-btn-container">
      <Radio.Group
        className="radio-btn-section"
        options={options}
        onChange={onChange}
        optionType="button"
        buttonStyle="solid"
        value={value}
      />
    </div>
  );
};

export default RadiobuttonGroup;
