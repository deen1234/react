import { Input } from 'antd';
import React, { ReactElement, ReactNode } from 'react';
import './style.less';

interface AddOnFieldProps {
  placeholder: string;
  defaultValue?: string;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  error?: boolean;
  maxLength?: number;
}

const AddOnField = ({
  placeholder,
  defaultValue,
  addonAfter,
  addonBefore,
  value,
  name,
  onChange,
  type,
  error,
  maxLength,
}: AddOnFieldProps): ReactElement => {
  return (
    <div className="add-on-field-container">
      <Input
        className={error ? 'error-field  add-on-field' : 'add-on-field'}
        addonBefore={addonBefore}
        addonAfter={addonAfter}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        maxLength={maxLength}
      />
    </div>
  );
};

AddOnField.defaultProps = {
  value: '',
  defaultValue: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  addonBefore: null,
  addonAfter: null,
  type: 'text',
  name: '',
  error: false,
  maxLength: undefined,
};

export default AddOnField;
