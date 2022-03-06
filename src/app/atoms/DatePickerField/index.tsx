import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import './style.less';

interface DatePickerFieldProps {
  placeholder: string;
  value?: moment.Moment | null;
  error?: boolean;
  onChange: (time: moment.Moment | any, timeString: string) => void;
  disabled?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  placeholder,
  onChange,
  value,
  error,
  disabled,
}: DatePickerFieldProps) => {
  return (
    <div className={error ? 'error-field date-picker-container' : 'date-picker-container'}>
      <DatePicker
        disabledDate={(current) => {
          return current && current < moment().startOf('day');
        }}
        inputReadOnly
        value={value}
        className="date-picker"
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

DatePickerField.defaultProps = {
  error: false,
  value: null,
  disabled: false,
};

export default DatePickerField;
