/* eslint-disable no-debugger */
import { AutoComplete } from 'antd';
import { ListType } from 'configs/list';
import React, { ReactElement } from 'react';
import './style.less';

interface AutoCompleteFieldProps {
  placeholder: ReactElement;
  options: ListType[];
  onSelect?: (val: ListType) => void;
  value: ListType;
  setValue: (val: any) => void;
  error?: boolean;
}

const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  placeholder,
  options,
  onSelect,
  value,
  setValue,
  error,
}: AutoCompleteFieldProps) => {
  const handleSelect = (val: any, opt: any) => {
    setValue(opt);
    if (onSelect) {
      onSelect(opt);
    }
  };

  const handleChange = (val: any) => {
    setValue({ value: null, label: val });
  };
  return (
    <AutoComplete
      className={error ? ' select-filter-option error-field' : 'select-filter-option'}
      // style={{ border: `${error && '4px solid red'}`, borderRadius: `${error && '10px'}` }}
      options={options}
      allowClear
      showSearch
      showArrow
      value={value?.label?.toString()}
      onChange={handleChange}
      onSelect={handleSelect}
      placeholder={placeholder}
      filterOption={(inputValue, option) => {
        const newLabel: string = option?.label?.toString() || '';
        return newLabel?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
      }}
      filterSort={(optionA, optionB) => {
        const optLabel1: string = optionA?.label?.toString() || '';
        const optLabel2: string = optionB?.label?.toString() || '';
        return optLabel1?.toLowerCase().localeCompare(optLabel2?.toLowerCase() || '');
      }}
    />
  );
};

AutoCompleteField.defaultProps = {
  onSelect: () => null,
  error: false,
};
export default AutoCompleteField;
