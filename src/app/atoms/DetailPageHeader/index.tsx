import { Divider } from 'antd';
import React, { ReactElement } from 'react';
import RatingStarCount from '../RatingStarCount';
import './style.less';

interface DetailPageHeaderProps {
  hotelTitle?: string;
  hotelAddress?: string;
  rateCount?: string;
}

const DetailPageHeader = ({
  hotelTitle,
  hotelAddress,
  rateCount,
}: DetailPageHeaderProps): ReactElement => {
  return (
    <div className="detail-page-header">
      <h1 className="title">{hotelTitle}</h1>
      <Divider type="vertical" className="divider" />
      <RatingStarCount rateCount={rateCount} />
      <Divider type="vertical" className="divider" />
      <p className="address">{hotelAddress}</p>
    </div>
  );
};

DetailPageHeader.defaultProps = {
  hotelTitle: '',
  hotelAddress: '',
  rateCount: '',
};

export default DetailPageHeader;
