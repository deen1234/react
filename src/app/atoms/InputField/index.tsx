import { Input } from 'antd';
import React from 'react';

interface InputFieldProps {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField = ({
  placeholder,
  name,
  type,
  onChange,
  value,
}: InputFieldProps): React.ReactElement => {
  return (
    <Input placeholder={placeholder} name={name} value={value} onChange={onChange} type={type} />
  );
};

export default InputField;
