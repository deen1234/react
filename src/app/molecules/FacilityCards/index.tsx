import { Col, Row } from 'antd';
import ImageTagCard from 'app/atoms/ImageTagCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.less';

const FacilityCards: React.FC = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      id: 1,
      imgBg: 'https://soft2share.com/wp-content/uploads/2019/06/hotel-jobs.jpg',
      tagTitle: t('home.facilityCard.tagName1'),
    },
    {
      id: 2,
      imgBg: 'https://hi-cdn.t-rp.co.uk/images/hotels/1511092/1?width=870&height=480&crop=false',
      tagTitle: t('home.facilityCard.tagName2'),
    },
    {
      id: 3,
      imgBg: 'https://d1zah1nkiby91r.cloudfront.net/s3fs-public/gallery/10391_7.jpg',
      tagTitle: t('home.facilityCard.tagName3'),
    },
  ];

  return (
    <div className="best-facilties-section">
      <h1 className="best-facilties-heading">{t('home.facilityCard.heading')}</h1>
      <Row gutter={[16, 16]}>
        {cardData.map((data) => (
          <Col xs={24} sm={12} md={8} key={data.id}>
            <ImageTagCard imgBg={data.imgBg} tagTitle={data.tagTitle} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FacilityCards;
