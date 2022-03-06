import React, { ReactElement } from 'react';
import { StarFilled } from '@ant-design/icons';
import './style.less';

interface RatingStarCountProps {
  rateCount?: string;
}

const RatingStarCount = ({ rateCount }: RatingStarCountProps): ReactElement => {
  return (
    <div className="rating-start-count-container">
      <p className="count-text">{rateCount}</p> &nbsp; <StarFilled className="star-icon" />
    </div>
  );
};

RatingStarCount.defaultProps = {
  rateCount: '',
};

export default RatingStarCount;
