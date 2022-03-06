import React from 'react';
import { Button, Col, Input, Layout, Row, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;

const FooterSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Footer className="footer-container">
      <div className="footer-top-section">
        <Row gutter={[16, 48]}>
          <Col xs={24} sm={12} md={5} lg={6} xxl={6}>
            <p className="footer-heading">{t('footer.contactUs')}</p>
            <ul>
              <li>+44 345 678 903</li>
              <li>Info@shaghr.sa</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={4} lg={5} xxl={6}>
            <p className="footer-heading">{t('footer.patners')}</p>
            <ul>
              <li>{t('globle.joinShaghr')}</li>
              <li>{t('footer.login')}</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xxl={6}>
            <p className="footer-heading">{t('footer.company')}</p>
            <ul>
              <li>{t('footer.aboutShaghr')}</li>
              <li>{t('footer.faqs')}</li>
              <li>{t('footer.privacyPolicy')}</li>
              <li>{t('footer.termsAndCondition')}</li>
              <li>{t('footer.support')}</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={9} lg={7} xxl={6}>
            <p className="info-text-bold">{t('footer.subscribeEmail')}</p>

            <Space size={16} className="subscribe-section">
              <Input className="email-field" placeholder={t('footer.emailAddress')} />
              <Button className="subscribe-btn" type="primary">
                {t('footer.subscribe')}
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
      <div className="social-links">
        <p className="social-text">{t('footer.followUs')}</p>
        <Space size={16}>
          <InstagramOutlined className="social-icon" />
          <TwitterOutlined className="social-icon" />
          <FacebookOutlined className="social-icon" />
        </Space>
      </div>
      <p className="footer-bottom-text">© Shaghr.sa 2021</p>
    </Footer>
  );
};

export default FooterSection;
