import { Checkbox, CheckboxOptionType } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React from 'react';
import './style.less';

interface CheckboxGroupProps {
  options: (string | CheckboxOptionType)[];
  onChange: (checkedValue: CheckboxValueType[]) => void;
  value?: string[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  value,
}: CheckboxGroupProps) => {
  return (
    <div className="checkbox-container">
      <Checkbox.Group className="checkbox" value={value} options={options} onChange={onChange} />
    </div>
  );
};

CheckboxGroup.defaultProps = {
  value: [],
};
export default CheckboxGroup;
