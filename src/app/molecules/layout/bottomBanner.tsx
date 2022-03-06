import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import JoinBg from '../../../assets/images/join-bg.jpeg';

const BottomBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BgImg className="join-section">
      <h1 className="join-heading">{t('globle.joinShaghr')}</h1>
      <Button className="join-btn" type="primary">
        {t('globle.join')}
      </Button>
    </BgImg>
  );
};

export default BottomBanner;

const BgImg = styled.div`
  background-image: url(${JoinBg});
  background-size: cover;

  &::before {
    content: '';
    background: #4b4b4b8c;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
`;
