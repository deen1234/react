import React from 'react';
import FilteringCard from 'app/atoms/FilteringCard';
import { FieldTimeOutlined, StarOutlined, TagsOutlined } from '@ant-design/icons';
import './style.less';
import { useTranslation } from 'react-i18next';

const FilterCards: React.FC = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      id: 1,
      filterIcon: <TagsOutlined className="filter-icon" />,
      filterHeading: t('filter.lowestPrice'),
      filterText: t('globle.topHotel'),
      divider: true,
    },
    {
      id: 2,
      filterIcon: <FieldTimeOutlined className="filter-icon" />,
      filterHeading: t('filter.flixbleCheckIn'),
      filterText: t('globle.topHotel'),
      divider: true,
    },
    {
      id: 3,
      filterIcon: <StarOutlined className="filter-icon" />,
      filterHeading: t('globle.topHotel'),
      filterText: t('globle.topHotel'),
      divider: false,
    },
  ];

  return (
    <div className="filter-section">
      {cardData.map((data) => (
        <FilteringCard
          key={data.id}
          filterIcon={data.filterIcon}
          filterHeading={data.filterHeading}
          filterText={data.filterText}
          divider={data.divider}
        />
      ))}
    </div>
  );
};

export default FilterCards;
