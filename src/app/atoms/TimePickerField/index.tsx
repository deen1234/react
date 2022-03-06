/* eslint-disable no-plusplus */
import { TimePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import './style.less';

interface TimePickerFieldProps {
  placeholder: string;
  onChange: (time: moment.Moment | any, timeString: string) => void;
  value?: moment.Moment | null;
  error?: boolean;
  disabled?: boolean;
  date?: moment.Moment | null;
  onSelect?: (time: moment.Moment) => void;
}

const TimePickerField: React.FC<TimePickerFieldProps> = ({
  placeholder,
  onChange,
  value,
  error,
  disabled,
  date,
  onSelect,
}: TimePickerFieldProps) => {
  const format = 'HH:00';
  const isDateMatch = moment()?.format('YYYY-MM-DD') === date?.format('YYYY-MM-DD');

  const getDisabledHours = () => {
    const hours = [];
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  const getDisabledMinutes = (selectedHour: number) => {
    const minutes = [];
    if (selectedHour === moment().hour()) {
      for (let i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  return (
    <div className={error ? 'error-field time-picker-container' : 'time-picker-container'}>
      <TimePicker
        className="time-picker"
        popupClassName="time-picker-popup"
        onChange={onChange}
        placeholder={placeholder}
        format={format}
        value={value}
        inputReadOnly
        disabled={disabled}
        disabledHours={isDateMatch ? getDisabledHours : undefined}
        disabledMinutes={isDateMatch ? getDisabledMinutes : undefined}
        onSelect={onSelect}
        minuteStep={60}
      />
    </div>
  );
};

TimePickerField.defaultProps = {
  value: null,
  error: false,
  disabled: false,
  date: null,
  onSelect: () => null,
};

export default TimePickerField;
