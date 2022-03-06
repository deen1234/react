import { Divider } from 'antd';
import React, { ReactNode } from 'react';
import './style.less';

interface FilteringCardProps {
  filterIcon: ReactNode;
  filterHeading: string;
  filterText: string;
  divider: boolean;
}
const FilteringCard: React.FC<FilteringCardProps> = ({
  filterIcon,
  filterHeading,
  filterText,
  divider,
}: FilteringCardProps) => {
  return (
    <>
      <div className="filter-item">
        {filterIcon}
        <h2 className="filter-heading">{filterHeading}</h2>
        <p className="filter-text">{filterText}</p>
      </div>
      {divider ? <Divider type="vertical" className="vertical-divider" /> : ''}
    </>
  );
};

export default FilteringCard;
