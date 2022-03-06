import { Col, Row } from 'antd';
import ImageTagCard from 'app/atoms/ImageTagCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.less';

const BenefecialCards: React.FC = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      id: 1,
      imgBg:
        'https://www.movenpick.com/fileadmin/_processed_/0/5/csm_Anwar_Al_Madina_i114531_800_1ab5e18555.jpg',
      tagTitle: t('home.beneficalCard.tagName1'),
    },
    {
      id: 2,
      imgBg:
        'http://pondoksarikutabali.com/wp-content/uploads/2014/06/pondok-sari-kuta-hotel-facility-pool.jpg',
      tagTitle: t('home.beneficalCard.tagName2'),
    },
  ];

  return (
    <div className="benefecial-section">
      <h1 className="benefecial-heading">{t('home.beneficalCard.heading')}</h1>
      <Row gutter={[16, 16]}>
        {cardData.map((data) => (
          <Col xs={24} sm={24} md={12} key={data.id}>
            <ImageTagCard imgBg={data.imgBg} tagTitle={data.tagTitle} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BenefecialCards;
