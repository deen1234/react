import { Checkbox, CheckboxOptionType, Button } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import React from 'react';
import './style.less';

interface CheckboxGroupProps {
  options: (string | CheckboxOptionType)[];
  onChange: (checkedValue: CheckboxValueType[]) => void;
  onLoadMore: () => void;
  loadLess: () => void;
  value?: string[];
  isFullyLoaded: boolean;
}

const CheckboxGroupExpandable: React.FC<CheckboxGroupProps> = ({
  options,
  onChange,
  onLoadMore,
  loadLess,
  isFullyLoaded,
  value,
}: CheckboxGroupProps) => {
  // const expandableList = options.slice(0, 5);
  return (
    <div className="checkbox-container">
      <h3>Expandable</h3>
      <Checkbox.Group className="checkbox" value={value} options={options} onChange={onChange} />
      <Button onClick={isFullyLoaded === false ? onLoadMore : loadLess}>
        {isFullyLoaded === true ? 'load less <<' : 'load more >>'}{' '}
      </Button>
    </div>
  );
};

CheckboxGroupExpandable.defaultProps = {
  value: [],
};

export default CheckboxGroupExpandable;
