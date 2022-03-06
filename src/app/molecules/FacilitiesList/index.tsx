import { FileTextOutlined } from '@ant-design/icons';
import { Col, Divider, Row } from 'antd';
// import FacilityCard from 'app/atoms/FacilityCard';
import { Hotel } from 'app/modules/Config/ducks/types';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { getTranslated } from 'utils/functions';
import './style.less';

interface FacilitiesListProps {
  hotelDetails?: Hotel;
}

const FacilitiesList = ({ hotelDetails }: FacilitiesListProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <Row justify="space-between" gutter={[48, 0]} className="facilities-list-container">
      <Col lg={7} className="facility-list">
        <div className="facility-card-container">
          <FileTextOutlined className="card-icon" />
          <h1 className="facility-title">{t('hotel.services')}</h1>
          <ul className="list-section">
            {hotelDetails?.services?.map((hotelDetail) => (
              <li key={hotelDetail.id}>{hotelDetail.service}</li>
            ))}
          </ul>
        </div>
      </Col>
      <Divider type="vertical" className="card-divider" />
      <Col lg={7} className="facility-list">
        <div className="facility-card-container">
          <FileTextOutlined className="card-icon" />
          <h1 className="facility-title">{t('hotel.amenities')}</h1>
          <ul className="list-section">
            {hotelDetails?.amenities?.map((hotelDetail) => (
              <li key={hotelDetail.id}>{hotelDetail.amenity}</li>
            ))}
          </ul>
        </div>
      </Col>
      <Divider type="vertical" className="card-divider" />
      <Col lg={7} className="facility-list">
        <div className="facility-card-container">
          <FileTextOutlined className="card-icon" />
          <h1 className="facility-title">{t('hotel.policies')}</h1>
          <ul className="list-section">
            <li>{getTranslated('house_rules', hotelDetails)}</li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

FacilitiesList.defaultProps = {
  hotelDetails: {},
};

export default FacilitiesList;

// const servicesData = {
//   title: 'Hotel Services',
//   icon: <FileTextOutlined className="card-icon" />,
//   lists: [
//     'Culpa qui officia deserunt mollit anim id est laborum.',
//     ' Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.',
//     'Nemo eniem ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eosep quiklop ratione voluptatem sequi nesciunt.',
//     ' Neque porroquisquam est, quepi dolorem ipsum quia dolor srit amet, consectetur adipisci velit, seid quia non numquam eiuris modi tempora incidunt ut labore et dolore magnam aliquam quaerat iope voluptatem.',
//   ],
// };

// const amenitiesData = {
//   title: 'Hotel Amenities',
//   icon: <FileTextOutlined className="card-icon" />,
//   lists: [
//     'Culpa qui officia deserunt mollit anim id est laborum.',
//     ' Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.',
//     'Nemo eniem ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eosep quiklop ratione voluptatem sequi nesciunt.',
//     ' Neque porroquisquam est, quepi dolorem ipsum quia dolor srit amet, consectetur adipisci velit, seid quia non numquam eiuris modi tempora incidunt ut labore et dolore magnam aliquam quaerat iope voluptatem.',
//   ],
// };
// const policesData = {
//   title: 'Hotel Polices',
//   icon: <FileTextOutlined className="card-icon" />,
//   lists: [
//     'Culpa qui officia deserunt mollit anim id est laborum.',
//     ' Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo.',
//     'Nemo eniem ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eosep quiklop ratione voluptatem sequi nesciunt.',
//     ' Neque porroquisquam est, quepi dolorem ipsum quia dolor srit amet, consectetur adipisci velit, seid quia non numquam eiuris modi tempora incidunt ut labore et dolore magnam aliquam quaerat iope voluptatem.',
//   ],
// };
