import React from 'react';
import { Slider } from 'antd';

interface RangeSliderProps {
  min: number;
  max: number;
  onChange: (value: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, onChange }: RangeSliderProps) => {
  return (
    <Slider
      range
      step={500}
      defaultValue={[min, max]}
      onChange={onChange}
      onAfterChange={onChange}
      value={[min, max]}
      max={49999}
    />
  );
};

export default RangeSlider;
