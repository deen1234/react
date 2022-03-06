// import { CheckCircleOutlined } from '@ant-design/icons';
// import { Tag } from 'antd';
import React from 'react';
import './style.less';

interface ImageTagCardProps {
  tagTitle: string;
  imgBg: string | undefined;
}

const ImageTagCard: React.FC<ImageTagCardProps> = ({ imgBg, tagTitle }: ImageTagCardProps) => {
  return (
    <div className="image-tag-section">
      <img src={imgBg} className="img-section" alt="img" />
      {/* <Tag className="tag-section" icon={<CheckCircleOutlined />}>
        {tagTitle}
      </Tag> */}
    </div>
  );
};

export default ImageTagCard;
